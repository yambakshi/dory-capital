import passportJwt, { ExtractJwt } from "passport-jwt";
import { ObjectID } from 'mongodb';
import { mongoDb } from '../../app/dal';
import { env } from '../../config';

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: env.jwt.secret,
    issuer: env.jwt.issuer,
    audience: env.jwt.audience,
};

export const jwtStrategy = new passportJwt.Strategy(jwtOptions, async (payload, done) => {
    const filter = { _id: new ObjectID((payload as any)._id) };
    const user = await mongoDb.findOne(env.mongodb.dbName, 'users', filter);
    if (!user) {
        done(null, false, { message: "User doesn't exist" });
    }

    done(null, user);
})