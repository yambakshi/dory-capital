import { env } from '../../../config';
import { mongoDb } from '../../dal';
import { User } from '../../models';
import bcrypt from 'bcrypt';


export async function insertUser(user: User) {
    const dbUser = await mongoDb.find(env.mongodb.dbName, 'users', { email: user.email });
    if (dbUser) {
        Promise.reject('User already exist');
    }

    const hash = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10));
    const newUser = {
        email: user.email,
        password: hash
    }

    const output = mongoDb.insertMany(env.mongodb.dbName, 'users', [newUser]);
    return output;
}