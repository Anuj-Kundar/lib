import express from "express";
import {PORT,mongoDBURL} from "./config.js";
import mongoose from "mongoose";

const app = express();

// testing routes
app.get('/',(request,response)=>{
    console.log(request);
    return response.status(234).send('Testing Routes')
})


mongoose
    .connect(mongoDBURL)
    .then(()=>{
        console.log('Connected to MongoDB');
        app.listen(PORT,()=>{
            console.log(`App is Listening to Port: ${PORT}`)
        });
    })
    .catch((error)=>{
        console.log(error)
    })
