const User = require('../models/user.js');
const hash = require('../utils/hash');
const jwt = require('../utils/jwt');

const login = async (req,res)=>{

    try{
        let {email,password} = req.body;
        if(!email)
            return res.status(403).json({
                status:403,
                message:'Error: Email id missing'
            })
        if(!password)
            return res.status(403).json({
                status:403,
                message:'Error: Password missing'
            })
        let user = await User.findOne({ email });
        if(!user)
            return res.status(404).json({
                status:404,
                message:'Error: User not found'
            });
        let isValidUser =await hash.comparePasswordHash(password,user.password);
        if(!isValidUser)
            return res.status(403).json({
                status:403,
                message:'Error: Password did not match'
            });
        const token = await jwt.generateToken({
            id: user.id,
            email: user.email,
            password: user.password,
            type: user.type
            });
        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 6 * 60 * 60 * 1000,
            }).status(200).json({
            status: 200,
            data: {
                    id: user.id,
                    type: user.type
            }
        });

    }
    catch(err){
        console.log(err);res.status(500).json({
            status:500,
            message: "Internal Server Error"
        })
    }

    
}

const register = async (req,res)=>{
    try{
        let {email,password} = req.body;
        if(!email)
            return res.status(403).json({
                status:403,
                message:'Error: Email id missing'
            })
        if(!password)
            return res.status(403).json({
                status:403,
                message:'Error: Password missing'
            })
        let user = await User.findOne({ email });
        if(user)
            return res.status(403).json({
            status:403,
            message:'Error: User already registered'
        })
        let passwordHash = await hash.generatePasswordHash(password);
        user = await User.create({
            email,
            password:passwordHash,
            type: 'user'
        })
        const token = await jwt.generateToken({
            id: user.id,
            email: user.email,
            password: user.password,
            type: user.type
          });
        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 6 * 60 * 60 * 1000,
          }).status(200).json({
            status: 200,
            data: {
                    id: user.id,
            }
        });
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            status:500,
            message: "Internal Server Error"
        })
    }
}

module.exports={login,register}