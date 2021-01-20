import { env } from '../../../config';
import { mongoDb } from '../../dal';

export async function queryPageContent() {
    const lookup = [{
        $lookup: {
            from: "people",
            let: { "leadershippeople": "$leadership.people" },
            pipeline: [
                { $match: { $expr: { $in: ["$_id", "$$leadershippeople"] } } },
                {
                    $lookup: {
                        from: "skills",
                        let: { "skills": "$skills" },
                        pipeline: [
                            { "$match": { "$expr": { "$in": ["$_id", "$$skills"] } } }
                        ],
                        as: "skills"
                    }
                }
            ],
            as: "leadership.people"
        }
    }];

    const cursor = await mongoDb.aggregate(env.mongodb.dbName, 'page-content', lookup);
    return cursor.toArray();
}