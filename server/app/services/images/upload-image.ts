import cloudinary from "cloudinary";

export async function uploadImage(imagePath: string) {
    const options = {
        folder: 'dory-capital/leadership/people',
        overwrite: true,
        notification_url: "https://mysite.example.com/notify_endpoint"
    }

    return cloudinary.v2.uploader.upload(imagePath, options);
}