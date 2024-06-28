import { resolve } from "../../shared/resolve-services.js";
import { User } from "../../domain/entity/user.js";

class DeleteUserService {
    delete = async function (id) {
        try {
            let user = await User.findOne({ where: { id: id } });
            if (!user) {
                throw "User not found";
            }
            await user.destroy();
            return resolve(true, "User successfully deleted");
        } catch (error) {
            return resolve(false, "Error deleting user: " + error);
        }
    }
}

export default new DeleteUserService();
