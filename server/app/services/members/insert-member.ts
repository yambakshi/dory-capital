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
    };

    member.imageId = (await uploadImage(profilePictureFile.path)).public_id;
    member.skills = rawMember.skills.map((_id) => new ObjectID(_id.toString()));
    const { ops } = await mongoDb.insertOne(env.mongodb.dbName, 'sections-contents', member);
    const memberId = ops[0]._id;
    const filter = { _id: { $eq: new ObjectID(sectionId) } };
    const data = { content: { $each: [memberId] } };
    await mongoDb.push(env.mongodb.dbName, 'sections', filter, data);
    member._id = memberId;
    member.skills = await querySkills(member.skills);

    return member;
}