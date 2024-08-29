
async function UserLogout(req,res){

    try{

        res.clearCookie('token')

        res.json({
            message : 'Logged Out Succesfully',
            error : false,
            success : true,
            data : []
        })
    }
    catch(err){
        res.json({
            message: err.message || err,
            error : true,
            success : false
        })
    }
}

module.exports = UserLogout