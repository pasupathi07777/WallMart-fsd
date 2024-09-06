const { userModel } = require("../models/model")


const updateProfile=async (req,res)=>{
    const { id } = req.params;
    // const {}=req.body()
    // console.log(id,req.body)
    try{
        const user=await userModel.findById(id)
        user.userName=req.body.userName
        user.address=req.body.address
        console.log(user)
        await user.save()
        res.status(200).json({success:true,user})

    }catch(error){
        res.status(400).json({success:true,message:error})

    }

}

module.exports={updateProfile}