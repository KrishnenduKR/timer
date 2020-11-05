import * as bodyParser from "body-parser";
import express = require('express');
import Timer from "./timer";

class Routes {
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

        this.express.use("/", Timer);
    }

}

export default new Routes().express;