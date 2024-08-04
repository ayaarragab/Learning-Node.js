import express from "express";
import path from 'path';
import router from "./routers.js";

const app = express();

app.get('/', (req, res) => {
    res.sendFile(path.resolve('public/index.html'));
})

// app.use() allows you to apply global configurations either on a specific path or on the entire app

app.use('/api', router); // concatenated '/api' to be first in all paths strings


app.listen(3000, () => console.log("Hello from server"));
export default app;
