import { env } from '../../../config';
import { mongoDb } from '../../dal';
import { queryMembers } from '../members';
import { querySkills } from '../skills';


export async function queryPageData() {
    const lookup = [{
        $lookup: {
            from: "paragraphs",
            let: { "paragraphs": "$paragraphs" },
            pipeline: [
                { $match: { $expr: { $in: ["$_id", "$$paragraphs"] } } },
            ],
            as: "paragraphs"
        }
    }];

    const cursor = await mongoDb.aggregate(env.mongodb.dbName, 'sections', lookup);
    const sections = await cursor.toArray();

    // Resolve members skills from skills IDS
    const skills = await querySkills([]);
    const members = await queryMembers([]);
    const skillsObject = skills.reduce((acc, skill) => ({ ...acc, [skill._id]: skill }), {});

    for (let j = 0, length = members.length; j < length; j++) {
        const skillsIds = members[j].skills;
        for (let k = 0, length = skillsIds.length; k < length; k++) {
            const skillId = members[j].skills[k];
            members[j].skills[k] = skillsObject[skillId];
        }
    }

    return { sections, skills, members };
}