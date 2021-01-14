import { Router } from "express";
import passport from 'passport';
import { getParagraphs, updateParagraph } from '../../app/controllers/paragraphs';
import { register, login, logout, getLoginStatus } from '../../app/controllers/users';


export const router = Router();
router.route('/api')
    .post(getParagraphs);

router.route('/api/register')
    .post(register);

router.route('/api/login')
    .get((req, res, next) => {
        passport.authenticate('jwt', { session: false }, (err, user, info) => {
            if (err) {
                return next(err)
            }

            if (!user) {
                return res.send({ status: false, message: "User is not logged in" });
            }

            next();
        })(req, res, next)
    }, getLoginStatus)
    .post(passport.authenticate('local', { session: false }), login);


router.route('/api/logout')
    .get((req, res, next) => {
        passport.authenticate('jwt', { session: false }, (err, user, info) => {
            if (err) {
                return next(err)
            }

            if (!user) {
                return res.send({ success: false, message: "User is not logged in" });
            }

            next();
        })(req, res, next)
    }, logout);

router.route('/api/admin')
    .post(passport.authenticate('jwt', { session: false }), updateParagraph);