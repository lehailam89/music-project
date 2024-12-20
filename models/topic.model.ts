import mongoose from 'mongoose';

const topicSchema = new mongoose.Schema(
    {
        title: String,
        avartar: String,
        description: String,
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

const Topic = mongoose.model('Topic', topicSchema, "topics");

export default Topic;