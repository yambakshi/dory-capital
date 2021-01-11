import passportJwt from "passport-jwt";
import { env } from '../../config';

const jwtOptions = {
    jwtFromRequest: passportJwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: env.jwtToken.secret,
    issuer: env.jwtToken.issuer,
    audience: env.jwtToken.audience,
};

export const jwtStrategy = new passportJwt.Strategy(jwtOptions, async (payload, done) => {
})