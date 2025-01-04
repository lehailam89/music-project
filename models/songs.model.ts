import mongoose from 'mongoose';

const singerSchema = new mongoose.Schema(
    {
        title: String,
        avatar: String,
        description: String,
        singerId: String,
        topicId: String,
        like: Number,
        listen: {
            type: Number,
            default: 0
        },
        lyrics: String,
        audio: String,
        status: String,
        slug: String,
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

const Song = mongoose.model('Song', singerSchema, "songs");

export default Song;