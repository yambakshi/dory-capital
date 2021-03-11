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
                { $sort: { _id: 1 } }
            ],
            as: "paragraphs"
        }
    },
    { $sort: { _id: 1 } }];

    const cursor = await mongoDb.aggregate(env.mongodb.dbName, 'sections', lookup);
    const sections = await cursor.toArray();
    const skills = await querySkills([]);
    const members = await queryMembers([]);

    // Resolve and order members
    const membersMap = members.reduce((acc, member) => ({ ...acc, [member._id]: member }), {});
    const resolvedMembers = [];
    const membersIds = sections[3].members;
    for (let i = 0, length = membersIds.length; i < length; i++) {
        const _id = membersIds[i];
        resolvedMembers.push(membersMap[_id]);
    }

    sections[3].members = resolvedMembers;

    return { sections, skills };
}