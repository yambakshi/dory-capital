import { ObjectID } from 'mongodb';
import { env } from '../../../config';
import { mongoDb } from '../../dal';


export async function reorderMembers({ sectionId, membersIds }: { sectionId: string, membersIds: string[] }) {
    const objectIds = membersIds.map(_id => new ObjectID(_id));
    const filter = { _id: { $eq: new ObjectID(sectionId) } };
    const data = { members: objectIds };
    const output = await mongoDb.updateOne(env.mongodb.dbName, 'sections', filter, data);
    return output;
}