const service = require("./rides.service");
const authorize = require("../../utilities/authorize");
const hasRequiredProperties = require("../../utilities/hasRequiredProperties");
const hasValidProperties = require("../../utilities/hasValidProperties");

const newRideValidProps = ["rider_id", "start_location", "end_location", "start_time", "fare", ];

// =============== Validation Middleware ===============

const validateNewRide = hasValidProperties(newRideValidProps);
const hasReqRidesProp = hasRequiredProperties(newRideValidProps);

// =============== Route Handlers ===============

const read = async (req, res, next) => {
    const {id} = req.params;
    try {
        const ride = await service.getSpecificRide(id);
        if (!ride) {
            return next({status: 400, message: "Invalid id"});
        }
        res.status(200).json({data: ride})
    } catch (error) {
        console.log(error)
        return next({status: 500, message: "Internal Server Error"});
    }
}

const list = async (req, res, next) => {
    const {id} = req.params;
    try {
        const user = await service.getRiderRides(id)
        console.log("this is user:", user)
        if (!user) {
            return next({status: 400, message: "Invalid id"});
        }
        res.status(200).json({data: user})
    } catch (error) {
        return next({status: 500, message: "Internal Server Error"});
    }
}

const listPendingRides = async (req, res, next) => {
    const {id} = req.params;
    
    try {
        const user = await service.getRiderRidesPending(id)
        console.log("this is user:", user)
        if (!user) {
            return next({status: 400, message: "Invalid id"});
        }
        res.status(200).json({data: user})
    } catch (error) {
        return next({status: 500, message: "Internal Server Error"});
    }
}

const postRide = async (req, res, next) => {
    const ride = req.body.data
    console.log("req body", req.body.data)

    try {
        const data = await service.postNewRide(ride)

        if(!data) {
            return next({status: 400, message: "Invalid data"});
        }
        res.status(201).json({data})
    } catch (error) {
        console.log(error)
        return next({status: 500, message: "Internal Server Error"});
    }
}

module.exports = {
    read,
    list: [ list],
    listPendingRides,
    post: [postRide]
}