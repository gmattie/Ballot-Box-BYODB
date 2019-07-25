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

    const dbConfig = config.get("dbConfig");
    const mongoURI = `${dbConfig.protocol}://${dbConfig.user}:${dbConfig.pass}@${dbConfig.path}`;

    try {

        await mongoose.connect(mongoURI, {
            
            useNewUrlParser: true,
            useCreateIndex: true
        });
        
        console.log(C.Message.DATABASE_CONNECTED);
    }
    catch(error) {

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

    const ROUTES = "./routes";
    const API = {
        
        AUTH: "/api/auth",
        ITEMS: "/api/items",
        RESULTS: "/api/results",
        USERS: "/api/users"
    };

    app.use(API.AUTH, require(`${ROUTES}${API.AUTH}`));
    app.use(API.ITEMS, require(`${ROUTES}${API.ITEMS}`));
    app.use(API.RESULTS, require(`${ROUTES}${API.RESULTS}`));
    app.use(API.USERS, require(`${ROUTES}${API.USERS}`));

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