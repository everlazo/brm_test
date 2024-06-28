import { resolve } from "../../shared/resolve-services.js";
import { Person } from "../../domain/entity/person.js";

class GetAllPersonService{
    all = async function() {
        let persons = await Person.findAll();
        if (Object.keys(persons).length === 0) {
            return resolve(false, "User not found");
        }
        return resolve(true, "OK", persons);
    }
}
 
export default new GetAllPersonService();