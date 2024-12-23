import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  Text: { type: String },
  PostedBy: { type: String },
  PostedIn: { type: String },
  Upvotes: { type: [String] },
  Downvotes: { type: [String] },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  // savedby: { type: [String] },
  comments: { type: [[String]] },
  // ReportedBy: String,
  // ReportedUser: String,
});

var Posts = mongoose.model("Posts", postSchema);

export default Posts;
