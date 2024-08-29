const productModel = require('../../models/productModel')
const getProductContrller = async (req,res) =>{
    try{
        const allProducts = await productModel.find()

        res.json({
            message : 'All produts',
            success : true,
            error : false,
            data : allProducts
    })
    }
    catch(err){
        res.status(400).json({
            message : err.message || err,
            error : true,
            success: false

        })

    }
}

module.exports = getProductContrller