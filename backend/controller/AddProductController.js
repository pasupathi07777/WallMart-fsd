const addProductModel = require('../models/addProductModel')
const fs = require('fs');
const path = require('path');
//  Controller function for handling image upload
const uploadImage = (req, res, next) => {
    const obj = {
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        ratings: req.body.ratings,
        image: {
            data: fs.readFileSync(path.join(__dirname, '../uploads', req.file.filename)),
            contentType: req.file.mimetype
        },
        category: req.body.category,
        stock: req.body.stock,
        seller: req.body.seller,
    };
    addProductModel.create(obj)
        .then(product => {
            res.status(200).json({ sucess: true, product });
        })
        .catch(err => {
            console.error(err);
            res.status(500).send({ sucess: false, message: err });
        });
}

const updateProduct = async (req, res, next) => {
    // Extract the id from req.params
    const { id } = req.params;

    // Build the product update object
    const obj = {
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        ratings: req.body.ratings,
        // If there's a file uploaded, handle it
        image: req.file ? {
            data: fs.readFileSync(path.join(__dirname, '../uploads', req.file.filename)),
            contentType: req.file.mimetype
        } : undefined,
        category: req.body.category,
        stock: req.body.stock,
        seller: req.body.seller,
    };

    // Remove undefined fields (if no file uploaded, image will be undefined)
    Object.keys(obj).forEach(key => obj[key] === undefined && delete obj[key]);

    try {
        // Update the product in the database
        const product = await addProductModel.findByIdAndUpdate(id, obj, { new: true });

        // If product is not found
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        // Send back the updated product
        res.status(200).json({ success: true, product });
    } catch (err) {
        console.error(err);
        res.status(500).send({ success: false, message: "An error occurred while updating the product" });
    }
};

module.exports = updateProduct;



const getProduct = async (req, res) => {
   
    try {
        const product = await addProductModel.find();
        const allProducts = product.map(img => ({
            ...img._doc,
            image: {
                ...img.image,
                data: img.image.data.toString('base64') // Convert Buffer to Base64 string
            }
        }));
        res.json({ success: true, allProducts });
    } catch (error) {
        res.status(500).send({ success: false, message: 'Error fetching imagesss' });
    }
};







module.exports = { uploadImage, getProduct, updateProduct }


