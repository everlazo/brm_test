import { resolve } from "../../shared/resolve-services.js";
import { Product, validateNameExist } from "../../domain/entity/product.js";

class CreateProductService {
    create = async function (request) {
        try {
            let validation = await validateNameExist(request.name);
            if (validation == true) {
                throw "Name product exist";
            }
            const product = Product.build(request);
            await product.save();
            return resolve(true, "Product successful created");
        } catch (error) {
            return resolve(false, "Has error in creating product: " + error);
        }
    }
}

export default new CreateProductService();