import { resolve } from "../../shared/resolve-services.js";
import { Purchase } from "../../domain/entity/purchase.js";
import { PurchaseProduct } from "../../domain/entity/purchaseProduct.js";
import { Product } from "../../domain/entity/product.js";

class CreatePurchaseService {
    async create(data) {
        const { idUser, products } = data;

        if (!Array.isArray(products)) {
            return resolve(false, "Products must be an array");
        }

        let transaction;
        let newPurchase; // Declaro la variable newPurchase aquí para evitar el error

        try {
            transaction = await Purchase.sequelize.transaction();

            newPurchase = await Purchase.create(
                {
                    idUser,
                    totalPrice: 0,
                },
                { transaction }
            );

            // Calculo el total de la compra
            let totalPrice = 0;
            for (const product of products) {
                // Verifico que idProduct esté presente en cada producto
                if (!product.idProduct) {
                    throw new Error("Each product must have an idProduct");
                }

                // Obtengo el producto y verificar el stock
                const existingProduct = await Product.findByPk(product.idProduct, { transaction });
                if (!existingProduct) {
                    throw new Error(`Product with id ${product.idProduct} not found`);
                }

                if (existingProduct.stock < product.quantity) {
                    throw new Error(`Product '${existingProduct.name}' does not have enough stock for the purchase`);
                }

                // Calculo el precio total
                const productPrice = existingProduct.price;
                totalPrice += productPrice * product.quantity;

                await PurchaseProduct.create(
                    {
                        idPurchase: newPurchase.id,
                        idProduct: product.idProduct,
                        quantity: product.quantity,
                        price: productPrice,
                    },
                    { transaction }
                );

                // Actualizo el stock del producto
                existingProduct.stock -= product.quantity; // Resto el stock
                await existingProduct.save({ transaction });
            }

            // Actualizo el totalPrice en la compra creada
            newPurchase.totalPrice = totalPrice;
            await newPurchase.save({ transaction });

            await transaction.commit();

            return resolve(true, "Purchase successful created");
        } catch (error) {
            if (transaction) await transaction.rollback();

            return resolve(false, "Error creating purchase: " + error.message);
        }
    }
}

export default new CreatePurchaseService();
