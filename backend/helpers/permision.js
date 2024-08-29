const UserModel = require("../models/userModel")

const uploadProductPermision = async(userId) =>{

    const user = await UserModel.findById(userId)

    if(user.role !== 'ADMIN'){
        return false
    }

    return true

}

module.exports = uploadProductPermision