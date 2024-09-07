
const { userModel } = require("../models/model")
var validator = require("email-validator");





const addUser = async (req, res) => {
    console.log(req)
    try {
        const { userName, gmail, password } = req.body
        const emailValidator = await validator.validate(gmail)
        if (emailValidator) {
            const user = await userModel.create(req.body)
            console.log(user)
            res.status(200).json({ success: true, user })
        } else {
            res.status(400).json({ success: false, message: "Invalid Email" })
        }
    } catch (error) {
        if (error.code === 11000) {
            if (!res.headersSent) {
                res.status(400).json({ success: false, message: "Email already exists" });
            }
        } else {
            if (!res.headersSent) {
                res.status(500).json({ success: false, message: error.message });
            }
        }
    }


}


const findUser = async (req, res) => {
    console.log(req.query)

    try {
        const { gmail, password } = req.query
        console.log(gmail, password)
        const user = await userModel.findOne({ gmail: gmail });
        if (user) {
            if (user.password === password) {
                // await user.populate('cart.productId').execPopulate();
                user.login = true
                await user.save()
                res.status(200).json({ success: true, message: user });
            } else {
                res.status(400).json({ success: false, for: "password", message: "In correct password" });

            }

        } else {
            res.status(404).json({ success: false, for: "gmail", message: "User not found" });
        }

    } catch (e) {
        res.status(400).json({ success: false, error: e.message })
    }
};

const resetPassword = async (req, res) => {


    try {
        const { gmail, password } = req.body
        console.log(gmail, password, "ll")
        const user = await userModel.findOne({ gmail: gmail });

        if (user) {
            user.password = password
            user.save()
            res.status(200).json({ success: true, for: "gmail", message: "password successfully updated" });

        } else {
            res.status(404).json({ success: false, for: "gmail", message: "User not found" });
        }

    } catch (e) {
        res.status(400).json({ success: false, error: e.message })
    }
};

const loginStatus = async (req, res) => {

    try {
        const { gmail } = req.query
        console.log(gmail)
        const responce = await userModel.findOne({ gmail: gmail })
        res.status(200).json(responce)


    } catch (e) {
        res.status(200).json({ message: "not found" })


    }

}
const logOut = async (req, res) => {

    try {
        const gmail = req.body
       
        const responce = await userModel.findOne(gmail)
        responce.login = false
        responce.save()
        res.status(200).json({ success: true, message: "logout success" })


    } catch (e) {
        res.status(400).json({ success: false, message: "logout failed" })


    }

}
// get all users

const getAllUsers = async (req, res) => {

    try {


        const users = await userModel.find()
        res.status(200).json({ success: true, users })


    } catch (e) {
        res.status(400).json({ success: false, message: e.message })


    }

}

const updateUserRole = async (req, res) => {
    const { id } = req.params;
    const { updatedUser } = req.body;
 
    try {
        const user=await userModel.findById(id)
        user.admin=updatedUser.admin
        await user.save()
        res.status(200).json({ success: true, user })



    } catch (error) {
        res.status(400).json({ success: false, error })

    }
}





module.exports = { addUser, findUser, resetPassword, loginStatus, logOut, getAllUsers,updateUserRole }