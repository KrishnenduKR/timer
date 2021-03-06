import * as bodyParser from "body-parser";
import express = require('express');
import Routes from "./routes";

class App{
    public express: express.Application;

    constructor() {
        this.express = express();
        this.middleware();
        this.routes();
    }

    // Configure Express middleware.
    private middleware(): void {
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
    }

    private routes(): void {

        this.express.get("/", (req, res, next) => {
            res.send("Typescript App works!!");
        });

        // timer route
        this.express.use("/api", Routes);

        // handle undefined routes
        this.express.use("*", (req, res, next) => {
            res.send("Make sure url is correct!!!");
        });

        this.express.listen(3000, function () {
            console.log('App is listening on port 3000!');
            });
    }
}

export default new App().express;