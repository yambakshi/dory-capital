export function memberFormatterMiddleware(req, res, next) {
    const body = req.body;
    body.data['leadership.people'][0].profilePictureFile.file = req.file;
    next();
}