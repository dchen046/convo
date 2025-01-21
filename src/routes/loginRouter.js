import { Router } from "express";
// import { login } from "../controllers/loginController.js";
import passport from 'passport';
import LocalStrategy from 'passport-local'
import { getUser, getUserById } from "../db/queries.js";
import bcrypt from 'bcryptjs';


passport.use(
    new LocalStrategy(async (username, password, done) => {
        try {
            const { rows } = await getUser(username);
            const user = rows[0];

            if (!user) {
                return done(null, false, { message: "Incorrect username" });
            }
            const match = await bcrypt.compare(password, user.password);
            if (!match) {
                return done(null, false, { message: "Incorrect password" });
            }
            return done(null, user);
        } catch (err) {
            return done(err);
        }
    })
);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const { rows } = await getUserById(id);
        const user = rows[0];

        done(null, user);
    } catch (err) {
        done(err);
    }
});

const loginRouter = Router();

loginRouter.post('/', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/',
    failureFlash: true
}));

export default loginRouter;