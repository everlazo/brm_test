import { resolve } from "../../shared/resolve-services.js";
import { Product } from "../../domain/entity/product.js";

class GetAllProductService{
    all = async function() {
        let products = await Product.findAll();
        if (Object.keys(products).length === 0) {
            return resolve(false, "Product not found");
        }
        return resolve(true, "OK", products);
    }
}
 
export default new GetAllProductService();