import mongoose from "mongoose";

const homeSchema = mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  id: { type: String },
  email: { type: String, required: true },
  age: { type: Number, required: true },
  contactNum: { type: Number, required: true },
  follower: {type :[String]},
  following:{type:[String]},
  saved:{type:[String]}
});

export default mongoose.model("Home", homeSchema);
