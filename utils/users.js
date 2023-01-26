const users = [];

// Join user to chat

function userJoin(id, userId, roomId) {
  const user = { id, userId, roomId };
  users.push(user);
  console.log(users)
  return user;
}

//get current user
function getCurrentUser(id){
    return users.find(user => user.id === id)
}

// user leaves the chat

function userLeave(id){
  const index = users.findIndex(user => user.id === id)
  if(index !== -1){
    return users.splice(index, 1)[0]
  }
}

// get roo users
function getRoomUsers(room){
  return users.filter((user)=> user.room === room)
}
module.exports = {userJoin, getCurrentUser, userLeave,getRoomUsers}

