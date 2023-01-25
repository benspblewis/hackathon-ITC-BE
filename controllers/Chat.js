const {addChatRecordModel,leaveChatModel} = require('../models/Chat')

const addChatRecord = async (req,res)=>{
    try{
        const {userId,language} = req.body;
        //axios request for chat id 
        //const chatId = axios response
        const success = await addChatRecordModel(userId, chatId)
        if(success){
            res.send({ok: true, chatId:chatId})
            // axios post chat Id
        }
    }catch(err){
        console.log(err)
    }
}

const leaveChat = async (req,res) =>{
    try{
        const {userId, chatId} = req.body;
        const success = await leaveChatModel(userId,chatId);
        if(success){
            res.send({ok:true, message: "chat left"})
            //axios post chat id 
        }
    }catch(err){
        console.log(err)
    }
}
module.exports ={addChatRecord,leaveChat}
