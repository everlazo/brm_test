import { resolve } from "../../shared/resolve-services.js";
import { Product } from "../../domain/entity/product.js";

class DeleteProductService {
    delete = async function (id) {
        try {
            let product = await Product.findOne({ where: { id: id } });
            if (!product) {
                throw "Product not found";
            }
            await product.destroy();
            return resolve(true, "Product successfully deleted");
        } catch (error) {
            return resolve(false, "Has error in deleting product: " + error);
        }
    }
}

export default new DeleteProductService();
