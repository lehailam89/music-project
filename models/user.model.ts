import mongoose from "mongoose";
import { generateRandomString } from "../helpers/generate";

const userSchema = new mongoose.Schema(
    {
        fullName: String,
        email: String,
        password: String,
        tokenUser: {
            type: String,
            default: generateRandomString(30)
        },
        phone: String,
        avatar: String,
        status: {
            type: String,
            default: "active"
        },
        favoriteMusic: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Song"
        }],
        deleted: {
            type: Boolean,
            default: false
        },
        deletedAt: Date
    },
    {
        timestamps: true
    }
);

const User = mongoose.model('User', userSchema, "users");

export default User;