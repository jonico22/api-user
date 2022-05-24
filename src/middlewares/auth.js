const jwt = require('jsonwebtoken') // https://www.npmjs.com/package/jsonwebtoken
const config = require('../config')
const User = require('../api/users/model')
const Role = require('../api/roles/model')

//=====================================
// CONFIGURANDO tokem                            
//=====================================

let verificaToken =  async function (req, res, next){

    const authorization = req.get('authorization')
    let token = ''
  
    if (authorization && authorization.toLowerCase().startsWith('bearer')) {
      token = authorization.substring(7)
    }
    if (token === "") return res.status(403).json({ message: "No token provided" });
    
    try {
        const decoded = jwt.verify(token, config.SEED);
        req.userId = decoded.user.id;

        const user = await User.findById(req.userId, { password: 0 });
        if (!user) return res.status(404).json({ message: "No user found" });
    
        next();
      } catch (error) {
        return res.status(401).json({ message: "token no autorizado" });
      }   

};

const renewToken = async(req, res) => { 
    
   
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ message: "No user found" });
    
    const userForToken = {
        id: user._id,
        username: user.username
        }

    let token = jwt.sign(
    { user : userForToken},
    config.SEED,
    { expiresIn: config.expiresIn }
    );
        
    return res.status(200).json({
        status: true,
        name: userForToken.name,
        token,
        });
       
}

let verificaRole_Admin = async (req, res, next) =>{

    try {
        const user = await User.findById(req.userId);
        const roles = await Role.find({ _id: { $in: user.roles } });
    
        for (let i = 0; i < roles.length; i++) {
            if (roles[i].name === "ADMIN_ROLE") {
            next();
            return;
            }
        }
    
        return res.status(403).json({ message: "Require Admin Role!" });
        } catch (error) {
        console.log(error)
        return res.status(500).send({ message: error });
        }

}

let verificaRole_Super = async (req, res, next) =>{

    try {
        const user = await User.findById(req.userId);
        const roles = await Role.find({ _id: { $in: user.roles } });
    
        for (let i = 0; i < roles.length; i++) {
            if (roles[i].name === "SUPER_ROLE") {
            next();
            return;
            }
        }
    
        return res.status(403).json({ message: "Require Super Role!" });
    } catch (error) {
        console.log(error)
        return res.status(500).send({ message: error });
    }

}

let verificaRole_User = async (req, res, next) =>{
       
    try {
        const user = await User.findById(req.userId);
        const roles = await Role.find({ _id: { $in: user.roles } });
    
        for (let i = 0; i < roles.length; i++) {
            if (roles[i].name === "USER_ROLE") {
            next();
            return;
            }
        }
    
        return res.status(403).json({ message: "Require User" });
    } catch (error) {
        console.log(error)
        return res.status(500).send({ message: error });
    }

}


module.exports ={
    verificaToken, 
    verificaRole_Super,
    verificaRole_Admin,
    verificaRole_User,
    renewToken
}