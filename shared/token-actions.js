import jwt from "jsonwebtoken";
const secretKey = "everlazo12345";
const expiresIn = "12h";

export function createToken(dataToken) {
    const token = jwt.sign({ dataToken }, secretKey, { expiresIn: expiresIn });
    return token
}

export function getDataFromToken(token){
    const decrypt = jwt.verify(token, secretKey);
    const data = decrypt.datatoken; 
    return data;
}

export function getSessionFromRequest(req){
    let token = req.header('Authorization');
    if (!token) {
        return null
    } else {
        try {
            token = token.replaceAll("Bearer ", "")
            const session = getDataFromToken(token)
            return session
        } catch (error) {
            return null
        }
    }
}