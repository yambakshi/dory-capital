import { env } from '../../../config';
import { mongoDb } from '../../dal';
import { SectionContent } from '../../models/section-content';
import { Section } from '../../models/section';
import { ObjectID } from 'mongodb';


export async function insertSections(sections: Section[]) {
    // Empty provided sections contents arrays into 'sectionsContents' arrays
    const sectionsContents: { [key: string]: SectionContent[] } = {};
    for (let i = 0, length = sections.length; i < length; i++) {
        const sectionName = sections[i].name;
        sectionsContents[sectionName] = [];
        sections[i].content.forEach(contentItem => {
            sectionsContents[sectionName].push(contentItem)
        });

        sections[i].content = [];
    }

    // Insert empty sections into 'sections' collection
    let output = await mongoDb.insertMany(env.mongodb.dbName, 'sections', sections);

    // Assign each section content instance its sectionId as retrieved from MongoDB result
    output.ops.forEach(({ _id, name }) => {
        sectionsContents[name].forEach(content => content.sectionId = _id);
    })

    // Flatted 'sectionsContents' into one big array of SectionsContent instances
    const flatSectionsContents = Object.values(sectionsContents).reduce((acc, sectionContents) => acc.concat(sectionContents), [])

    // Bulk insert all sections contents into 'sections-contents' collection
    output = await mongoDb.insertMany(env.mongodb.dbName, 'sections-contents', flatSectionsContents);

    // Map sectionsIds to 'sectionContent' MongoDB ids
    const contentsIds: { [key: string]: string[] } = {};
    output.ops.forEach(({ _id, sectionId }) => {
        if (!Array.isArray(contentsIds[sectionId])) {
            contentsIds[sectionId] = [];
        }

        contentsIds[sectionId].push(_id);
    })

    // Push each sectionContent ids array into correlating document in 'section' collection
    const contentsIdsKeys = Object.keys(contentsIds);
    for (let i = 0, length = contentsIdsKeys.length; i < length; i++) {
        const sectionsId = contentsIdsKeys[i];
        const filter = { _id: { $eq: new ObjectID(sectionsId) } };
        const data = { content: { $each: contentsIds[sectionsId] } };
        await mongoDb.push(env.mongodb.dbName, 'sections', filter, data);
    }

    return { message: "Successfully created sections" };
}