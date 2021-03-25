import { Router } from "express";
import {
    logout, changePassword,
    createMemberProfile, updateMemberProfile, deleteMembersProfiles, reorderMembersProfiles,
    updateParagraph,
    createSections, updateSectionTitle,
    createSkills
} from '../../app/controllers';
import {
    memberFormatterMiddleware, uploadProfilePictureMiddleware
} from "../middlewares";


export const authRouter = Router();

// Auth

authRouter.route('/api/auth/logout')
    .post(logout);

authRouter.route('/api/auth/change-password')
    .post(changePassword);

// Members

authRouter.route('/api/members')
    .put(
        uploadProfilePictureMiddleware,
        memberFormatterMiddleware,
        createMemberProfile)
    .post(
        uploadProfilePictureMiddleware,
        memberFormatterMiddleware,
        updateMemberProfile)
    .delete(deleteMembersProfiles);

authRouter.route('/api/reorder-members')
    .post(reorderMembersProfiles)

// Paragraphs

authRouter.route('/api/paragraphs')
    .post(updateParagraph);

// Sections

authRouter.route('/api/sections')
    .put(createSections)
    .post(updateSectionTitle);

// Skills

authRouter.route('/api/skills')
    .put(createSkills);
