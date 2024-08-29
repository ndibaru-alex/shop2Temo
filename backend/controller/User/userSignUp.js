const bcrypt = require('bcryptjs')
const UserModel = require("../../models/userModel")

async function userSignUpController(req,res){

    try{

        const {name, email ,password} = req.body

        const user = await UserModel.findOne({email})

        if(user){
            throw new Error("User with the same email already exists")
        }
        
       

        if(!email){
            throw new Error('please provide email')

        }
         if(!password){
             throw new Error('please provide password')
            
        }
         if(!name){
           throw new Error('olease provide your name')  
        }

        const salt = bcrypt.genSaltSync(10);
        const hashPassword = await bcrypt.hashSync(password , salt);

        if(!hashPassword){
            throw new Error('something went wrong')
        }

        const payload ={
            ...req.body,
            role: 'GENERAL',
            password: hashPassword
        }



        const userData = new UserModel(payload)

        const saveUser = await userData.save()

        res.status(201).json({
            data: saveUser,
            success: true,
            error: false,
            message: "User created successfully"
        })

        


    }catch(err){
        console.log(err)
        res.json({
            message:err.message || err,
            error : true,
            success: false
        })

    }
}


module.exports = userSignUpController