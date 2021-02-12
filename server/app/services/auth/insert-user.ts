import { env } from '../../../config';
import { mongoDb } from '../../dal';
import bcrypt from 'bcrypt';


export async function insertUser({ email, password }) {
    const user = await mongoDb.findOne(env.mongodb.dbName, 'users', { email });
    if (user) {
        return Promise.reject('User already exist');
    }

    const hash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    const newUser = { email: email.toLowerCase(), password: hash };

    const output = mongoDb.insertMany(env.mongodb.dbName, 'users', [newUser]);
    return output;
}