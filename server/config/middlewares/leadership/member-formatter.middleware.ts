export function memberFormatterMiddleware(req, res, next) {
    const member = req.body;
    if (req.file) {
        member.profilePictureFile = req.file;
    }

    next();
}