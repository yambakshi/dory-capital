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
    await mongoDb.deleteMany(env.mongodb.dbName, 'members', filter);

    // Remove members from leadership section in 'sections' collection
    filter = { _id: { $eq: new ObjectID(sectionId) } };
    if (members.length > 0) {
        const data = { members: { $in: objectIds } };
        await mongoDb.pull(env.mongodb.dbName, 'sections', filter, data);
    } else {
        const data = { members: [] };
        await mongoDb.updateOne(env.mongodb.dbName, 'sections', filter, data);
    }

    return {
        success: true,
        message: 'Successfully removed members',
        data: members.map(({ _id }) => _id)
    };
}