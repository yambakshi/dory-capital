import { env } from '../../../config';
import { mongoDb } from '../../dal';
import { ObjectID } from 'mongodb';

export async function queryParagraphsByIds(ids: string[]) {
    const filter = ids.length > 0 ? { _id: { $in: ids.map(id => new ObjectID(id)) } } : {};
    const cursor = await mongoDb.get(env.mongodb.dbName, 'paragraphs', filter);
    return cursor.toArray();
}