/**
 * @description The server.js module is the entry point for the application and contains logic for connecting to the database and starting the server.
 * 
 * @requires express
 * @requires mongoose
 * @requires config
 * @module
 * 
 */
const app = require("express")();
const mongoose = require("mongoose");
const config = require("config");

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

        await mongoose.connect(mongoURI, { useNewUrlParser: true });
        console.log("Database connected...");
    }
    catch(err) {

        console.error(err.message);
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
        
        return res
                .status(200)
                .send("API Running");
    });

    const port = process.env.PORT || 5000;

    app.listen(port, () => console.log(`Server running on port ${port}`));
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