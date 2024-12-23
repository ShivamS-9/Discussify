import express from "express";
import mongoose from "mongoose";
import SubGredditMessage from "../models/subGredditMessage.js";
import Fuse from "fuse.js";
const router = express.Router();

export const getSubG = async (req, res) => {
  try {
    const result = await SubGredditMessage.find();
    // console.log(result)
    res.status(200).json(result);
  } catch (error) {
    res.status(404).json(error);
  }
};
export const searchSubG = async (req, res) => {
  const searchTerm = req.query.q;
  const options = {
    // includeScore: true,
    keys: ["name"],
    // threshold: 0.2
  };

  try {
    const fuse = new Fuse(await SubGredditMessage.find(), options);
    const searchResults = fuse.search(searchTerm);
    // SubGredditMessage.find({name: { $regex: searchTerm, $options: "i" },
    // console.log(searchResults);
    res.json(searchResults);
  } catch (error) {
    console.log(error);
  }
};

export const filterSubG = async (req, res) => {
  try {
    const data = req.body;
    // console.log(data);
    const result = await SubGredditMessage.find({ tags: { $in: data } })
      .lean()
      .exec();
    // console.log(result)
    res.status(200).json(result);
  } catch (error) {
    res.status(404).json(error);
  }
};
export const sortSubG = async (req, res) => {
  const { name, num, date } = req.query;
  // console.log(name,num,date)
  const sortCriteria = {};
  if (name) sortCriteria.name = name === "asc" ? 1 : -1;
  if (num) sortCriteria.user = num === "asc" ? 1 : -1;
  if (date) sortCriteria.createdAt = date === "asc" ? 1 : -1;

  try {
    const users = await SubGredditMessage.find({}).sort(sortCriteria);
    // console.log(users)
    res.send(users);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
};

export const addPosts = async (req, res) => {
  const { id } = req.params;
  const post = req.body;
  // console.log(id, post._id)
  try {
    // console.log("hello");
    const result = await SubGredditMessage.findByIdAndUpdate(
      { _id: id },
      { $addToSet: { postS: post._id } }
    );
    
    // console.log(result)
    res.status(200).json(result);
  } catch (error) {
    res.status(404).json(error);
  }
};

export default router;
