const cartModel = require("../../models/cartModel")

const deleteCartProduct = async(req,res) =>{
    try{

        const currentUser= req.body.userId
        const productId = req?.body._id

        const deleteCartItem = await cartModel.deleteOne({_id : productId})

        res.json({
            message : 'product deleted',
            data : deleteCartItem,
            success : true,
            error : false
        })

    }
    catch(err){
        res.json({
         message : err?.message || err,
         error : true,
         success: false
        })
    }
}

module.exports = deleteCartProduct