import { env } from '../../../config';
import { mongoDb } from '../../dal';


export async function queryMembers(ids: string[]) {
    const lookup = [{
        $lookup: {
            from: "skills",
            let: { "skills": "$skills" },
            pipeline: [
                { $match: { $expr: { $in: ["$_id", "$$skills"] } } },
            ],
            as: "skills"
        }
    }];

    const cursor = await mongoDb.aggregate(env.mongodb.dbName, 'members', lookup);
    return cursor.toArray();
}