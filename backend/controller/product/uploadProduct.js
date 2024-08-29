const productModel = require("../../models/productModel")
const uploadProductPermision = require('../../helpers/permision')

async function upLoadProductController(req,res){
    try{

        const sessionUser = req.userId  

        if(!uploadProductPermision(sessionUser)){
            throw new Error("Permsion Denied")

        }

        
        const uploadProduct = new productModel(req.body)

        const saveproduct = await uploadProduct.save()

        res.status(200).json({
            message: 'product uploaded successfully',
            error : false,
            success : true,
            data : saveproduct
        })

    }

    catch(err){
        res.json({
            message:err.message || err,
            error : true,
            success: false
        })

    }

}

module.exports = upLoadProductController