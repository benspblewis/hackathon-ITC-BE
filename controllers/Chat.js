const { default: axios } = require("axios");
const {
  addChatRecordModel,
  leaveChatModel,
  roomAssignModel,
} = require("../models/Chat");

const enterChat = async (req, res) => {
  console.log(req.body)
  try {
    const { userId, language } = req.body;
    // const chatIdResponse = await axios.get(
    //   "http://ec2-35-159-22-109.eu-central-1.compute.amazonaws.com:8080/get_chat_id",
    //   { data: req.body }
    // );
    // let chatId = await chatIdResponse.data;
    // if (!chatId) {
    //   console.log("errorhere")
    //   throw new Error("chatId not found");
    // }
    // if (chatId == 0) {
    //   const chatRoomAssignResponse = await roomAssignModel(userId, language);
    //   if (!chatRoomAssignResponse) {
    //     throw new Error("chat room not created");
    //   }
    //   if (chatRoomAssignResponse) {
    //     chatId = chatRoomAssignResponse;
    //     const chatRecordResponse = await addChatRecordModel(userId, chatId);
    //     if (chatRecordResponse) {
    //       res.send({ ok: true, chatId: chatId });
    //     }
    //   }
    // }
    // if (chatId != 0) {
    //   const chatRecordResponse = await addChatRecordModel(userId, chatId);
    //   if (chatRecordResponse) {
    //     res.send({ ok: true, chatId: chatId });
    //   }
    // }

    res.send({chatId: 30 })
  } catch (err) {
    err.status(404).send(err)
  }
};

const leaveChat = async (req, res) => {
  try {
    const { userId, chatId } = req.body;
    const success = await leaveChatModel(userId, chatId);
    if (success) {
      res.send({ ok: true, message: "chat left" });
      //axios post chat id
    }
  } catch (err) {
    console.log(err);
  }
};
module.exports = { enterChat, leaveChat };
