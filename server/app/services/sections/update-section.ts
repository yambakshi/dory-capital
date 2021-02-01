import { ObjectID } from 'mongodb';
import { env } from '../../../config';
import { mongoDb } from '../../dal';

export async function updateSection({ _id, title }: { _id: string, title: string }) {
    const filter = { _id: { $eq: new ObjectID(_id) } };
    const { value } = await mongoDb.findAndModify(env.mongodb.dbName, 'sections', filter, { title });
    return value;
}