import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'url';
import indexRouter from "./src/routes/indexRouter.js";
import dotenv from 'dotenv';
import validateRouter from './src/routes/validateRouter.js';
import successRouter from './src/routes/successRouter.js';

dotenv.config();
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");


// for public assets
app.use(express.static(__dirname + '/public'));
// for bootstrap
app.use(
    express.static(path.join(__dirname, "node_modules/bootstrap/dist/"))
);

app.use(express.json());    //this
app.use(express.urlencoded({extended:false})); 

app.use((err, req, res, next) => {
    console.error(err);
    res.status(err.statusCode || 500).send(err.message);
});

// app routers
app.use('/', indexRouter);
app.use('/validate', validateRouter);
app.use('/success', successRouter)
app.use('/fail', (req, res) => {
    res.render('fail')
})


// app port listener
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`My first Express app - listening on port ${PORT}!`);
});