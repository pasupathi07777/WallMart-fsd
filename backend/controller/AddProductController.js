

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
            res.status(200).json({sucess:true,product});
        })
        .catch(err => {
            console.error(err);
            res.status(500).send({sucess:false,message:err});
        });
};





module.exports = { uploadImage }


