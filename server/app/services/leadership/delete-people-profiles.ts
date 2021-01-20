import { ObjectID } from 'mongodb';
import { env } from '../../../config';
import { mongoDb } from '../../dal';


export async function deletePeopleProfiles({ _id, data }: { _id: string, data: {} }) {
    const path = Object.keys(data)[0];
    const objectIds = data[path].map(id => new ObjectID(id));
    const query = objectIds.length > 0 ? { _id: { $in: objectIds } } : {};
    const { result } = await mongoDb.deleteMany(env.mongodb.dbName, 'people', query);
    if (result.ok !== 1 || (objectIds.length > 0 && result.n !== objectIds.length)) {
        return Promise.reject({ message: 'Deleting people profiles failed' });
    }

    let output;
    if (objectIds.length > 0) {
        const pullData = { _id, data: { [path]: { $in: objectIds } } };
        output = mongoDb.pull(env.mongodb.dbName, 'page-content', pullData);
    } else {
        const setData = { _id, data: { [path]: [] } };
        output = mongoDb.updateOne(env.mongodb.dbName, 'page-content', setData);
    }

    return output;
}