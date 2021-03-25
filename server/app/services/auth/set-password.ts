import { env } from '../../../config';
import { mongoDb } from '../../dal';
import bcrypt from 'bcrypt';


export async function setPassword(password: string): Promise<{ success: boolean, message: string }> {
    const email = 'asher@dory.capital';
    const hash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    const { result } = await mongoDb.updateOne(env.mongodb.dbName, 'users', { email }, { password: hash });
    const success = !!result.nModified;

    return {
        success,
        message: success ?
            'Successfully changed password' :
            'Failed to change password'
    };
}