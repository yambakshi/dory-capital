import { env } from '../../../config';
import { mongoDb } from '../../dal';


export async function insertPageContent(paragraphs: any[]) {
    const output = mongoDb.insertOne(env.mongodb.dbName, 'page-content', paragraphs);
    return output;
}