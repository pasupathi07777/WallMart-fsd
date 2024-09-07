const express=require('express')
const multer = require('multer');
const path = require('path');
const imageController = require('../controller/AddProductController')
const { addUser,findUser,resetPassword, loginStatus, logOut,getAllUsers, updateUserRole } =require( '../controller/authController');
const addProductModel = require('../models/addProductModel');
const { addCart, removeProductInCart,addAddress, removeAllCartItems } = require('../controller/cart');
const { addOrder, adminEditOrderStatus, adminDeleteOrder } = require('../controller/order');
const { updateProfile } = require('../controller/updataProfile');
const route=express.Router()




// user auth 
route.post('/signup',addUser)
route.get('/login',findUser)
route.post('/passwordreset',resetPassword)
route.get('/loginstatus',loginStatus)
route.post('/logout',logOut)


// add product 
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../uploads')); // Corrected path
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
})
const upload = multer({ storage: storage });
route.post('/addproduct',upload.single('image'), imageController.uploadImage);
route.get('/getproduct',imageController.getProduct);

// update product 

route.patch("/updateproductdata/:id",upload.single('image'), imageController.updateProduct)

// get alluser
route.get('/allusers',getAllUsers)

// cart 

route.put("/addcart/:id",addCart)
route.put("/removecartitem/:id",removeProductInCart)


// address
route.patch("/addaddress/:id",addAddress)

// order

route.patch('/addorder/:id',addOrder)
route.delete("/removeallincart/:id",removeAllCartItems)


// adminEditOrderStatus

route.patch('/adminEditOrderStatus/:id',adminEditOrderStatus)
route.patch('/adminDeleteOrder',adminDeleteOrder)

// update profile 

route.patch("/updateprofile/:id",updateProfile)

// changeusertype

route.patch("/changeusertype/:id",updateUserRole)











module.exports=route























