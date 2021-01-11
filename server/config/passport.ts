import passport from "passport";
import passportLocal from "passport-local";
import { insertUser, validateUser } from "../app/services";
import { User } from "../app/models";
import { jwtStrategy } from "./passport/jwt";

export function configPassport() {
    // serialize sessions
    passport.serializeUser((user, cb) => cb(null, user));
    // passport.deserializeUser((id, cb) => {
    //     User.load({ criteria: { _id: id } })
    //         .then(user => cb(null, user))
    //         .catch(err => cb(err));
    // });

    // use these strategies
    passport.use('register',
        new passportLocal.Strategy({
            usernameField: 'email',
            passwordField: 'password'
        }, async (email, password, done) => {
            try {
                const user = await insertUser(new User({ email, password }));
                return done(null, { email, password });
            } catch (error) {
                return done(error);
            }
        })
    )

    passport.use('login',
        new passportLocal.Strategy({
            usernameField: 'email',
            passwordField: 'password'
        }, async (email, password, done) => {
            try {
                const user = validateUser({ email, password });
                return done(null, { email, password }, { message: 'Logged in Successfully' });
            } catch (error) {
                return done(error);
            }
        })
    )

    passport.use(jwtStrategy);
}