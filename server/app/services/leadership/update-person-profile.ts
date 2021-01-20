import { env } from '../../../config';
import { mongoDb } from '../../dal';


export async function updatePersonProfile(update: { _id: string, data: {} }) {
    const output = await mongoDb.updateOne(env.mongodb.dbName, 'people', update);
    return output;
}