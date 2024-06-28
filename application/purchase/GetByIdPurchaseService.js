import { resolve } from "../../shared/resolve-services.js";
import { Purchase } from "../../domain/entity/purchase.js";
import { PurchaseProduct } from "../../domain/entity/purchaseProduct.js";
import moment from 'moment';

class GetByIdPurchaseService {
    find = async function (idPurchase) {
        try {
            const purchaseProducts = await PurchaseProduct.findAll({
                where: { idPurchase },
                include: [Purchase]
            });

            if (!purchaseProducts || purchaseProducts.length === 0) {
                return resolve(false, "No details found for the specified purchase.");
            }

            const purchaseMap = new Map();
            purchaseProducts.forEach(purchaseProduct => {
                const { id, idProduct, quantity, price, createdAt } = purchaseProduct;

                if (!purchaseMap.has(idPurchase)) {
                    const { Purchase: { id: purchaseId, idUser, totalPrice, createdAt: purchaseCreatedAt } } = purchaseProduct;
                    purchaseMap.set(idPurchase, {
                        id: purchaseId,
                        idUser,
                        totalPrice,
                        createdAt: moment(purchaseCreatedAt).format('DD MMMM YYYY, HH:mm:ss'),
                        details: []
                    });
                }

                purchaseMap.get(idPurchase).details.push({
                    id,
                    idProduct,
                    quantity,
                    price,
                    createdAt: moment(createdAt).format('DD MMMM YYYY, HH:mm:ss'),
                });
            });

            const purchase = Array.from(purchaseMap.values())[0];

            return resolve(true, "OK", purchase);
        } catch (error) {
            return resolve(false, "Error obtaining the purchase: " + error.message);
        }
    }
}

export default new GetByIdPurchaseService();
