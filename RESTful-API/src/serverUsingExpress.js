import express from "express";
import path from 'path';
import router from "./routers.js";
import morgan from "morgan"; // useful middleware
import cors from "cors";
import {protect} from "./modules/auth.js";
import * as handlers from "./handlers/user.js";


const app = express();

app.use(cors());

app.use(morgan('dev'))

app.use(express.json()); // basically it allows client to send us json 

app.use(express.urlencoded({extended: true})); // basically it allows client to send us query string in a object instead of in a string 

/**
 * making my own middleware
 * app.use((req, res, next) => {})
 * same as app.use(express.json()) or app.use(morgan('dev'))
 * but the previous middlewares are bultin in express, if we want to create our own, it will be constructed like this
 * app.use((req, res, next) => {})
 * And this is how every middleware is made in the background
 */

app.use((req, res, next) => {
    req.secret = "secret don't tell anyone";
    next();
})

/**
 * do you know what is this next() ? it's the next middleware literally !
 * It's the below middleware starts with app.get('/', (req, res) =>
 * everything that is attached by app after this will be able to access req.secret (why?)
 */

app.get('/', (req, res) => {
    res.sendFile(path.resolve('public/index.html'));
})

// app.use() allows you to apply global configurations either on a specific path or on the entire app

app.use('/api', protect, router); // not a middleware, concatenated '/api' to be first in all paths strings

/**
 * The following routes have not to be protected
 * as the person who signin or register will not have JWT
 *  */

app.post('/register', handlers.createUser);
app.post('/signin', handlers.signin);
/**
 * app.get("/todo/:id", mymiddleware1, mymiddleware2, handler);
 * or app.get("/todo/:id", [mymiddleware1, mymiddleware2], handler);
 * How to make your middleware takes arguemnts? by writing a function that returns a function !
 */
/* const myMiddleWare = (param1, param2) => (req, res, next) => {
    console.log(`Hello in my myMiddleWare that takes ${param1} ${param2}`);
}*/


export default app;
