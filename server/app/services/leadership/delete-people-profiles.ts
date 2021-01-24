import { ObjectID } from 'mongodb';
import { env } from '../../../config';
import { mongoDb } from '../../dal';
import { deleteImages } from '../images';


export async function deletePeopleProfiles({ _id, data }: { _id: string, data: {} }) {
    const path = Object.keys(data)[0];
    await deleteImages(data[path].map(({ imageId }) => imageId));
    const objectIds = data[path].map(({ _id }) => new ObjectID(_id));

    // Remove member from members collection
    const query = objectIds.length > 0 ? { _id: { $in: objectIds } } : {};
    const { result } = await mongoDb.deleteMany(env.mongodb.dbName, 'people', query);
    if (result.ok !== 1 || (objectIds.length > 0 && result.n !== objectIds.length)) {
        return Promise.reject({ message: 'Deleting people profiles failed' });
    }

    // Remove member from page-content collection
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