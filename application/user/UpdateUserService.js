import { resolve } from "../../shared/resolve-services.js";
import { User, validateUsernameExist } from "../../domain/entity/user.js";

class UpdateUserService {
    update = async function (id, request) {
        try {
            const user = await User.findByPk(id);
            if (user == null) {
                throw "User not found";
            }
            
            if (user.username != request.username) {
                let validation = await validateUsernameExist(request.username);
                if (validation == true) {
                    throw "Username exist";
                }
            }

            user.idPerson = request.idPerson;
            user.idRole = request.idRole;
            user.username = request.username;
            user.password = request.password;
            await user.save();
            return resolve(true, "User successful updated");
        } catch (error) {
            return resolve(false, "Error while updating user: " + error);
        }
    }
}

export default new UpdateUserService();
