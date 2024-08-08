import mongoose from "mongoose";
import User from "../../../models/user";
import {hashPassword, createJWT, comparePasswords} from "../auth/auth.js";

/**
 * talking to a database is asyncronus like talking to the network,
 * and most DBs now are servers too, not just a disk, another reason for being asyncronus
 * @param {*} req 
 * @param {*} res 
 */
export const createUser = async (req, res) => {
    const user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: await hashPassword(req.body.password)
    });
    const token = createJWT(user);
    res.json({token}); // {token} === {token: token}
}


export const signin = async (req, res) => {
  const user = (await User.find({})).filter(user => user.email === req.body.email);
  const isValid = comparePasswords(req.body.password, hashPassword(user.password));
  if (!isValid) {
    res.status(401);
    res.json({message: 'stop doing that!'});
  }
}

// in bycrbt, you have 2 options, to do compareSync, that not retrn proimes
