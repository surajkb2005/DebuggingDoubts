//Backend/src/models/Activity.js
import mongoose from "mongoose";

const activitySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    videoId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Video",
        required: true
    },

    category: String,

    watchedAt: {
        type: Date,
        default: Date.now
    }

});

export default mongoose.model("Activity", activitySchema);