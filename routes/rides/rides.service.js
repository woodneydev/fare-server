const knex = require('knex')(require('../../knexfile'));

const getSpecificRide = (id) => {
    // return knex("rides as r")
    //     .leftJoin("driver_profiles as d", "r.driver_id", "d.driver_id")
    //     .leftJoin("accounts as a", "a.id", "d.driver_id")
    //     .select(
    //         "r.id as ride_id",
    //         "r.rider_id",
    //         "r.start_location",
    //         "r.end_location",
    //         "r.start_time",
    //         "r.end_time",
    //         "r.rider_proposed_fare",
    //         "a.first_name as driver_name",
    //         "d.driver_rating",
    //         "r.fare"
    //     )
    //     .where("r.rider_id", id)
    //     .first()

    return knex("rides as r")
        .select(
            "r.id as ride_id",
            "r.rider_id",
            "r.start_location",
            "r.end_location",
            "r.start_time",
            "r.end_time",
            "r.rider_proposed_fare",
            "r.fare"
        )
        .where({id})
        .first()
}

const getRiderRides = (id) => {
    return knex("rides as r")
        .leftJoin("driver_profiles as d", "r.driver_id", "d.driver_id")
        .leftJoin("accounts as a", "a.id", "d.driver_id")
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

const deleteRide = (id) => {
    return knex("rides")
        .delete()
        .where({id})
}

const update = (id, edited) => {
    console.log("updating....")
    return knex("rides")
      .where({ id })
      .update(edited)
      .then((result) => {
        return knex("rides")
          .where({ id })
      })
}

const getUnbooked = (id) => {
    return knex("rides")
        .whereNot({rider_id: id}) 
        .andWhere({status: "unbooked"})
        .orderBy('created_at', 'desc');
}

const assignRide = (driver_id, ride_id) => {
    return knex("rides")
        .where({ id: ride_id })
        .update({ 
            driver_id: driver_id,
            status: "booked"
        });
}
  
module.exports = {
    getRiderRides,
    getRiderRidesPending,
    postNewRide,
    getSpecificRide,
    update,
    deleteRide,
    getUnbooked,
    assignRide
}