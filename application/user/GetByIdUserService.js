import { resolve } from "../../shared/resolve-services.js";
import { User } from "../../domain/entity/user.js";

class GetByIdPersonService {
    find = async function (id) {
        try {
            const user = await User.findByPk(id);
            if (Object.keys(user).length === 0) {
                return resolve(false, "User not found");
            }
            return resolve(true, "OK", user);
        } catch (error) {
            return resolve(false, `Error in finding user: ${error.message || error}`);
        }
    }
}

export default new GetByIdPersonService();