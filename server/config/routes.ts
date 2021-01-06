import { Router } from "express";
import { getParagraphs, createParagraphs, updateParagraph } from '../app/controllers/paragraphs';


export const router = Router();

router.route('/api')
    .post(getParagraphs)
    .put(createParagraphs);

router.route('/api/update')
    .post(updateParagraph);