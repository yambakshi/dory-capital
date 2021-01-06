import { mongoDb } from '../../dal';


export async function insertParagraphs(paragraphs: any[]) {
    const output = mongoDb.insert('dory-capital', 'paragraphs', paragraphs);
    return output;
}