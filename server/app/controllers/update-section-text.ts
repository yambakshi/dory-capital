import { updateText } from '../services'

export function updateSectionText(req, res) {
    updateText(req.body.text).then(data => {
        res.success(data);
    }).catch(res.err);
}