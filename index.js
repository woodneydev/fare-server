require("dotenv").config();
const express = require("express");
const knex = require('knex')(require('./knexfile'));
const app = express();
const cors = require("cors");
const {PORT} = process.env || 8080;
const accounts = require("./routes/accounts/accounts.js")
const rides = require("./routes/rides/rides");
const errorHandler = require("./errors/errorHandler.js")

app.use(cors({origin: "*"}));
app.use(express.json());

app.use("/accounts", accounts);
app.use("/rides", rides);

app.use(errorHandler);

app.listen(PORT, () => {
    console.log("Server running on port:", PORT)
    console.log("Type CTRL + C to exit")
})