const uploadProductPermision = require('../../helpers/permision')
const productModel = require('../../models/productModel')

const updateProduct = async (req,res)=>{

    try{

        if(!uploadProductPermision(req.userId)){
            throw new Error("Permsion Denied")

        }

        const {_id, ...resBody} = req.body

       const updateProduct = await productModel.findByIdAndUpdate(_id, resBody)

   
       
       res.json({
        message: 'Product Updated succesfully',
        data : updateProduct,
        success : true,
        error : false
       })

    }
    catch(err){
        res.status(400).json({
            message : err.message || err,
            error : true,
            success : false
        })
    }

}

module.exports = updateProduct