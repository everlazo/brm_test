import { resolve } from "../../shared/resolve-services.js";
import { User } from "../../domain/entity/user.js";
import { Person } from "../../domain/entity/person.js";

class GetAllUserService{
    all = async function() {
        let user = await User.findAll({ include: [Person] });
        if (Object.keys(user).length === 0) {
            return resolve(false, "User not found");
        }
        return resolve(true, "OK", user)
    }
}
 
export default new GetAllUserService();