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
    const skills = await querySkills([]);
    const members = await queryMembers([]);

    return { sections, skills, members };
}