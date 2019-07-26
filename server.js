/**
 * @description The server.js module is the entry point for the application and contains logic for connecting to the database and starting the server.
 * 
 * @requires config
 * @requires constants
 * @requires express
 * @requires mongoose
 * @module
 * 
 */
const C = require("./support/constants");
const config = require("config");
const express = require("express");
const mongoose = require("mongoose");

/**
 * @description Connect to the MongoDB database using URI from Config default.json variables.
 * 
 * @private
 * @function
 * @async
 * 
 */
const connectDB = async () => {

    const dbURI = config.get(C.Config.DB_URI);
    const mongoURI = `${dbURI.protocol}://${dbURI.user}:${dbURI.pass}@${dbURI.path}`;

    try {

        await mongoose.connect(mongoURI, {
            
            useNewUrlParser: true,
            useCreateIndex: true
        });
        
        console.log(C.Message.DATABASE_CONNECTED);
    }
    catch (error) {

        console.error(error.message);
        process.exit(1);
    }
};

/**
 * @description Start the server with loaded API router modules.
 * 
 * @private
 * @function
 * 
 */
const startServer = () => {
    
    const app = express();

    app.use(express.json({ extended: false }));

    app.use(C.Route.ITEMS, require(`${C.Route.ROUTES_DIR}${C.Route.ITEMS}`));
    app.use(C.Route.RESULTS, require(`${C.Route.ROUTES_DIR}${C.Route.RESULTS}`));
    app.use(C.Route.USERS, require(`${C.Route.ROUTES_DIR}${C.Route.USERS}`));

    app.get("/", (req, res) => {
        
        return res.sendStatus(C.Status.OK);
    });

    const port = process.env.PORT || 5000;

    app.listen(port, () => console.log(`${C.Message.SERVER_RUNNING} ${port}`));
};

/**
 * @description Application initialization connects to the database then starts the server.
 * 
 * @private
 * @function
 * 
 */
const init = () => {

    connectDB();
    startServer();
};

/**
 * Initialize the application
 * 
 */
init();