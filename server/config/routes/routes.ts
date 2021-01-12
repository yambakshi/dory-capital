import { Router } from "express";
import passport from 'passport';
import { getParagraphs, updateParagraph } from '../../app/controllers/paragraphs';
import { login, logout, getLoginStatus } from '../../app/controllers/users';


export const router = Router();
router.route('/api')
    .post(getParagraphs);

router.route('/api/login')
    .get(passport.authenticate('jwt', { session: false }), getLoginStatus)
    .post(passport.authenticate('local', { session: false }), login);

router.route('/api/admin')
    .post(passport.authenticate('jwt', { session: false }), updateParagraph);

router.route('/api/logout')
    .post(passport.authenticate('jwt', { session: false }), logout);