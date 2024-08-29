
const cartModel = require('../../models/cartModel')

const AddedToCartCount = async (req,res) =>{
    try{
        const userId = req.userId

        const count = await cartModel.countDocuments({
            userId : userId
        })

        res.json({
           data : {
            count : count
           },
           message : 'ok',
           error : false,
           success : true       
        })


    }catch(err){
     res.status(400).json({
     message : err?.message || err,
     error : true,
     success : false
        })
    }
}

module.exports = AddedToCartCount