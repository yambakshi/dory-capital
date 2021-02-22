import { ObjectID } from 'mongodb';
import { env } from '../../../config';
import { mongoDb } from '../../dal';
import { Member } from '../../models/member';
import { querySkills, uploadImage } from '../../services';


export async function insertMember(rawMember: Member) {
    const { sectionId, profilePictureFile } = rawMember;
    const member: any = {
        sectionId: new ObjectID(rawMember.sectionId),
        name: rawMember.name,
        link: rawMember.link,
        hidden: (typeof rawMember.hidden == 'string' && rawMember.hidden == 'true')
    };

    // Upload image to cloudinary
    member.imageId = (await uploadImage(profilePictureFile.path)).public_id;

    // Map skills to MongoDB ObjectIds
    member.skills = rawMember.skills.map((_id) => new ObjectID(_id.toString()));

    // Insert member into 'members' collection
    const { ops } = await mongoDb.insertOne(env.mongodb.dbName, 'members', member);
    const memberId = ops[0]._id;

    // Push member ObjectId into 'Leadership' members array in 'sections' collection
    const filter = { _id: { $eq: new ObjectID(sectionId) } };
    const data = { members: { $each: [memberId] } };
    await mongoDb.push(env.mongodb.dbName, 'sections', filter, data);
    member._id = memberId;

    // Resolve member's skills
    member.skills = await querySkills(member.skills);

    return member;
}