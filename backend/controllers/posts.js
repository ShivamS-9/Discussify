import express from "express";
import mongoose from "mongoose";
import Home from "../models/home.js";
import Posts from "../models/posts.js";
import SubGredditMessage from "../models/subGredditMessage.js";
const router = express.Router();

export const createPost = async (req, res) => {
  const { id } = req.params;
  const data = req.body;

  let comment = data.text.split(" ");

  const bannedWords = data.subG.bannedKeywords;

  for (let i = 0; i < bannedWords.length; i++) {
    for (let k = 0; k < comment.length; k++) {
      var dummy = comment[k].split(",");
      for (let j = 0; j < dummy.length; j++) {
        if (dummy[j].toLowerCase() === bannedWords[i].toLowerCase())
          dummy[j] = "*";
      }
      comment[k] = dummy.join(",");
      // console.log(comment[k]);
    }
  }

  const finalText = comment.join(" ");
  // console.log(finalText)
  const newPost = new Posts({
    Text: finalText,
    PostedBy: id,
    PostedIn: data.subG._id,
  });
  try {
    const result = await newPost.save();
    const date = new Date();

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    // This arrangement can be altered based on how we want the date's format to appear.
    let currentDate = `${day}-${month}-${year}`;
    console.log(currentDate); // "17-6-2022"

    const analytics = await SubGredditMessage.findOne({
      _id: data.subG._id,
      stats: { $elemMatch: { date: currentDate } },
    })

    console.log(analytics);
    if (!analytics) {
      console.log('test 1');
      const create_analytics = await SubGredditMessage.findOneAndUpdate(
        { _id: data.subG._id },
        {
          $push: {
            stats: {
              date: currentDate,
              newJoined: 0,
              newPosts: 1,
              Visitors: 0,
            }
          }
        }
      )
      console.log('ok');
    } else {
      const update_analytics = await SubGredditMessage.findOneAndUpdate(
        { _id: data.subG._id, stats: { $elemMatch: { date: currentDate } } },
        { $inc: { "stats.$.newPosts": 1 } },
        { new: true }
      )
        .lean()
        .exec();
      console.log("to update");
      console.log(update_analytics);
    }

    res.status(201).json(newPost); // successful creation 201
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
export const getPosts = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await Posts.findById({ _id: id });
    // console.log(result)

    res.status(201).json(result); // successful creation 201
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
export const handleUpadd = async (req, res) => {
  const { id } = req.params;
  const body = req.body;

  try {
    const result = await Posts.findByIdAndUpdate(
      { _id: body._id },
      { $addToSet: { Upvotes: id } }
    );
    // console.log(result)

    res.status(201).json(result); // successful creation 201
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
export const handleUprem = async (req, res) => {
  const { id } = req.params;
  const body = req.body;

  try {
    const result = await Posts.findByIdAndUpdate(
      { _id: body._id },
      { $pull: { Upvotes: id } }
    );
    res.status(201).json(result); // successful creation 201
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const handleDownadd = async (req, res) => {
  const { id } = req.params;
  const body = req.body;

  try {
    const result = await Posts.findByIdAndUpdate(
      { _id: body._id },
      { $addToSet: { Downvotes: id } }
    );
    // console.log(result)

    res.status(201).json(result); // successful creation 201
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
export const handleDownrem = async (req, res) => {
  const { id } = req.params;
  const body = req.body;

  try {
    const result = await Posts.findByIdAndUpdate(
      { _id: body._id },
      { $pull: { Downvotes: id } }
    );
    res.status(201).json(result); // successful creation 201
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const putComments = async (req, res) => {
  const { id } = req.params;
  const body = req.body;

  try {
    const result = await Posts.findByIdAndUpdate(
      { _id: body.post._id },
      { $push: { comments: [id, body.comment] } }
    );
    // console.log(result);

    res.status(201).json(result); // successful creation 201
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
export const getComments = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await Posts.findById({ _id: id });
    // console.log(result);

    res.status(201).json(result); // successful creation 201
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const remPost = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const post = await Posts.findById(id);
  await SubGredditMessage.findByIdAndUpdate(
    { _id: post.PostedIn },
    { $pull: { postS: id } }
  );
  await SubGredditMessage.findByIdAndUpdate({_id:post.PostedIn},{$inc: {deletedPostCount: 1}},{upsert: true})
  const user_post = await Home.findOneAndUpdate(
    { saved: { $in: [id] } },
    { $pull: { saved: id } },
    { new: true }
  );
  console.log(user_post);
  try {
    const result = await Posts.findByIdAndDelete({ _id: id });

    res.status(201).json({ message: "ok" });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
export default router;
