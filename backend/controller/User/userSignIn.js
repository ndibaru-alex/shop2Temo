const UserModel = require("../../models/userModel")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');

async function userSignInController(req, res){

    try{

        const {email , password} = req.body

        if(!email){
            throw new Error('please provide email')

        }
         if(!password){
             throw new Error('please provide password')
            
        }

        const user = await UserModel.findOne({email})

        if(!user){
            throw new Error("User not found")
        }

        const checkPassword =await bcrypt.compare(password, user.password)


        if(checkPassword){

            const tokenData = {
                _id : user._id,
                email : user.email

            }
            const token = await jwt.sign(tokenData , process.env.TOKEN_SECRET_KEY , {expiresIn: 60 * 60 * 8})

            const tokenOption = {
                httpOnly : true,
                secure : true,
                sameSite : 'None'
                
            }

            res.cookie("token",token,tokenOption).json({
                message: 'Login Successfully',
                data : token,
                success : true,
                error : false
            })

        }else{
            throw new Error("please check password")
        }



    }
    catch(err){

         console.log(err)
        res.json({
            message:err.message || err,
            error : true,
            success: false
        })

    }

}

module.exports = userSignInController
