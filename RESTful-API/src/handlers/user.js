import User from "../../models/user.js";
import {hashPassword, createJWT, comparePasswords} from "../modules/auth.js";

/**
 * talking to a database is asyncronus like talking to the network,
 * and most DBs now are servers too, not just a disk, another reason for being asyncronus
 * @param {*} req 
 * @param {*} res 
 */
export const createUser = async (req, res) => {
  const isExist = await User.findOne({email: req.body.email});
  if (isExist) {
    res.json({message: "This Email used before"});
    return;
  }  
  const user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: await hashPassword(req.body.password)
    });
    const token = createJWT(user);
    res.json({token}); // {token} === {token: token}
}


export const signin = async (req, res) => {
  try {
    // Find the user by email
    const user = await User.findOne({ email: req.body.email });
    console.log(user.isCEO);
    
    if (!user) {
      res.status(401).json({ message: 'Invalid credentials' });
      return;
    }

    // Compare the plain text password with the hashed password stored in the database
    const isValid = await comparePasswords(req.body.password, user.password);
    
    if (!isValid) {
      res.status(401).json({ message: 'Invalid credentials' });
      return;
    }

    // If the password is valid, you can proceed to create a JWT or respond with user data
    const token = createJWT(user); // Assuming you have a createJWT function
    res.json({ token });
  } catch (error) {
    console.error("Error during sign-in:", error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

// in bycrbt, you have 2 options, to do compareSync, that not retrn proimes
