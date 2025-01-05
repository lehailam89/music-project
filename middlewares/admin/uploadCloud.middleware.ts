import { Request, Response, NextFunction } from "express";
import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";
import dotenv from "dotenv";
dotenv.config();

// Cấu hình Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET,
});

// Hàm streamUpload để tải lên Cloudinary
const streamUpload = (buffer: Buffer): Promise<any> => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream({ resource_type: 'auto' }, (error, result) => {
      if (result) {
        resolve(result);
      } else {
        reject(error);
      }
    });
    streamifier.createReadStream(buffer).pipe(stream);
  });
};

// Hàm uploadToCloudinary để tải lên Cloudinary và trả về URL
const uploadToCloudinary = async (buffer: Buffer): Promise<string> => {
  const result = await streamUpload(buffer);
  return result.url;
};

// Middleware uploadSingle để xử lý tải lên một file
export const uploadSingle = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.file && req.file.buffer) {
      const result = await uploadToCloudinary(req.file.buffer);
      req.body[req.file.fieldname] = result;
    }
  } catch (error) {
    console.log(error);
  }
  next();
};