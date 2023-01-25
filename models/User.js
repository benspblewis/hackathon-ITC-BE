const dbConnection = require('../knex/knex')

const addUserModel = async (newUser) => {
  try {
    console.log('addUserModel');
    const [id] = await dbConnection.from('users').insert(newUser);
    return id;
  } catch (err) {
    console.log(err);
  }
};


module.exports = { addUserModel };