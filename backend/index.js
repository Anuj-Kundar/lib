import express from "express";
import {PORT} from "./config.js";

const app = express();

// function to listen to port
app.listen(PORT,()=>{
    console.log(`App is Listening to Port: ${PORT}`)
});