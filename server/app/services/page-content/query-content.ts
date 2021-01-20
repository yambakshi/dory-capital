import { env } from '../../../config';
import { mongoDb } from '../../dal';

export async function queryPageContent() {
    const lookup = [{
        $lookup: {
            from: "people",
            localField: "leadership.people",
            foreignField: "_id",
            as: "leadership.people"
        }
    }];

    const cursor = await mongoDb.aggregate(env.mongodb.dbName, 'page-content', lookup);
    return cursor.toArray();
}