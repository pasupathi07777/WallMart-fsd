var mongoose = require('mongoose');

var imageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter product name"],
        trim: true,
        maxLength: [150, "Product name cannot exceed 100 chracters"]

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
                "fashion",
                "electronics",
                "mobile Phones",
                "appliances",
                "grocery",
                "toys",
                "beauty",
                "sports",
                "home & Furniture"
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
        maxLength: [30, "Product name cannot exceed 100 chracters"]
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
