const { trusted } = require("mongoose")
const cartModel = require("../../models/cartModel")

const updateCartQuantity = async (req,res) =>{
    try{

        const currentUser = req.userId 
        const cartProductId = req?.body?._id
        const qty = req.body.quantity

        const updateCartProduct = await cartModel.updateOne( {_id : cartProductId} , {
            ...(qty && {quantity : qty})
        })

        res.json({
            message : 'Cart Updated',
            data : updateCartProduct,
            error : false,
            success : true
        })

    }
   catch(err){
     response.json({
         message : err?.message || err,
         error : true,
         success: false
        })
   }
}

module.exports = updateCartQuantity