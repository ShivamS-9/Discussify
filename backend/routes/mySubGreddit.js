import express from "express";
import {
  getPosts,
  createPost,
  deletePost,
  handleReq,
  handleLeave,
  handleSubG,
  acceptReq,
  rejectReq,
  handlegetSubG,
  handleReports,
  remReq,
  handleVisitor
} from "../controllers/mysubgreddit.js";
const router = express.Router();

router.get("/", getPosts);
router.post("/", createPost);
router.put("/:id", deletePost);
router.post("/sendReq/:id", handleReq);
router.post("/sendLeave/:id", handleLeave);
router.get("/subG/:sub", handleSubG);
router.get('/get/:id', handlegetSubG)
router.put("/acceptReq/:id", acceptReq);
router.put("/rejectReq/:id", rejectReq);
router.put("/handleReports/:id", handleReports);
router.put("/removeReq/:id", remReq)
router.post('/handleVisitor/:id', handleVisitor)


export default router;
