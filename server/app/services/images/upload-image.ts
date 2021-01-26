import cloudinary from "cloudinary";

export async function uploadImage(imagePath: string) {
    const options = {
        folder: 'dory-capital/leadership/members',
    }

    return cloudinary.v2.uploader.upload(imagePath, options);
}