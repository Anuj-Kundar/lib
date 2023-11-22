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

// Route to get all book from database
app.get('/books',async(requst,response)=>{
    try{
        const books=await Book.find({});
        return response.status(200).json({
            count:books.length,
            data:books,
        })
    }
    catch(error){
        console.log(error.message);
        response.status(500).send({message:error.message});
    }
})

// Route to get 1 book from database by id
app.get('/books/:id',async(requst,response)=>{
    try{
        const {id}=requst.params;
        const book=await Book.findById(id);
        
        return response.status(200).json(book);
    }
    catch(error){
        console.log(error.message);
        response.status(500).send({message:error.message});
    }
})


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
