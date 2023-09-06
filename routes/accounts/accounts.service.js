const knex = require('knex')(require('../../knexfile'));

const list = () => {
    return knex("accounts");
  };

const findUserByEmail = (email) => {
  console.log(email)
  return knex("accounts")
    .where({email})
    .first()
}

const add = (user) => {
  return knex("accounts")
  .insert(user)
  .then((result) => {
    return knex("accounts")
      .where({ id: result[0] })
  })
}

module.exports = {
    list, findUserByEmail, add, 
}