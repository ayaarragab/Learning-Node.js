import jwt from "jsonwebtoken";

export const createJWT = (user) => {
    const token = jwt.sign(
        {id: user.id},
        process.env.JWT_SECRET
    );
    return token;
}
// place of this token is preferred to be in the authorization header
