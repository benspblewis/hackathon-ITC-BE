const dbConnection = require("../knex/knex");

const addChatRecordModel = async (userId, chatId) => {
  try {
    const newUserChat = {
      user_id: userId,
      chat_id: chatId,
      join_timestamp: new Date(),
    };
    const response = await dbConnection("User_Chat").insert(newUserChat);
    if (response) {
      return response;
    }
  } catch (err) {
    console.log(err);
  }
};
const leaveChatModel = async (userId, chatId) => {
  try {
    //close socket connection with room

    const leaveTimestamp = { leave_timestamp: new Date() };
    const response = await dbConnection("User_Chat")
      .update(leaveTimestamp)
      .where({ user_id: userId, chat_id: chatId });
    if (response) return response;
  } catch (err) {
    console.log(err);
  }
};

const roomAssignModel = async (language) => {
  try {
    const chat_id = Math.random();
    const response = await dbConnection("Chat_Rooms").insert({
      chat_id: chat_id,
      language: language,
    });
    if (!response) {
      return { ok: false, message: "chat room not created" };
    }
    return chat_id;
  } catch (err) {
    console.log(err);
  }
};
module.exports = { addChatRecordModel, leaveChatModel, roomAssignModel };
