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
    console.log(id)
    try {
        const ride = await service.getSpecificRide(id);
        console.log(ride)
        if (!ride) {
            return next({status: 400, message: "Invalid id"});
        }
        res.status(200).json({data: ride})
    } catch (error) {
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

const deleteRide = async (req, res, next) => {
    const {id} = req.params;
        res.status(200).json({data: "resource deleted"})
    try {
        const data = await service.deleteRide(id);
    } catch (error) {
        console.log(error)
        return next({status: 500, message: "Internal Server Error"});
    }

}

const update = async (req, res, next) => {
    console.log("controller, updating...")
    const {id} = req.params;
    const edited = req.body.data

    try {
        const updated = await service.update(id, edited)
        res.status(200).json({data: updated})
    } catch (error) {
        console.log(error)
        return next({status: 500, message: "Internal Server Error"});
    }
}

const getAllButUsers = async (req, res, next) => {
    const {id} = req.params;
    try {
        const rides = await service.getUnbooked(id)
        if (!rides) {
            return next({status: 400, message: "Invalid id"});
        }
        res.status(200).json({data: rides})
    } catch (error) {
        return next({status: 500, message: "Internal Server Error"});
    }
}

const bookRide = async (req, res, next) => {
    const {ride_id, driver_id} = req.body.data

    try {
        const data = await service.assignRide(driver_id, ride_id)
        if(!data) {
            return next({status: 400, message: "Invalid id"});
        }
        res.status(200).json({data})
    } catch (error) {
        console.log(error)
        return next({status: 500, message: "Internal Server Error"});
    }
}

module.exports = {
    read,
    list: [ list],
    listPendingRides,
    post: [postRide],
    deleteRide,
    update,
    getAllButUsers,
    bookRide
}