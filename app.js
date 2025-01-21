import 'dotenv/config'
import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'url';
import indexRouter from "./src/routes/indexRouter.js";
import loginRouter from './src/routes/loginRouter.js';
import successRouter from './src/routes/successRouter.js';
import signupRouter from './src/routes/signupRouter.js';
import session from 'express-session';
import passport from 'passport';
import flash from 'express-flash';

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

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((err, req, res, next) => {
    console.error(err);
    res.status(err.statusCode || 500).send(err.message);
});

// sessions
app.use(session({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use((req, res, next) => {
    console.log(req.session);
    console.log(req.user);
    next();
})

// app routers
app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use("/sign-up", signupRouter);
// app.use('/success', successRouter)
// app.use('/fail', (req, res) => {
//     res.render('fail')
// })




app.get("/log-out", (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        res.redirect("/");
    });
});


// app port listener
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`My first Express app - listening on port ${PORT}!`);
});