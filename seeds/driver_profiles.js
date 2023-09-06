const driverProfilesData = require("../seed-data/driver-profiles-data");

exports.seed = async function(knex) {
  await knex('driver_profiles').del()
  await knex('driver_profiles').insert(driverProfilesData);
};
