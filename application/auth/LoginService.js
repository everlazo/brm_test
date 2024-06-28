import { User } from "../../domain/entity/user.js";
import { resolve } from "../../shared/resolve-services.js";
import { createToken } from "../../shared/token-actions.js";
import bcrypt from 'bcrypt';

class LoginService{
    login = async function (request) {
        try {
            const user = await User.findOne({ where: { username: request.username } });
            if(user == null) throw "Invalid credentials";
            const verification = await bcrypt.compare(request.password, user.password);
            if(!verification) throw "Invalid credentials";
            const dataToken = {
                id: user.id,
                idPerson: user.idPerson,
                idRole: user.idRole,
                username: user.username,
            }
            const token = createToken(dataToken);
            return resolve(true, "Welcome", { token: token }) 
        } catch (error) {
            return resolve(false, error)  
        }
    }
}

export default new LoginService();
