import cloudinary from "cloudinary";
import fs from 'fs';


export async function uploadImage(imagePath: string) {
    const options = {
        folder: 'dory-capital/leadership/members',
    }

    const result = await cloudinary.v2.uploader.upload(imagePath, options);
    fs.unlinkSync(imagePath);

    return result
}