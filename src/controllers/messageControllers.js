import User from "../models/userModel.js";
import Message from "../models/messageModel.js";

export const sendAnonymousMessage = async (req, res) => {
  try {
    const { linkId } = req.params;
    const { message } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({ error: "Message is required" });
    }

    const user = await User.findOne({ linkId });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const newMessage = new Message({
      recipient: user._id,
      message: message.trim(),
    });

    await newMessage.save();
    return res.status(201).json({ message: "Message sent successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getUserMessages = async (req, res) => {
  try {
    const userId = req.userId;
    const messages = await Message.find({ recipient: userId }).sort({
      createdAt: -1,
    });

    const user = await User.findById(userId);

    return res
      .status(200)
      .json({ username: user.username, email: user.email, messages: messages });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
