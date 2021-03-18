import { ObjectID } from 'mongodb';
import { env } from '../../../config';
import { mongoDb } from '../../dal';
import { Member } from '../../models/member';
import { deleteImages, uploadImage } from '../images';
import { querySkills } from '../skills';


export async function updateMember(rawMember: Member) {
    const memberChanges: any = {
        ...rawMember.name !== undefined && { name: rawMember.name },
        ...rawMember.link !== undefined && { link: rawMember.link },
        ...rawMember.hidden && { hidden: (typeof rawMember.hidden === 'string' && rawMember.hidden === 'true') }
    };

    if (rawMember.profilePictureFile) {
        const { imageId, profilePictureFile } = rawMember;
        memberChanges.imageId = (await uploadImage(profilePictureFile.path)).public_id;
        await deleteImages([imageId]);
    }

    if (rawMember.skills && Array.isArray(rawMember.skills)) {
        memberChanges.skills = rawMember.skills.map(_id => new ObjectID(_id.toString()));
    }

    const filter = { _id: { $eq: new ObjectID(rawMember._id) } };
    const { value } = await mongoDb.findAndModify(env.mongodb.dbName, 'members', filter, memberChanges);
    const member = value;

    // Resolve member's skills
    if (member.skills.length > 0) {
        member.skills = await querySkills(value.skills);
    }

    return member;
}