import { resolve } from "../../shared/resolve-services.js";
import { Product } from "../../domain/entity/product.js";

class GetByIdProductService{
    find = async function(id) {
        const product = await Product.findByPk(id);
        if (!product) {
            return resolve(false, "Product not found");
        }
        return resolve(true, "OK", product);
    }
}
 
export default new GetByIdProductService();