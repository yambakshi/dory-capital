import { Router } from "express";
import passport from 'passport';
import { getParagraphs } from '../../app/controllers/paragraphs';
import jwt from 'jsonwebtoken';


export const router = Router();
router.route('/api')
    .post(getParagraphs);

router.route('/api/login')
    .post(
        async (req, res, next) => {
            passport.authenticate('login',
                async (err, user, info) => {
                    try {
                        if (err || !user) {
                            const error = new Error('An error occurred.');
                            return next(error);
                        }

                        req.login(
                            user,
                            { session: false },
                            async (error) => {
                                if (error) return next(error);

                                const body = { _id: user._id, email: user.email };
                                const token = jwt.sign({ user: body }, 'TOP_SECRET');
                                res.cookie('token', token, { httpOnly: true });
                                return res.json();
                            }
                        );
                    } catch (error) {
                        return next(error);
                    }
                }
            )(req, res, next)
        });

router.route('/api/register').post(
    passport.authenticate('register', { session: false }),
    async (req, res, next) => {
        res.json({
            message: 'Successful registration',
            user: req.user
        });
    });