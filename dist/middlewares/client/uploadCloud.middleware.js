"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadAvatar = exports.uploadSingle = void 0;
const multer_1 = __importDefault(require("multer"));
const uploadToCloudinary_1 = require("../../helpers/uploadToCloudinary");
const storage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({ storage: storage });
exports.uploadSingle = upload.single("avatar");
const uploadAvatar = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.file && req.file.buffer) {
            const result = yield (0, uploadToCloudinary_1.uploadToCloudinary)(req.file.buffer);
            req.body.avatar = result;
        }
    }
    catch (error) {
        console.log(error);
    }
    next();
});
exports.uploadAvatar = uploadAvatar;
