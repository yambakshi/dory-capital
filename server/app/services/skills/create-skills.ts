import { env } from '../../../config';
import { mongoDb } from '../../dal';


export async function createSkills(skills: any[]) {
    const output = await mongoDb.insertMany(env.mongodb.dbName, 'skills', skills);
    return output;
}