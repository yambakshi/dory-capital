import { env } from '../../../config';
import { mongoDb } from '../../dal';
import { User } from '../../models';
import bcrypt from 'bcrypt';


export async function validateUser(user: User) {
    const dbUser = await mongoDb.findOne(env.mongodb.dbName, 'users', { email: user.email });
    if (!dbUser) {
        return Promise.reject("User doesn't exist");
    }

    const result = bcrypt.compareSync(user.password, dbUser.password);
    if (!result) {
        return Promise.reject("Wrong password");
    }

    return result;
}