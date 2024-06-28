import { resolve } from "../../shared/resolve-services.js";
import { User, validateUsernameExist } from "../../domain/entity/user.js";
import bcrypt from 'bcrypt';

class CreateUserService{
    create = async function (request) {
        try {
            let validation = await validateUsernameExist(request.username);
            if (validation == true) {
                throw "Username exist";
            }
            const password = await bcrypt.hash(request.password, 10);
            request.password = password;
            const user = User.build(request);
            await user.save();
            return resolve(true, "User successful created");
        } catch (error) {
            return resolve(false, "Error creating user: " + error);
        }
    }
}
 
export default new CreateUserService();