
function formatMessage(userName, text){
    return {
        userName,
        text,
        time: new Date()
    }
}
module.exports = {formatMessage}