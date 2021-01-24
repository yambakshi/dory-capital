import { ObjectID } from 'mongodb';
import { env } from '../../../config';
import { mongoDb } from '../../dal';
import { querySkills, uploadImage } from '../../services';


export async function createPeopleProfiles({ _id, data }: { _id: string, data: any }) {
    const path = Object.keys(data)[0];
    const imageFile = data[path][0].profilePictureFile.file;
    data[path][0].imageId = (await uploadImage(imageFile.path)).public_id;
    data[path].forEach(member => {
        member.skills.forEach((skillId, i) => {
            member.skills[i] = new ObjectID(skillId);
        })
    })

    // Insert new member into 'members' collection
    const { ops } = await mongoDb.insertMany(env.mongodb.dbName, 'people', data[path]);
    const objectIds = ops.map(({ _id }) => _id);
    const pushData = {
        _id,
        data: { [path]: { $each: objectIds } }
    }

    // Insert new member id into 'page-content' collection
    await mongoDb.push(env.mongodb.dbName, 'page-content', pushData);

    const newMembers = [];
    for (let i = 0, length = ops.length; i < length; i++) {
        const { _id, name, link, skills, imageId } = ops[i]
        const resolvedSkills = await querySkills(data[path][0].skills);
        if (resolvedSkills.length !== skills.length) {
            return Promise.reject("Invalid skills IDs");
        }

        const newMember = {
            _id,
            name,
            link,
            skills: resolvedSkills,
            imageId
        }

        newMembers.push(newMember);
    }

    return newMembers;
}