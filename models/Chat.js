const addChatRecordModel = async (userId,language) =>{
    try{
        //create object for params and add join timestamp
        const response = await dbConnection('User_chat').insert()
        if(response){
            return response
        }
    }catch(err){
        console.log(err)
    }
}
const leaveChatModel = async (userId,chatId)=>{
    try{
        //close socket connection with room 
        
        const response = await dbConnection('User_chat').update()// add leave timestamp 
        if(response) return response
    }catch(err){
        console.log(err)
    }
}

module.exports ={addChatRecordModel,leaveChatModel}