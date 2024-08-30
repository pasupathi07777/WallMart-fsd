const mongoose = require('mongoose')

// user schema 

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: [true, "Username is Required"]
    },
    gmail: {
        type: String,
        required: true,
        unique: [true, "gmail is Required"]
    },
    password: {
        type: String,
        required: [true, "Password is Required"],

    },
    admin: {
        type: Boolean,
        default: false
    },
    login: {
        type: Boolean,
        default: false

    }




}, { timestamps: true });


const userModel = mongoose.model("user", userSchema)



const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter product name"],
        trim: true,
        maxLength: [100, "Product name cannot exceed 100 chracters"]

    },
    price: {
        type: Number,
        required: [true, "Please enter product price"],

    },
    description: {
        type: String,
        required: [true, "Please enter product description"]
    },
    ratings: {
        type: String,
        default: 0
    },
   
    imagesPreview:String,
   

    category: {
        type: String,
        required: [true, "Please enter product category"],
        enum: {
            values: [
                "Electronics",
                "Mobile Phones",
                "Laptops",
                "Accessories",
                "Headphones",
                "Food",
                "Books",
                "Clothes",
                "Beauty",
                "Sports",
                "Outdoor",
                "Home"
            ]
        },
        message: "Please enter correct category"
    },
    seller: {
        type: String,
        required: [true, "Please enter product seller"]
    },
    stock: {
        type: Number,
        required: [true, "Please enter product product stock"],
        maxLength: [20, "Product name cannot exceed 100 chracters"]
    },
    numberOfReviews: {
        type: String,
        default: 0
    },
    reviews: [
        {
            name: {
                type: String,
                require: true
            },
            rating: {
                type: String,
                required: true
            },
            commend: {
                type: String,
                required: true
            }
        }
    ],
    createdAt: {
        type: Date,
        default: () => Date.now()
    }
})


const productModel = mongoose.model("producttt", productSchema)


module.exports = { productModel, userModel }
 // images: [],


 //  {


    // image: {
    //     type: String,
    //     required: true
    // }
// }