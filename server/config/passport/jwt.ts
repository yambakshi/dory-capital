import passportJwt from "passport-jwt";
import { mongoDb } from '../../app/dal';
import { env } from '../../config';

const jwtOptions = {
    jwtFromRequest: passportJwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: env.jwtToken.secret,
    issuer: env.jwtToken.issuer,
    audience: env.jwtToken.audience,
};

export const jwtStrategy = new passportJwt.Strategy(jwtOptions, async (payload, done) => {
    try {
        const dbUser = await mongoDb.findOne(env.mongodb.dbName, 'users', { _id: payload.sub });
        if (dbUser) {
            return done(null, dbUser, payload);
        }

        done("User wasn't found");
    } catch (error) {
        done("JWT strategy failed");
    }
})