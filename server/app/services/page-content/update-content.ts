import { env } from '../../../config';
import { mongoDb } from '../../dal';


export async function updateContent(pageContentUpdate: { _id: string, data: {} }) {
    const output = mongoDb.updateOne(env.mongodb.dbName, 'page-content', pageContentUpdate);
    return output;
}