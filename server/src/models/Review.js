import mongoose, { Schema } from "mongoose";
import modelOptions from "./modelOptions.js";

const ReviewSchema = new mongoose.Schema({
    user: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    content: {type: String, required: true},
    mediaType: {type: String, enum: ['tv', 'movie'], required: true},
    mediaId: {type: String, required: true},
    mediaTitle: {type: String, required: true},
    mediaPoster: {type: String, required: true}
}, modelOptions)

const ReviewModel = mongoose.model('Review', ReviewSchema);
export default ReviewModel;