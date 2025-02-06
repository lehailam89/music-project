import mongoose from 'mongoose';
const slug = require("mongoose-slug-updater");

mongoose.plugin(slug);

const songSchema = new mongoose.Schema(
    {
        title: String,
        avatar: String,
        description: String,
        singerId: String,
        topicId: String,
        like: {
            type: Number,
            default: 0 // Đặt giá trị mặc định cho trường like là 0
        },
        listen: {
            type: Number,
            default: 0
        },
        lyrics: String,
        audio: String,
        status: String,
        slug: { 
            type: String,
            slug: "title", 
            unique: true 
        },
        likedBy: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }],
        deleted: {
            type: Boolean,
            default: false
        },
        deleteAt: Date,
    },
    {
        timestamps: true,
    }
);

const Song = mongoose.model('Song', songSchema, "songs");

export default Song;