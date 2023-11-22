import express, { request, response } from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";
import booksRoutes from "./routes/booksRoute.js";

const app = express();

// middleware
app.use(express.json());
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
