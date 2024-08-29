const productModel = require("../../models/productModel")

const GetProductDetails = async (req,res) =>{
    try{

        const {productId} = req.body
        const product = await productModel.findById(productId)

        res.json({
            productData : product,
            message : 'Ok',
            succcess : true,
            error : false
        })

    }catch(err){

         res.status(400).json({
         message : err.message || err,
         error : true,
         success: false

        })
    }
}

module.exports = GetProductDetails