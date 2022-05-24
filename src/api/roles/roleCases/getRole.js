const roleRepository = require('../roleRepository')
const Role = require("../model")
//=====================================
//        READ LIST USERS = GET
//=====================================

const getRoles = async (req, res = response)=> {
  
    try {
      const rolesDB = await roleRepository.getAll()
     
      if(!rolesDB){
        return res.status(401).json({
          ok: false,
          message:''
        })
      }
      const total = await Role.countDocuments()
      res.status(200).json({
        ok: true,
        message:'Everything ok',
        data:rolesDB,
        total
      })
  
    } catch (error) {
      
      if(error){
        return res.status(500).json({
          ok: false,
          message:`'Something on the server didn't work right.'`,
          error 
        })
      }
      
    }
  
  }
  
  
  //=====================================
  //        READ ONE USER ID = GET
  //=====================================
  
  const  getRol = async (req, res = response )=> {
    const id = req.params.id
  
    try {
  
      const rolesDB = await roleRepository.getOne(id)
  
      if(!rolesDB){
        return res.status(401).json({
          ok: false,
          message:`'Something on the server didn't work right.'`,
        })
      }
  
      res.status(200).json({
        ok: true,
        message: ' Everything is normal',
        userDB
      })
      
    } catch (error) {
      return res.status(500).json({
        ok: true,
        message: `'Something on the server didn't work right.'`,
        error
      })
    }

  }

  module.exports = {
    getRoles,
    getRol
  }