import { Router } from "express";
import passport from 'passport';
import {
    register, login, logout, getLoginStatus,
    createPageContent, getPageContent, updatePageContent,
    addMembers, updatePerson, deletePeople, addSkills, getSkills
} from '../../app/controllers';
import { loginMiddleware, loginStatusMiddleware, logoutMiddleware, memberFormatterMiddleware, uploadProfilePictureMiddleware } from "../middlewares";


export const router = Router();
router.route('/api')
    .get(getPageContent);

router.route('/api/skills')
    .get(getSkills);

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
    .put(
        passport.authenticate('jwt', { session: false }),
        uploadProfilePictureMiddleware,
        memberFormatterMiddleware,
        addMembers)
    .post(passport.authenticate('jwt', { session: false }),
        uploadProfilePictureMiddleware,
        memberFormatterMiddleware,
        updatePerson)
    .delete(passport.authenticate('jwt', { session: false }), deletePeople);

router.route('/api/admin/skills')
    .put(passport.authenticate('jwt', { session: false }), addSkills);