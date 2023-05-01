import express from "express";
import bodyParser from "body-parser";
// /user?id=7

import viewEngine from "./config/viewEngine";
import initWebRoutes from "./routes/web";
import connectDB from "./config/connectDB";
require('dotenv').config();
import cors from "cors";


let app = express();

// config app 
//app.use(cors({ origin: true}));
//app.use(cors());
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extends: true}));

viewEngine(app);
initWebRoutes(app);

connectDB();


let port = process.env.PORT || 6969;
// Port === undefined => port = 6969
app.listen(port, () => {
    // callback
    console.log("Backend node js is runing on port :" + port);

})
