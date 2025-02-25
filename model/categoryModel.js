import mongoose from "mongoose";
const {Schema} = mongoose;

const categorySchema = new Schema({
    name : {
        type : String,
        required : true,
        unique : true
    },
    description : {
        type : String,
        required : true,
    },
    isListed : {
        type : Boolean,
        default : true,
    },
    categoryOffer : {
        type : Number,
        default : 0,
    },
    createdAt : {
        type : Date,
        default : Date.now
    },
    productsCount : {
        type : Number,
        default : 0,
    },
    thumbnail : {
        type : [String],
        required : false
    }

})

const Category = mongoose.model("Category", categorySchema)

export default Category;