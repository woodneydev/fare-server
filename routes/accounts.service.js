const knex = require('knex')(require('../knexfile'));

const list = () => {
    return knex("accounts");
  };

const search = (email) => {
  return knex("accounts")
    .where({email})
    .first()
}

module.exports = {
    list, search
}