const { default: axios } = require("axios");
const { addChatRecordModel, leaveChatModel } = require("../models/Chat");

const addChatRecord = async (req, res) => {
  try {
    const { userId, language } = req.body;
    const chatId = await axios.post("API URL", req.body);
    if (!chatId) {
      throw new Error("chatId not found");
    }
    const success = await addChatRecordModel(userId, chatId);
    if (success) {
      // axios post chat Id
      res.send({ ok: true, chatId: chatId });
    }
  } catch (err) {
    console.log(err);
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
module.exports = { addChatRecord, leaveChat };
