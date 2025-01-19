import { Request, Response, NextFunction } from "express";
import multer from "multer";
import { uploadToCloudinary } from "../../helpers/uploadToCloudinary";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

export const uploadSingle = upload.single("avatar");

export const uploadAvatar = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.file && req.file.buffer) {
      const result = await uploadToCloudinary(req.file.buffer);
      req.body.avatar = result;
    }
  } catch (error) {
    console.log(error);
  }
  next();
};