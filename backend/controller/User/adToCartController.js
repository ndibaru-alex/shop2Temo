const cartModel = require("../../models/cartModel")

const addToCartController = async (req,res)=>{

try{

    const { productId } = req?.body
    const currentUser = req.userId

    const isProductInCart = await cartModel.findOne({ productId})

    if(isProductInCart ){
         return res.json({
            message : 'Product Alreay in Cart',
            success : false,
            error : true
         })

    }

    const payload = {
        productId : productId,
        quantity : 1,
        userId : currentUser

    }

    const addToCart = new cartModel(payload)

    const saveCart = await addToCart.save()

    res.json({
       data : saveCart, 
       message : 'Product added to cart',
       success : true,
       error : false 
    })

   
}catch(err){
     res.status(400).json({
     message : err?.message || err,
     error : true,
     success : false
        })
}
}

module.exports = addToCartController