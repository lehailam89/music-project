"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const generate_1 = require("../helpers/generate");
const userSchema = new mongoose_1.default.Schema({
    fullName: String,
    email: String,
    password: String,
    googleId: String,
    tokenUser: {
        type: String,
        default: (0, generate_1.generateRandomString)(30)
    },
    phone: String,
    avatar: String,
    status: {
        type: String,
        default: "active"
    },
    favoriteMusic: [{
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "Song"
        }],
    deleted: {
        type: Boolean,
        default: false
    },
    deletedAt: Date
}, {
    timestamps: true
});
const User = mongoose_1.default.model('User', userSchema, "users");
exports.default = User;
