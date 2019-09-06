/**
 * @description The index.js module is the entry point for the application and contains logic for connecting to the database and starting the server.
 * 
 * @requires constants
 * @requires express
 * @requires http
 * @requires mongoose
 * @requires ws
 * @module
 * 
 */
const { createServer } = require("http");
const C = require("./support/constants");
const express = require("express");
const mongoose = require("mongoose");
const WebSocket = require("ws");

/**
 * @description Start an HTTP and WebSocket serve.
 * 
 * @private
 * @function
 * 
 */
const server = () => {
    
    const app = express();
    app.use(express.static(C.Dir.CLIENT));
    app.use(express.json({ extended: false }));
    
    app.use(C.Route.API_ITEMS, require(`${C.Dir.ROUTES}${C.Route.API_ITEMS}`));
    app.use(C.Route.API_USERS, require(`${C.Dir.ROUTES}${C.Route.API_USERS}`));
    app.use(C.Route.API_VOTES, require(`${C.Dir.ROUTES}${C.Route.API_VOTES}`));
    
    const port = process.env.PORT || 5000;
    const server = createServer(app);
    server.listen(port, () => console.info(`${C.Message.SERVER_RUNNING} ${port}`));

    const webSocketServer = new WebSocket.Server({ server });
    webSocketServer.on(C.Event.CONNECTION, (webSocket) => {

        const clients = webSocketServer.clients;
        app.locals[C.Local.CLIENTS] = clients;

        const logClients = () => console.info(`${C.Message.CONNECTED_CLIENTS} ${clients.size}`);
        logClients();

        webSocket.on(C.Event.CLOSE, logClients);
    });
};

/**
 * @description Connect to the MongoDB database.
 * 
 * @private
 * @function
 * @async
 * 
 */
const database = async () => {

    const mongoURI = `${process.env.DB_PROTOCOL}://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_PATH}`;

    try {

        await mongoose.connect(mongoURI, {
            
            useCreateIndex: true,
            useFindAndModify: false,
            useNewUrlParser: true
        });
        
        console.info(C.Message.DATABASE_CONNECTED);
    }
    catch (error) {

        console.error(error.message);
        process.exit(1);
    }
};

/**
 * @description Application initialization starts the server and connects to the database.
 * 
 * @private
 * @function
 * 
 */
const init = () => {

    server();
    database();
};

/**
 * Initialize the application
 * 
 */
init();