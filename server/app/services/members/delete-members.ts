import { ObjectID } from 'mongodb';
import { env } from '../../../config';
import { mongoDb } from '../../dal';
import { Member } from '../../models/member';
import { deleteImages } from '../images';


export async function deleteMembers({ sectionId, members }: { sectionId: string, members: Member[] }) {
    // Delete images from cloudinary
    await deleteImages(members.map(({ imageId }) => imageId));

    // Remove members from 'members' collection
    const objectIds = members.map(({ _id }) => new ObjectID(_id));
    let filter: any = { _id: { $in: objectIds } };
    let output = await mongoDb.deleteMany(env.mongodb.dbName, 'members', filter);

    // Remove members from leadership section in 'sections' collection
    filter = { _id: { $eq: new ObjectID(sectionId) } };
    if (members.length > 0) {
        const data = { members: { $in: objectIds } };
        output = await mongoDb.pull(env.mongodb.dbName, 'sections', filter, data);
    } else {
        const data = { members: [] };
        output = await mongoDb.updateOne(env.mongodb.dbName, 'sections', filter, data);
    }

    return members.map(({ _id }) => _id);
}