import { Router } from "express";
import passport from 'passport';
import {
    register, login, logout, getLoginStatus,
    getPageData,
    createMemberProfile, updateMemberProfile, deleteMembersProfiles,
    updateParagraph,
    createSections, updateSectionTitle,
    createSkills, getSkills
} from '../../app/controllers';
import {
    loginMiddleware, loginStatusMiddleware, logoutMiddleware,
    memberFormatterMiddleware, uploadProfilePictureMiddleware
} from "../middlewares";


export const router = Router();

// Auth

router.route('/api/auth/register')
    .post(register);

router.route('/api/auth/login')
    .get(loginStatusMiddleware, getLoginStatus)
    .post(loginMiddleware, login);

router.route('/api/auth/logout')
    .get(logoutMiddleware, logout);

// Genetal

router.route('/api/general')
    .get(getPageData);

// Members

router.route('/api/members')
    .put(
        passport.authenticate('jwt', { session: false }),
        uploadProfilePictureMiddleware,
        memberFormatterMiddleware,
        createMemberProfile)
    .post(
        passport.authenticate('jwt', { session: false }),
        uploadProfilePictureMiddleware,
        memberFormatterMiddleware,
        updateMemberProfile)
    .delete(
        passport.authenticate('jwt', { session: false }),
        deleteMembersProfiles);

// Paragraphs

router.route('/api/paragraphs')
    .post(
        passport.authenticate('jwt', { session: false }),
        updateParagraph);

// Sections

router.route('/api/sections')
    .put(
        passport.authenticate('jwt', { session: false }),
        createSections)
    .post(
        passport.authenticate('jwt', { session: false }),
        updateSectionTitle);

// Skills

router.route('/api/skills')
    .get(getSkills)
    .put(
        passport.authenticate('jwt', { session: false }),
        createSkills);
