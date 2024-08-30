var mongoose = require('mongoose');

var imageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter product name"],
        trim: true,
        maxLength: [100, "Product name cannot exceed 100 chracters"]

    },
    price: {
        type: String,
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
    image:
    {
        data: Buffer,
        contentType: String
    },
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
});

module.exports = mongoose.model('product', imageSchema);
