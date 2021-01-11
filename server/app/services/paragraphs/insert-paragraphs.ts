import { env } from '../../../config';
import { mongoDb } from '../../dal';


export async function insertParagraphs(paragraphs: any[]) {
    const output = mongoDb.insert(env.mongodb.dbName, 'paragraphs', paragraphs);
    return output;
}