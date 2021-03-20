import { ObjectID } from 'mongodb';
import { env } from '../../../config';
import { mongoDb } from '../../dal';
import { Paragraph } from '../../models';


export async function updateText({ _id, title, text }: Paragraph) {
    const filter = { _id: { $eq: new ObjectID(_id) } };
    const data = { ...title && { title }, ...text && { text } };
    const { ok, value } = await mongoDb.findAndModify(env.mongodb.dbName, 'paragraphs', filter, data);

    return {
        success: !!ok,
        message: 'Successfully updated paragraph',
        data: value
    };
}