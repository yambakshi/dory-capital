import passportJwt from "passport-jwt";
import { ObjectID } from 'mongodb';
import { mongoDb } from '../../app/dal';
import { env } from '../../config';

const cookieExtractor = req => {
    const jwt = (req && req.cookies) ? req.cookies[`${env.cookiesPrefix}token`] : null;
    return jwt;
}

const jwtOptions = {
    jwtFromRequest: cookieExtractor,
    secretOrKey: env.jwt.secret,
    issuer: env.jwt.issuer,
    audience: env.jwt.audience,
};

export const jwtStrategy = new passportJwt.Strategy(jwtOptions, async (payload, done) => {
    const filter = { _id: new ObjectID(payload._id) };
    const user = await mongoDb.findOne(env.mongodb.dbName, 'users', filter);
    if (!user) {
        done("User doesn't exist", false);
    }

    done(null, user);
})