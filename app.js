import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'url';
import indexRouter from "./src/routes/indexRouter.js";
import dotenv from 'dotenv';

dotenv.config();
const app = express();

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");


app.use((err, req, res, next) => {
    console.error(err);
    res.status(err.statusCode || 500).send(err.message);
});


app.use('/', indexRouter);

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`My first Express app - listening on port ${PORT}!`);
});