import { env } from '../../../config';
import { mongoDb } from '../../dal';


export async function updateText(paragraph) {
    const output = mongoDb.update(env.mongodb.dbName, 'paragraphs', paragraph);
    return output;
}