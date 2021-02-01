import path from 'path';
import multer from 'multer';

export const fileUpload = multer({
    dest: path.resolve(__dirname, '../../tmp/')
})