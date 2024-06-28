import { resolve } from "../../shared/resolve-services.js";
import { Purchase } from "../../domain/entity/purchase.js";
import { PurchaseProduct } from "../../domain/entity/purchaseProduct.js";
import moment from 'moment';

class GetAllPurchaseService {
    find = async function () {
        try {
            const purchaseProducts = await PurchaseProduct.findAll({ include: [Purchase] });

            const purchaseMap = new Map();
            purchaseProducts.forEach(purchaseProduct => {
                const { id, idPurchase, idProduct, quantity, price } = purchaseProduct;

                if (!purchaseMap.has(idPurchase)) {
                    const { Purchase: { id: purchaseId, idUser, totalPrice, createdAt } } = purchaseProduct;
                    purchaseMap.set(idPurchase, {
                        id: purchaseId,
                        idUser,
                        totalPrice,
                        createdAt: moment(purchaseProduct.Purchase.createdAt).format('DD MMMM YYYY, HH:mm:ss'),
                        details: []
                    });
                }

                purchaseMap.get(idPurchase).details.push({
                    id,
                    idProduct,
                    quantity,
                    price
                });
            });

            const purchases = Array.from(purchaseMap.values());

            return resolve(true, "OK", purchases);
        } catch (error) {
            return resolve(false, "Error getting purchases: " + error.message);
        }
    }
}

export default new GetAllPurchaseService();
