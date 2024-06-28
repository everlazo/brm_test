import { resolve } from "../../shared/resolve-services.js";
import { Purchase } from "../../domain/entity/purchase.js";
import { PurchaseProduct } from "../../domain/entity/purchaseProduct.js";
import { Product } from "../../domain/entity/product.js";

class UpdatePurchaseService {
    async update(idPurchase, updatedData) {
        const { idUser, products } = updatedData;

        if (!Array.isArray(products)) {
            return resolve(false, "Error: The products must be an array.");
        }

        let transaction;

        try {
            transaction = await Purchase.sequelize.transaction();
            let totalPrice = 0;

            const existingPurchaseProducts = await PurchaseProduct.findAll({
                where: {
                    idPurchase
                },
                transaction
            });

            // detalles existentes por idProduct
            const existingProductsMap = new Map();
            existingPurchaseProducts.forEach(product => {
                existingProductsMap.set(product.idProduct, product);
            });

            for (const product of products) {
                // Verifico que idProduct esté en cada producto
                if (!product.idProduct) {
                    throw new Error("Each product must have an idProduct");
                }

                // verifico el stock
                const existingProduct = await Product.findByPk(product.idProduct, { transaction });
                if (!existingProduct) {
                    throw new Error(`Product with id ${product.idProduct} not found`);
                }

                // Verifico el stock disponible
                if (existingProduct.stock < product.quantity) {
                    throw new Error(`Product '${existingProduct.name}' do not have enough stock for the purchase`);
                }

                const productPrice = existingProduct.price;
                totalPrice += productPrice * product.quantity;

                if (existingProductsMap.has(product.idProduct)) {
                    // Si ya existe el detalle de compra lo actualizarlo
                    const existingPurchaseProduct = existingProductsMap.get(product.idProduct);
                    // Calculo la diferencia de cantidad para ajustar el stock
                    const difference = product.quantity - existingPurchaseProduct.quantity;

                    existingPurchaseProduct.quantity = product.quantity;
                    existingPurchaseProduct.price = productPrice;
                    await existingPurchaseProduct.save({ transaction });

                    existingProduct.stock -= difference;
                } else {
                    // Si no existe creo un detalle de compra
                    await PurchaseProduct.create(
                        {
                            idPurchase,
                            idProduct: product.idProduct,
                            quantity: product.quantity,
                            price: productPrice,
                        },
                        { transaction }
                    );

                    // Resto el stock del producto
                    existingProduct.stock -= product.quantity;
                }

                // Guardo el producto
                await existingProduct.save({ transaction });
            }

            // Elimino los detalles de compra que ya no están presentes en la actualización
            for (const [idProduct, existingPurchaseProduct] of existingProductsMap.entries()) {
                const existingProduct = await Product.findByPk(existingPurchaseProduct.idProduct, { transaction });
                if (!existingProduct) {
                    throw new Error(`Product with id ${existingPurchaseProduct.idProduct} not found`);
                }

                // Ajusto el stock al eliminar el detalle de compra
                existingProduct.stock += existingPurchaseProduct.quantity;
                await existingProduct.save({ transaction });
                await existingPurchaseProduct.destroy({ transaction });
            }

            const updatedPurchase = await Purchase.findByPk(idPurchase);
            if (!updatedPurchase) {
                throw new Error(`Purchase with id ${idPurchase} not found`);
            }

            updatedPurchase.idUser = idUser;
            updatedPurchase.totalPrice = totalPrice;
            await updatedPurchase.save({ transaction });
            await transaction.commit();

            return resolve(true, "Purchase updated successfully");
        } catch (error) {
            if (transaction) await transaction.rollback();
            return resolve(false, "Error updating purchase: " + error.message);
        }
    }
}

export default new UpdatePurchaseService();
