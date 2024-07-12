import { getTokenFromHeader } from "../utils/getTokenFromHeader.js"
import { verifyToken } from "../utils/verifyToken.js"

export const isLoggedIn = (req, res, next) => {
    //get token from header 
    const token = getTokenFromHeader(req)
    //verify the token 
    const decodeUser = verifyToken(token)
    //save the user in req body
    if (!decodeUser) {
        throw new Error("Invalid/Expired token, please Login again.")
    } else {
        req.userAuthId = decodeUser?.id;
        next();
    }

}

