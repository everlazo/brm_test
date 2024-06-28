import { resolve } from "../../shared/resolve-services.js";
import { getPurchaseHistoryByClient } from "../../domain/entity/purchase.js";

class GetPurchaseHistoryByClientService {
    async getPurchaseHistoryByClient(idUser) {
        try {
            const result = await getPurchaseHistoryByClient(idUser);
            return resolve(true, "OK", result);
        } catch (error) {
            return resolve(false, "Error al obtener el historial de compras del cliente: " + error.message);
        }
    }
}

export default new GetPurchaseHistoryByClientService();
