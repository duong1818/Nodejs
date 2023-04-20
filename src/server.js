import express from "express";
import bodyParser from "body-parser";
// /user?id=7

import viewEngine from "./config/viewEngine";
import initWebRoutes from "./route/web";
require('dotenv').config();

let app = express();

// config app 

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extends: true}));

viewEngine(app);
initWebRoutes(app);

let port = process.env.PORT || 6969;
// Port === undefined => port = 6969
app.listen(port, () => {
    // callback
    console.log("Backend node js is runing on port :" + port);

})
