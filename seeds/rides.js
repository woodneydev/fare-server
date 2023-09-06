const ridesData = require("../seed-data/rides-data");

exports.seed = async function(knex) {
  await knex('rides').del()
  await knex('rides').insert(ridesData);
};
