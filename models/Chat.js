const addChatRecordModel = async (userId, chatId) => {
  try {
    const newUserChat = {
      user_id: userId,
      chat_id: chatId,
      join_timestamp: new Date(),
    };
    const response = await dbConnection("User_chat").insert(newUserChat);
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
    const response = await dbConnection("User_chat")
      .update(leaveTimestamp)
      .where({ user_id: userId, chat_id: chatId });
    if (response) return response;
  } catch (err) {
    console.log(err);
  }
};

module.exports = { addChatRecordModel, leaveChatModel };
