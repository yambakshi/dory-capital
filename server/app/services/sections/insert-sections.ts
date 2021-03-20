import { env } from '../../../config';
import { mongoDb } from '../../dal';
import { Section } from '../../models/section';
import { ObjectID } from 'mongodb';
import { Paragraph } from '../../models';


export async function insertSections(sections: Section[]) {
    // Empty provided sections paragraphs arrays into 'paragraphs' arrays
    const paragraphs: { [key: string]: Paragraph[] } = {};
    for (let i = 0, length = sections.length; i < length; i++) {
        const sectionName = sections[i].name;
        paragraphs[sectionName] = [];
        sections[i].paragraphs.forEach(paragraph => {
            paragraphs[sectionName].push(paragraph)
        });

        sections[i].paragraphs = [];
    }

    // Insert empty sections into 'sections' collection
    let output = await mongoDb.insertMany(env.mongodb.dbName, 'sections', sections);

    // Assign each paragraph its sectionId as retrieved from MongoDB result
    output.ops.forEach(({ _id, name }) => {
        paragraphs[name].forEach(paragraph => paragraph.sectionId = _id);
    })

    // Flatted 'paragraphs' into one big array of SectionsContent instances
    const flatSectionsContents = Object.values(paragraphs).reduce((acc, sectionContents) => acc.concat(sectionContents), [])

    // Bulk insert all sections' paragraphs into 'paragraphs' collection
    output = await mongoDb.insertMany(env.mongodb.dbName, 'paragraphs', flatSectionsContents);

    // Map sectionsIds to 'paragraphs' MongoDB ids
    const paragraphsIds: { [key: string]: string[] } = {};
    output.ops.forEach(({ _id, sectionId }) => {
        if (!Array.isArray(paragraphsIds[sectionId])) {
            paragraphsIds[sectionId] = [];
        }

        paragraphsIds[sectionId].push(_id);
    })

    // Push each sectionContent ids array into correlating document in 'section' collection
    const paragraphsIdsKeys = Object.keys(paragraphsIds);
    for (let i = 0, length = paragraphsIdsKeys.length; i < length; i++) {
        const sectionsId = paragraphsIdsKeys[i];
        const filter = { _id: { $eq: new ObjectID(sectionsId) } };
        const data = { paragraphs: { $each: paragraphsIds[sectionsId] } };
        await mongoDb.push(env.mongodb.dbName, 'sections', filter, data);
    }

    return {
        success: true,
        message: 'Successfully created sections'
    };
}