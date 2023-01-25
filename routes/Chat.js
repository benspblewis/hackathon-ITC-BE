const express = require("express");
const router = express.Router();
const chatController = require("../controllers/Chat");

//join chat

router.post("/join-chat", chatController.enterChat);

router.put("/leave-room", chatController.leaveChat);

// leave chat

module.exports = router;
