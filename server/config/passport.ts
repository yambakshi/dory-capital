import passport from "passport";
import passportLocal from "passport-local";
import { env } from '../config';
import { mongoDb } from '../app/dal';
import { insertUser, validateUser } from "../app/services";
import { User } from "../app/models";
import { jwtStrategy } from "./passport/jwt";

export function configPassport() {
    // serialize sessions
    passport.serializeUser((user, cb) => cb(null, user));
    passport.deserializeUser(async (id, cb) => {
        try {
            const dbUser = await mongoDb.findOne(env.mongodb.dbName, 'users', { _id: id });
            if (!dbUser) {
                throw Error("User wasn't found");
            }

            cb(null, dbUser);
        } catch (error) {
            cb(error)
        }
    });

    // use these strategies
    // passport.use('register',
    //     new passportLocal.Strategy({
    //         usernameField: 'email',
    //         passwordField: 'password'
    //     }, async (email, password, done) => {
    //         try {
    //             const user = await insertUser(new User({ email, password }));
    //             return done(null, { email, password });
    //         } catch (error) {
    //             return done(error);
    //         }
    //     })
    // )

    passport.use('login',
        new passportLocal.Strategy({
            usernameField: 'email',
            passwordField: 'password'
        }, async (email, password, done) => {
            try {
                const user = await validateUser({ email, password });
                return done(null, { email, password }, { message: 'Logged in Successfully' });
            } catch (error) {
                return done(error);
            }
        })
    )

    passport.use(jwtStrategy);
}