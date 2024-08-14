import express from "express";
import path from 'path';
import router from "./routers.js";
import morgan from "morgan";
import cors from "cors";
import {protect} from "./modules/auth.js";
import * as handlers from "./handlers/user.js";


const app = express();

app.use(cors());

app.use(morgan('dev'))

app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(path.resolve('public/index.html'));
})


app.use('/api', protect, router);

app.post('/register', handlers.createUser);
app.post('/signin', handlers.signin);


export default app;
