const { userModel } = require('../models/model');



const addCart = async (req, res) => {
    const { id } = req.params;
    const { productId, quantity } = req.body;

    try {
        const user = await userModel.findById(id)
        console.log(user)
        if (!user) {
            res.status(400).json({ success: false, error: "user not found" })
        }
        console.log(productId, quantity)
        const productIndex = await user.cart.findIndex(item => item.productId.toString() === productId)
        if (productIndex > -1) {
            console.log(user.cart[productIndex],"kkk")
            user.cart[productIndex].quantity = quantity

        } else {
            await user.cart.push({ productId, quantity })
        }
        user.save()
        res.status(200).json({ success: true, user })

    } catch (error) {
        res.status(400).json({ success: false, error: error.message })

    }
}

const removeProductInCart = async (req,res) => {
    const { id } = req.params;
    const {productId}=req.body
    
    try {
        const user = await userModel.findById(id)
        console.log(user)
        if (!user) {
            res.status(404).json({ success: false, error: "user not found" })
        }
        user.cart=user.cart.filter(item=>item.productId.toString()!==productId)
       
        user.save()
        res.status(200).json({ success: true, user })

    } catch (error) {
        res.status(400).json({ success: false, error: error.message })

    }

}



module.exports = { addCart,removeProductInCart }



