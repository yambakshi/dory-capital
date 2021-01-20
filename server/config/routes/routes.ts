import { Router } from "express";
import passport from 'passport';
import { createPageContent, getPageContent, updatePageContent, addPeople, updatePerson, deletePeople, addSkills } from '../../app/controllers';
import { register, login, logout, getLoginStatus } from '../../app/controllers/users';
import { loginMiddleware, loginStatusMiddleware, logoutMiddleware } from "../middlewares";


export const router = Router();
router.route('/api')
    .get(getPageContent);

router.route('/api/register')
    .post(register);

router.route('/api/login')
    .get(loginStatusMiddleware, getLoginStatus)
    .post(loginMiddleware, login);

router.route('/api/logout')
    .get(logoutMiddleware, logout);

router.route('/api/admin')
    .put(passport.authenticate('jwt', { session: false }), createPageContent)
    .post(passport.authenticate('jwt', { session: false }), updatePageContent);

router.route('/api/admin/leadership')
    .put(passport.authenticate('jwt', { session: false }), addPeople)
    .post(passport.authenticate('jwt', { session: false }), updatePerson)
    .delete(passport.authenticate('jwt', { session: false }), deletePeople);

router.route('/api/admin/skills')
    .put(passport.authenticate('jwt', { session: false }), addSkills);