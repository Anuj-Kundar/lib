import mongoose from "mongoose";

const bookSchema = mongoose.Schema(
    {
        title:{
            type:string,
            required:true,
        },
        author:{
            type:string,
            required:true,
        },
        publishYear:{
            type:number,
            required:true,
        },
    },
    {
        timestamps:true,
    }
);

export const Book = mongoose.model('Book', bookSchema);
