import { resolve } from "../../shared/resolve-services.js";
import { Person } from "../../domain/entity/person.js";

class GetByIdPersonService{
    find = async function(id) {
        const person = await Person.findByPk(id);
        if (!person) {
            return resolve(false, "Person not found");
        }
        return resolve(true, "OK", person);
    }
}
 
export default new GetByIdPersonService();