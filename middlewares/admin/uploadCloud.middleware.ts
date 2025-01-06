import { Request, Response, NextFunction } from "express";
import { uploadToCloudinary } from "../../helpers/uploadToCloudinary";

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

// Middleware uploadFields để xử lý tải lên nhiều file
export const uploadFields = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.files) {
      for (const key in req.files) {
        req.body[key] = [];
        const array = (req.files as { [fieldname: string]: Express.Multer.File[] })[key];
        for (const item of array) {
          const result = await uploadToCloudinary(item.buffer);
          req.body[key].push(result);
        }
      }
    }
  } catch (error) {
    console.log(error);
  }
  next();
};