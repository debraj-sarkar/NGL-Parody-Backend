import express from "express";
import {
  getUserMessages,
  sendAnonymousMessage,
} from "../controllers/messageControllers.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/send/:linkId", sendAnonymousMessage);
router.get("/inbox", verifyToken, getUserMessages);

export default router;
