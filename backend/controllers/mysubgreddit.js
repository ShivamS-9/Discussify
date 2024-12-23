import express from "express";
import mongoose from "mongoose";
import Home from "../models/home.js";
import Posts from "../models/posts.js";
import SubGredditMessage from "../models/subGredditMessage.js";

const router = express.Router();
export const getPosts = async (req, res) => {
  try {
    const subGredditMessages = await SubGredditMessage.find();

    res.status(200).json(subGredditMessages);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createPost = async (req, res) => {
  const {
    name,
    description,
    tags,
    bannedKeywords,
    imageFile,
    createdAt,
    createdBy,
  } = req.body;
  const newSubGreddit = new SubGredditMessage({
    name,
    description,
    imageFile,
    tags: tags.split(", "),
    bannedKeywords: bannedKeywords.split(", "),
    createdAt,
    createdBy,
    user: createdBy,
    stats: [],
  });
  try {
    await newSubGreddit.save();

    res.status(201).json(newSubGreddit); // successful creation 201
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const deletePost = async (req, res) => {
  const { id } = req.params;
  const body = req.body;
  // console.log(body)
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No post exists with such ID");

  const sub = await SubGredditMessage.findById(id);

  for (let posts in sub.postS) {
    // console.log(sub.postS[posts]);
    await Home.findByIdAndUpdate(
      { _id: body._id },
      { $pull: { saved: mongoose.Types.ObjectId(sub.postS[posts]) } }
    );
    await Posts.findByIdAndDelete(mongoose.Types.ObjectId(sub.postS[posts]));
  }

  await SubGredditMessage.findByIdAndDelete(mongoose.Types.ObjectId(id));

  res.json({ message: "Post deleted successfully" });
};

export const handleReq = async (req, res) => {
  const { id } = req.params;
  const user_id = req.body;
  await SubGredditMessage.findByIdAndUpdate(
    { _id: id },
    { $addToSet: { requests: user_id._id } }
  );

  res.json({ message: "Request Sent successfully" });
};

export const handleLeave = async (req, res) => {
  const { id } = req.params;
  const user_id = req.body;
  try {
    await SubGredditMessage.findByIdAndUpdate(
      { _id: id },
      { $pull: { user: user_id._id }, $addToSet: { left: user_id._id } }
    );

    res.json({ message: "Left Sent successfully" });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const handleSubG = async (req, res) => {
  try {
    const { sub } = req.params;
    // console.log(sub);
    const result = await SubGredditMessage.findOne({ name: sub });
    // console.log(result)
    res.status(201).json(result);
  } catch (error) {
    console.log(error);
  }
};

export const handlegetSubG = async (req, res) => {
  try {
    const { id } = req.params;
    // console.log(sub);
    const result = await SubGredditMessage.findById({ _id: id });
    // console.log(result)
    res.status(201).json(result);
  } catch (error) {
    console.log(error);
  }
};

export const acceptReq = async (req, res) => {
  const { id } = req.params;
  const sub = req.body;
  try {
    const result = await SubGredditMessage.findByIdAndUpdate(
      { _id: sub._id },
      { $pull: { requests: id }, $addToSet: { user: id } }
    );
    const date = new Date();

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    // This arrangement can be altered based on how we want the date's format to appear.
    let currentDate = `${day}-${month}-${year}`;
    console.log(currentDate); // "17-6-2022"

    const analytics = await SubGredditMessage.findOne({
      _id: sub._id,
      stats: { $elemMatch: { date: currentDate } },
    });

    console.log(analytics);
    if (!analytics) {
      console.log("test 1");
      const create_analytics = await SubGredditMessage.findOneAndUpdate(
        { _id: sub._id },
        {
          $push: {
            stats: {
              date: currentDate,
              newJoined: 1,
              newPosts: 0,
              Visitors: 0,
            },
          },
        }
      );
      console.log("ok");
    } else {
      const update_analytics = await SubGredditMessage.findOneAndUpdate(
        { _id: sub._id, stats: { $elemMatch: { date: currentDate } } },
        { $inc: { "stats.$.newJoined": 1 } },
        { new: true }
      )
        .lean()
        .exec();
      console.log("to update");
      console.log(update_analytics);
    }

    // console.log(result)
    res.status(201).json(result);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const rejectReq = async (req, res) => {
  const { id } = req.params;
  const sub = req.body;
  try {
    const result = await SubGredditMessage.findByIdAndUpdate(
      { _id: sub._id },
      { $pull: { requests: id } }
    );

    // console.log(result)
    res.status(201).json(result);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const handleReports = async (req, res) => {
  const { id } = req.params;
  const sub = req.body;

  try {
    const result = await SubGredditMessage.findByIdAndUpdate(
      { _id: id },
      {
        $addToSet: {
          reports: [
            sub.concern,
            sub.reportedBy,
            sub.reportedUser,
            sub.text,
            sub.post_id,
          ],
        },
      }
    );

    await SubGredditMessage.findOneAndUpdate({_id:id},{$inc:{reportCount: 1}},{upsert:true})
    // console.log(result)
    res.status(201).json(result);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const remReq = async (req, res) => {
  const { id } = req.params;
  const sub = req.body;
  // console.log(sub)
  try {
    const result = await SubGredditMessage.findByIdAndUpdate(
      { _id: id },
      { $pull: { reports: sub } }
    );
    // console.log(result);
    res.status(201).json(result);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const handleVisitor = async (req, res) => {
  const { id } = req.params;
  
  try {
    const date = new Date();

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    // This arrangement can be altered based on how we want the date's format to appear.
    let currentDate = `${day}-${month}-${year}`;
    console.log(currentDate); // "17-6-2022"

    const analytics = await SubGredditMessage.findOne({
      _id: id,
      stats: { $elemMatch: { date: currentDate } },
    })

    console.log(analytics);
    if (!analytics) {
      console.log('test 1');
      const create_analytics = await SubGredditMessage.findOneAndUpdate(
        { _id: id },
        {
          $push: {
            stats: {
              date: currentDate,
              newJoined: 0,
              newPosts: 0,
              Visitors: 1,
            }
          }
        }
      )
      console.log('ok');
    } else {
      const update_analytics = await SubGredditMessage.findOneAndUpdate(
        { _id: id, stats: { $elemMatch: { date: currentDate } } },
        { $inc: { "stats.$.Visitors": 1 } },
        { new: true }
      )
        .lean()
        .exec();
      console.log("to update");
      console.log(update_analytics);
    }
    // console.log(result);
    res.status(201).json({'message':"ok"});
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export default router;
