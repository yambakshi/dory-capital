import { Router } from "express";
import { register, login, getLoginStatus, getPageData, getSkills } from '../../app/controllers';
import { loginMiddleware, loginStatusMiddleware } from "../middlewares";


export const router = Router();

// Auth

router.route('/api/auth/register')
    .post(register);

router.route('/api/auth/login')
    .get(loginStatusMiddleware, getLoginStatus)
    .post(loginMiddleware, login);

// General

router.route('/api/general')
    .get(getPageData);

// Skills

router.route('/api/skills')
    .get(getSkills);
