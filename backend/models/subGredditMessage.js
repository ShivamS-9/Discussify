import mongoose from "mongoose";

const subGredditSchema = mongoose.Schema({
  name: { type: String },
  description: { type: String },
  tags: { type: [String] },
  bannedKeywords: { type: [String] },
  imageFile: { type: String },
  createdBy: { type: String },
  requests: { type: [String] },
  left: { type: [String] },
  reports: { type: [[String]] },
  blocked: { type: [String] },
  stats: [
    {
      newJoined: {
        type: Number,
      },
      date: {
        type: String,
      },
      newPosts: {
        type: Number,
      },
      Visitors: {
        type: Number,
      },
    },
  ],
  deletedPostCount: {
    type: Number,
  },
  reportCount: {
    type: Number,
  },
  user: { type: [String] },
  postS: { type: [String] },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

var SubGredditMessage = mongoose.model("SubGredditMessage", subGredditSchema);

export default SubGredditMessage;
