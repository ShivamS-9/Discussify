import express from "express";
import {
  createPost,
  getPosts,
  handleUpadd,
  handleUprem,
  handleDownadd,
  handleDownrem,
  putComments,
  getComments,
  remPost
} from "../controllers/posts.js";

const router = express.Router();

router.put("/:id", createPost);
router.get("/getPosts/:id", getPosts);
router.put("/Upadd/:id", handleUpadd);
router.put("/Uprem/:id", handleUprem);
router.put("/Downadd/:id", handleDownadd);
router.put("/Downrem/:id", handleDownrem);
router.put("/comment/:id", putComments);
router.get("/getcomment/:id", getComments);
router.put('/removePost/:id', remPost)

export default router;
