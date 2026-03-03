import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function uploadImage(
  file: string, // base64 or URL
  folder: string = process.env.CLOUDINARY_FOLDER || "JOYFULMEDIA"
) {
  const result = await cloudinary.uploader.upload(file, {
    folder,
    resource_type: "image",
  });
  return {
    url: result.secure_url,
    publicId: result.public_id,
    width: result.width,
    height: result.height,
  };
}

export async function deleteImage(publicId: string) {
  return cloudinary.uploader.destroy(publicId);
}

export async function listImages(folder: string = "JOYFULMEDIA") {
  const result = await cloudinary.search
    .expression(`folder:${folder}/*`)
    .max_results(100)
    .execute();
  return result.resources;
}

export default cloudinary;
