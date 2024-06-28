import { resolve } from "../../shared/resolve-services.js";
import { Person, validateDocumentExist } from "../../domain/entity/person.js";

class UpdatePersonService {
    update = async function (id, request) {
        try {
            const person = await Person.findByPk(id);
            if (person == null) {
                throw "Person not found";
            }

            if (person.document != request.document) {
                let validation = await validateDocumentExist(request.document);
                if (validation == true) {
                    throw "Document exist";
                }
            }

            person.document = request.document;
            person.name = request.name;
            person.lastname = request.lastname;
            person.address = request.address;
            await person.save();
            return resolve(true, "Person successful updated");
        } catch (error) {
            return resolve(false, "Error while updating person: " + error);
        }
    }
}

export default new UpdatePersonService();