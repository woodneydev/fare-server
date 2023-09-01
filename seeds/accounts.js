const accountsData = require("../seed-data/accounts-data");

exports.seed = async function(knex) {
  await knex('accounts').del()
  await knex('accounts').insert(accountsData);
};
