import { env } from '../../../config';
import { mongoDb } from '../../dal';
import { querySkills } from '../skills';


export async function queryPageData() {
    const lookup = [{
        $lookup: {
            from: "sections-contents",
            let: { "sectioncontent": "$content" },
            pipeline: [
                { $match: { $expr: { $in: ["$_id", "$$sectioncontent"] } } },
            ],
            as: "content"
        }
    }];

    const cursor = await mongoDb.aggregate(env.mongodb.dbName, 'sections', lookup);
    const sections = await cursor.toArray();

    // Resolve members skills from skills IDS
    const skills = await querySkills([]);
    const skillsObject = skills.reduce((acc, skill) => ({ ...acc, [skill._id]: skill }), {});
    for (let i = 0, length = sections.length; i < length; i++) {
        if (sections[i].name === "Leadership") {
            const members = sections[i].content;
            for (let j = 0, length = members.length; j < length; j++) {
                const skillsIds = sections[i].content[j].skills;
                for (let k = 0, length = skillsIds.length; k < length; k++) {
                    const skillId = sections[i].content[j].skills[k];
                    sections[i].content[j].skills[k] = skillsObject[skillId];
                }
            }

            break;
        }
    }

    return { sections, skills };
}