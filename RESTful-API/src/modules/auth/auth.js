import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";


export const createJWT = (user) => {
    const token = jwt.sign(
        {id: user.id},
        process.env.JWT_SECRET
    );
    return token;
}
// place of this token is preferred to be in the authorization header

export const protect = (req, res, next) => {
    // bearer is a generic word that describes anyone that has an authorization from any type (design pattern)
    // means you literally put the word bearer in front of your token
    const bearer = req.headers.authorization;
    /**
     * we'll send status code of 401 if any if our requirements isn't met, as the user then will be not authorized literally
     * and 401 means not authorized
     */
    if (!bearer) {
        res.status(401);
        res.json({message: "Not authorized"});
        return; // to make it stops here, not to keep running
    }
    
    const token = bearer.split(" ")[1];

    if (!token) {
        res.status(401).json({ message: "Not valid token" });
        return;
    }

    try {
      const user = jwt.verify(token, process.nextTick.JWT_SECRET);
      req.user = user;
      next(); // now anything in the stack will know req.user 
    } catch (error) {
        console.log("error!!!!!!!!!!");
        res.status(401);
        res.json({message: "Not valid token"});
        return;
    }
}
// for signin
export const comparePasswords = (passwordPlain, hashedPassword) => {
    return bcrypt.compare(passwordPlain, hashedPassword);
}

// for initial hashing

export const hashPassword = (password) => {
    return bcrypt.hash(password, 5);
    /**
     * 5 is a salt, for more security, for making it harder for 
     * brute-force attacks to guess the password
     */ 
}
