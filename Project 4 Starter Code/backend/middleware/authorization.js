const jwt = require("jsonwebtoken");

const authorization=(PermissionEndPoint)=>{
    return (req,res,next)=>{
        // const token=jwt.decode(req.token,process.env.SECRET)
        // console.log("req.token ::",token.role.permissions);
        // console.log(">>>>> ::", PermissionEndPoint);



        const isExist = 
        req.token.role.permissions.includes(PermissionEndPoint)
        if(isExist){
            next()
        }else{
            res.status(403).json({
                success: false,
                massage: "Unauthorized"
            })
        }

    }
}
module.exports = authorization