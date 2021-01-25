import { fileUpload } from '../../multer';

export function uploadProfilePictureMiddleware(req, res, next) {
    fileUpload.single("profilePictureFile")(req, res, (err) => {
        next(err);
    })
}