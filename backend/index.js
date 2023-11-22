import express, { request, response } from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";
import booksRoutes from "./routes/booksRoute.js";
import cors from 'cors';

const app = express();

// middleware for parsing request body
app.use(express.json());

// middleware for cors errors
app.use(cors());
// app.use(
//     cors({
//         origin:'http://localhost:3000',
//         methods:['GET','POST','PUT','DELETE'],
//         allowedHeaders:['Content-Type'],
//     })
// );

// testing routes
app.get('/', (request, response) => {
    console.log(request);
    return response.status(234).send('Testing Routes')
})

app.use('/books', booksRoutes);

mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(PORT, () => {
            console.log(`App is Listening to Port: ${PORT}`)
        });
    })
    .catch((error) => {
        console.log(error)
    })
