import { ObjectID } from 'mongodb';
import { env } from '../../../config';
import { mongoDb } from '../../dal';
import { deleteImages, uploadImage } from '../images';
import { querySkills } from '../skills';


export async function updatePersonProfile(update: { _id: string, data: any }) {
    if (update.data.profilePictureFile) {
        const imageFile = update.data.profilePictureFile.file;
        const oldImageId = update.data.imageId;
        update.data.imageId = (await uploadImage(imageFile.path)).public_id;
        await deleteImages(oldImageId);
    }

    if (update.data.skills && Array.isArray(update.data.skills)) {
        update.data.skills = update.data.skills.map(_id => new ObjectID(_id));
    }

    const result = await mongoDb.findAndModify(env.mongodb.dbName, 'people', update);

    if (!result.ok) {
        return Promise.reject("Member update failed");
    }

    const member = result.value;
    const resolvedSkills = await querySkills(member.skills);
    if (resolvedSkills.length !== member.skills.length) {
        return Promise.reject("Invalid skills IDs");
    }

    member.skills = resolvedSkills;

    return member;
}