const dbConnection = require('../knex/knex')

const addUserModel = async (newUser) => {
  try {
    const [id] = await dbConnection.from('Users').insert(newUser); // returns id of inserted
    return id;
  } catch (err) {
    console.log(err);
  }
};

const getUserByEmailModel = async (userEmail)=>{
  try{
    const [user] = await dbConnection.from('Users').where({email:userEmail})
    return user;
  }catch(err){
    console.log(err)
  }
}

module.exports = { addUserModel, getUserByEmailModel };