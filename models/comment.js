import {Schema, model} from "mongoose";

const commentSchema = new Schema({
    body: String,
    videoId: {
        type: Schema.Types.ObjectId,
        ref: 'Video'
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})
