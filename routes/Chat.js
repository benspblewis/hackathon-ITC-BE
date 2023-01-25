const express = require("express");
const router = express.Router();
const chatController = require('../controllers/Chat')


//join chat

router.post('/join-chat' , chatController.addChatRecord)

router.put('/leave-room', chatController.leaveChat)

// leave chat

