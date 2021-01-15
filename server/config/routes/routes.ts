import { Router } from "express";
import passport from 'passport';
import { createParagraphs, getParagraphs, updateParagraph } from '../../app/controllers/paragraphs';
import { register, login, logout, getLoginStatus } from '../../app/controllers/users';
import { loginMiddleware, loginStatusMiddleware, logoutMiddleware } from "../middlewares";


export const router = Router();
router.route('/api')
    .put(createParagraphs)
    .post(getParagraphs);

router.route('/api/register')
    .post(register);

router.route('/api/login')
    .get(loginStatusMiddleware, getLoginStatus)
    .post(loginMiddleware, login);

router.route('/api/logout')
    .get(logoutMiddleware, logout);

router.route('/api/admin')
    .post(passport.authenticate('jwt', { session: false }), updateParagraph);