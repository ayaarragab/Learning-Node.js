import express from "express";
import path from 'path';
import router from "./routers.js";

const app = express();

app.get('/', (req, res) => {
    res.sendFile(path.resolve('public/index.html'));
})

export default app;
