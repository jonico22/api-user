const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const User = require("../model");

const config = require('../../../config')

//=====================================
//        LOGIN USERS = POST
//=====================================
const login = async (req, res) => {
    let body = req.body;
  
    if(body.email) {

      try {
        const userFound = await User.findOne({ email: req.body.email }).populate("roles");
        if (!userFound) return res.status(400).json({ message: "User Not Found" });
        if (!bcrypt.compareSync(body.password, userFound.password )) {
          return res.status(400).json({
            status: false,
            err: {
              mensaje:
                " Server refuses to give you a file, authentication wont help, your information is not valid",
            },
          });
        }
        const userForToken = {
          id: userFound._id,
          username: userFound.username
        }

        let token = jwt.sign(
         { user : userForToken},
          config.SEED,
          { expiresIn: config.expiresIn }
        ); 
    
        res.status(200).json({
          status: true,
          name: userFound.name,
          token,
        });
      } catch (error) {
        console.log(error);
      }
  
    }
  
  }

  module.exports = {
    login
  }