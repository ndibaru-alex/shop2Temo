const cartModel = require('../../models/cartModel')

const ViewCartProducts = async (req,res) =>{
    try{
   
        const currentUser = req.userId
        const cartItems = await cartModel.find({
            userId : currentUser
        }).populate("productId")

        res.json({
            message : 'cart items',
            data : cartItems,
            success : true,
            error : false
        })

    }catch(err){
        res.json({
            message:err.message || err,
            error : true,
            success: false
        })
    }
}
module.exports = ViewCartProducts