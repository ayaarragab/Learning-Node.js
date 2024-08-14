import app from "./serverUsingExpress.js";
import DBconnection from "../config/db.js";
import dotenv from 'dotenv';

dotenv.config();

const db = new DBconnection();

db.connect();

app.listen(3001, () => console.log("Hello User!"));
