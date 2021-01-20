import { env } from '../../../config';
import { mongoDb } from '../../dal';


export async function createPeopleProfiles({ _id, data }: { _id: string, data: {} }) {
    const path = Object.keys(data)[0];
    const { ops } = await mongoDb.insertMany(env.mongodb.dbName, 'people', data[path]);
    const objectIds = ops.map(({ _id }) => _id);
    const pushData = {
        _id,
        data: { [path]: { $each: objectIds } }
    }

    const output = mongoDb.push(env.mongodb.dbName, 'page-content', pushData);
    return output;
}