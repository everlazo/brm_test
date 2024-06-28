import { resolve } from "../../shared/resolve-services.js";
import { Person } from "../../domain/entity/person.js";

class DeletePersonService {
    delete = async function (id) {
        try {
            let person = await Person.findOne({ where: { id: id } });
            if (!person) {
                throw "Person not found";
            }
            await person.destroy();
            return resolve(true, "Person successfully deleted");
        } catch (error) {
            return resolve(false, "Has error in deleting person: " + error);
        }
    }
}

export default new DeletePersonService();
