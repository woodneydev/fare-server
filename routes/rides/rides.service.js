const knex = require('knex')(require('../../knexfile'));

const getRiderRides = (id) => {
    return knex("rides as r")
        .join("driver_profiles as d", "r.driver_id", "d.driver_id")
        .join("accounts as a", "a.id", "d.driver_id")
        .select("r.id as ride_id", "r.rider_id", "r.start_location", "r.end_location", "r.start_time", "r.end_time", "r.rider_proposed_fare", "a.first_name as driver_name", "d.driver_rating", "r.fare")
        .where({rider_id: id})
        .andWhere({status: "booked"})
}

const getRiderRidesPending = (id) => {
    return knex("rides as r")
        .leftJoin("driver_profiles as d", "r.driver_id", "d.driver_id")
        .leftJoin("accounts as a", "a.id", "d.driver_id")
        .select("r.id as ride_id", "r.rider_id", "r.start_location", "r.end_location", "r.start_time", "r.end_time", "r.rider_proposed_fare", "a.first_name as driver_name", "d.driver_rating", "r.fare")
        .where({rider_id: id})
        .andWhere({status: "unbooked"})
}

const postNewRide = (ride) => {
    return knex("rides")
        .insert(ride)
        .then((result) => {
            return knex("rides")
              .where({ id: result[0] })
          })
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
    getRiderRides,
    getRiderRidesPending,
    postNewRide
}