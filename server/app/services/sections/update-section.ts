import { ObjectID } from 'mongodb';
import { env } from '../../../config';
import { mongoDb } from '../../dal';

export async function updateSection({ _id, title }: { _id: string, title: string }) {
    const filter = { _id: { $eq: new ObjectID(_id) } };
    const { ok, value } = await mongoDb.findAndModify(env.mongodb.dbName, 'sections', filter, { title });
    const success = !!ok;

    return {
        success,
        message: success ?
            'Successfully updated section title' :
            'Failed to updated section title',
        data: value
    };
}