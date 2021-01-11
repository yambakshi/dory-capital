import { Router } from "express";
import { createParagraphs, updateParagraph } from '../../app/controllers/paragraphs';
import passport from 'passport';

export const authenticatedRouter = Router();
authenticatedRouter.route('/api/admin')
    .put(passport.authenticate('login'), createParagraphs)
    .post(passport.authenticate('login'), updateParagraph);