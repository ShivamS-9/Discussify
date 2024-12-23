import express from "express";
import verify from "../middleware/verify.js";
import { getUser } from "../controllers/home.js";
import { updateUser } from "../controllers/home.js";
import { searchUser } from "../controllers/home.js";
import { userFollowing } from "../controllers/home.js";
import { userFollower } from "../controllers/home.js";
import { getDetails } from "../controllers/home.js";
import { userFollowerDelete } from "../controllers/home.js";
import { userFollowingDelete , saved, remsaved} from "../controllers/home.js";

const router = express.Router();


router.put("/followingDelete/:id", userFollowingDelete);
router.put("/:id", updateUser);
router.get("/search", searchUser);
router.put("/following/:id", userFollowing);
router.put("/follower/:id", userFollower);
router.get("/getuser/:id", getDetails);
router.put("/followerDelete/:id", userFollowerDelete);
router.put('/saved/:id', saved);
router.put('/remsaved/:id', remsaved);
router.use(verify);
router.get("/", getUser);

export default router;
