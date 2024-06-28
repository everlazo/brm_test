import { resolve } from "../../shared/resolve-services.js";
import { Person, validateDocumentExist } from "../../domain/entity/person.js";

class CreatePersonService {
    create = async function (request) {
        try {
            let validation = await validateDocumentExist(request.document);
            if (validation == true) {
                throw "Document exist";
            }
            const person = Person.build(request);
            await person.save();
            return resolve(true, "Person successfully created")
        } catch (error) {
            return resolve(false, "Has error in creating person: " + error)
        }
    }
}

export default new CreatePersonService();
