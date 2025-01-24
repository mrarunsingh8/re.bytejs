import mongoose from "mongoose";

const schema = new mongoose.Schema({
    url_id: mongoose.Schema.Types.ObjectId,
    createdAt: { type: Date, default: Date.now }
});

const ShortnerTrackerModel = mongoose.model('ShortnerTracker', schema);

export default ShortnerTrackerModel;