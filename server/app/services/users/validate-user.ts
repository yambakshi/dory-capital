import { env } from '../../../config';
import { mongoDb } from '../../dal';
import { User } from '../../models';
import bcrypt from 'bcrypt';


export async function validateUser(user: User) {
    const dbUser = await mongoDb.findOne(env.mongodb.dbName, 'users', { email: user.email });
    if (!dbUser) {
        Promise.reject("User doesn't exist");
    }

    const result = bcrypt.compare(user.password, dbUser.password);
    if (!result) {
        Promise.reject("Wrong password");
    }

    const output = mongoDb.insert(env.mongodb.dbName, 'users', [user]);
    return output;
}