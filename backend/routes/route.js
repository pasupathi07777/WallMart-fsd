const express=require('express')
const multer = require('multer');
const path = require('path');
const imageController = require('../controller/AddProductController')
const { addUser,findUser,resetPassword, loginStatus, logOut } =require( '../controller/authController')
const route=express.Router()

// route.post("/product",postProduct)
// route.get("/products",getProducts)
// route.get("/singleProduct/:id",getSingleProduct)y

// route.put("/updateProduct/:id",updateSingleProduct)
// route.delete("/deleteProduct/:id",deleteSingleProduct)
// route.post("/postimage",postImage)
// route.get("/getimage/:id",getImage)


// user auth 
route.post('/signup',addUser)
route.get('/login',findUser)
route.post('/passwordreset',resetPassword)
route.get('/loginstatus',loginStatus)
route.post('/logout',logOut)
// add product 
// Set up Multer storage and file fil
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../uploads')); // Corrected path
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });
route.post('/addproduct', upload.single('image'), imageController.uploadImage);







module.exports=route























