import { resolve } from "../../shared/resolve-services.js";
import { Product, validateNameExist } from "../../domain/entity/product.js";

class UpdateProductService {
    update = async function (id, request) {
        try {
            const product = await Product.findByPk(id);
            if (product == null) {
                throw "Product not found";
            }

            if (product.name !== request.name) {
                let validation = await validateNameExist(request.name);
                if (validation == true) {
                    throw "Name product exist";
                }
            }

            product.idUserRegister = request.idUserRegister;
            product.lotNumber = request.lotNumber;
            product.name = request.name;
            product.price = request.price;
            product.stock = request.stock;
            await product.save();

            return resolve(true, "Product successful updated");
        } catch (error) {
            return resolve(false, "Error while updating product: " + error);
        }
    }
}

export default new UpdateProductService();