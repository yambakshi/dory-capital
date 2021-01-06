import { mongoDb } from '../../dal';


export async function updateText(paragraph) {
    const output = mongoDb.update('dory-capital', 'paragraphs', paragraph);
    return output;
}