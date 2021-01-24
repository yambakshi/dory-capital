import { fileUpload } from '../../multer';

export function uploadProfilePictureMiddleware(req, res, next) {
    fileUpload.single("data[leadership.people][0][profilePictureFile][file]")(req, res, (err) => {
        next(err);
    })
}