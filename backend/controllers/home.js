import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Fuse from "fuse.js";

import Home from "../models/home.js";

export const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const existingUser = await Home.findOne({ username });

    if (!existingUser)
      return res.status(404).json({ message: "User doesn't Exist" });

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid credentials" });
    // if the user is registered and correct pass then we get token
    const token = jwt.sign(
      {
        user_info: {
          username: existingUser.username,
          id: existingUser._id,
        },
      },
      "cute"
    );
    res.status(200).json({ result: existingUser, token });
  } catch (error) {
    res.status(500).json({ message: "Something Went Wrong" });
  }
};

export const register = async (req, res) => {
  const { firstName, lastName, username, email, age, contactNum, password } =
    req.body;
  try {
    const existingUser = await Home.findOne({ username });

    if (existingUser)
      return res.status(400).json({ message: "User Already Exist" });

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await Home.create({
      name: `${firstName} ${lastName}`,
      username,
      email,
      age,
      contactNum,
      password: hashedPassword,
    });
    const token = jwt.sign(
      { username: result.username, id: result._id },
      "cute"
    );
    res.status(200).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "Something Went Wrong" });
  }
};

export const getUser = async (req, res) => {
  try {
    const userName = req.username;
    const user_id = req.user_id;
    // console.log(userName,user_id)

    const result = await Home.findOne({ username: userName })
      .select("-password")
      .lean()
      .exec();

    // console.log(result);

    res.status(200).json(result);
  } catch (error) {
    res.status(404).json(error);
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const userD = req.body;
    // console.log(userD);
    const result = await Home.findByIdAndUpdate({ _id: id }, userD);
    // console.log(result);
    res.status(200).json(result);
  } catch (error) {
    res.status(404).json(error);
  }
};

export const searchUser = async (req, res) => {
  const searchTerm = req.query.q;
  const options = {
    // includeScore: true,
    keys: [
       'username' 
    ],
    // threshold: 0.2
  };
  
  try {
    const fuse = new Fuse(await Home.find() , options);
    const searchResults = fuse.search(searchTerm)
    // Home.find({name: { $regex: searchTerm, $options: "i" },
    // console.log(searchResults);
    res.json(searchResults);
  } catch (error) {
    console.log(error);
  }
};

export const userFollowing = async (req, res) => {
  try {
    const { id } = req.params;
    const userD = req.body;
    // console.log(userD);
    const result = await Home.findByIdAndUpdate(
      { _id: id },
      { $addToSet: { following: userD } }
    );
    // console.log(result);
    res.status(200).json(result);
  } catch (error) {
    res.status(404).json(error);
  }
};

export const userFollower = async (req, res) => {
  try {
    const { id } = req.params;
    const userD = req.body;
    // console.log(userD);
    const result = await Home.findByIdAndUpdate(
      { _id: id },
      { $addToSet: { follower: userD } }
    );
    // console.log(result);
    res.status(200).json(result);
  } catch (error) {
    res.status(404).json(error);
  }
};

export const getDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Home.findById({ _id: id });
    // console.log(result);
    res.status(200).json(result);
  } catch (error) {
    res.status(404).json(error);
  }
};

export const userFollowerDelete = async (req, res) => {
  try {
    const { id } = req.params;
    const user = req.body;
    console.log(id,user)
    const result = await Home.findByIdAndUpdate(
      { _id: user._id },
      { $pull: { follower: id } }
    );
    // console.log(result);
    res.status(200).json(result);
  } catch (error) {
    res.status(404).json(error);
  }
};

export const userFollowingDelete = async (req, res) => {
  try {
    const { id } = req.params;
    // console.log(id);
    const followeR = req.body;
    console.log(followeR);
    const result = await Home.findByIdAndUpdate(
      { _id: followeR.user._id },
      { $pull: { following: id } }
    );
    // console.log(`->${result}`);
    res.status(200).json(result);
  } catch (error) {
    res.status(404).json(error);
  }
};

export const saved = async (req, res) => {
  const { id } = req.params;
  const body = req.body;
  try {
    const result = await Home.findByIdAndUpdate(
      { _id: id },
      { $addToSet: { saved: body._id } }
    );
    // console.log(`->${result}`);
    res.status(200).json(result);
  } catch (error) {
    res.status(404).json(error);
  }
};

export const remsaved = async (req, res) => {
  const { id } = req.params;
  const body = req.body;
  try {
    const result = await Home.findByIdAndUpdate(
      { _id: id },
      { $pull: { saved: body._id } }
    );
    // console.log(`->${result}`);
    res.status(200).json(result);
  } catch (error) {
    res.status(404).json(error);
  }
};
