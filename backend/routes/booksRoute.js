import express from 'express';
import {Book} from '../models/bookModel.js';

const router=express.Router();

// Route to save new book to database
router.post('/', async (request, response) => {
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
router.get('/',async(requst,response)=>{
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
router.get('/:id',async(requst,response)=>{
    try{
        const {id}=requst.params;
        const book=await Book.findById(id   );
        
        return response.status(200).json(book);
    }
    catch(error){
        console.log(error.message);
        response.status(500).send({message:error.message});
    }
})

// Route for updating Book
router.put('/:id',async(requst,response)=>{
    try{
        if(!requst.body.title || !requst.body.author || !requst.body.publishYear){
            return response.status(400).send({
                message:'Please fill all required fields',
            });
        }
        const {id}=requst.params;
        const result = await Book.findByIdAndUpdate(id,requst.body);

        if(!result){
            return response.status(404).send({
                message:'No Book Found',
            });
        }
        return response.status(200).send({
            message:'Book Updated Successfully',
        });
    }
    catch(error){
        console.log(error.message);
        response.status(500).send({message:error.message});
    }
});

// Route for deleting a book
router.delete('/:id',async(request,response)=>{
    try{
        const {id}=request.params;

        const result=await Book.findByIdAndDelete(id);

        if(!result){
            return response.status(404).send({
                message:'No Book Found',
            });
        }
        return response.status(200).send({
            message:'Book Deleted Successfully',
        });
    }
    catch(error){
        console.log(error.message);
        response.status(500).send({message:error.message});
    }
}
)

export default router;