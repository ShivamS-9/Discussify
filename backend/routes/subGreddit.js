import express from "express";
import { getSubG, searchSubG, filterSubG, sortSubG, addPosts} from "../controllers/subgreddit.js";
const router = express.Router();

router.post('/addPosts/:id', addPosts)
router.get('/', getSubG);
router.get('/search', searchSubG)
router.post('/filter', filterSubG)
router.get('/sort', sortSubG)

export default router;