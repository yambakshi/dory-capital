import cloudinary from "cloudinary";

export async function deleteImages(publicIds: string[]) {
    cloudinary.v2.api.delete_resources(publicIds);
}