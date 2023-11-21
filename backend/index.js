import express, { request } from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";

const app = express();

// middleware
app.use(express.json());
// testing routes
app.get('/', (request, response) => {
    console.log(request);
    return response.status(234).send('Testing Routes')
})

app.post('/books', async (request, response) => {
    try {
        if (!request.body.title || 
            !request.body.author || 
            !request.body.publishYear
        ) {
            return response.status(400).send({
                message: 'Please fill all required fields',
            });
        }
        const newBook = {
            title: request.body.title,
            author: request.body.author,
            publishYear: request.body.publishYear,
        };
        const book = await Book.create(newBook);
        return response.status(201).send(book);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });

    }
});


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
