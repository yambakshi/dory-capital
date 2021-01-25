import { env } from '../../../config';
import { mongoDb } from '../../dal';
import { querySkills } from '../skills';

// export async function queryPageData() {
//     const lookup = [{
//         $lookup: {
//             from: "people",
//             let: { "leadershippeople": "$leadership.people" },
//             pipeline: [
//                 { $match: { $expr: { $in: ["$_id", "$$leadershippeople"] } } },
//                 {
//                     $lookup: {
//                         from: "skills",
//                         let: { "skills": "$skills" },
//                         pipeline: [
//                             { "$match": { "$expr": { "$in": ["$_id", "$$skills"] } } }
//                         ],
//                         as: "skills"
//                     }
//                 }
//             ],
//             as: "leadership.people"
//         }
//     }];

//     const cursor = await mongoDb.aggregate(env.mongodb.dbName, 'page-content', lookup);
//     return cursor.toArray();
// }

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
    for (let i = 0, length = sections.length; i < length; i++) {
        if (sections[i].name === "Leadership") {
            for (let j = 0, length = sections[i].content.length; j < length; j++) {
                sections[i].content[j].skills = await querySkills(sections[i].content[j].skills);
            }

            break;
        }        
    }

    return sections
}