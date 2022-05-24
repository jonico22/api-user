const Role = require("../model")

//=====================================
//       DELETE USER ID = DELETE
//=====================================

const deleteRole = async (req, res= response)=>{
    const id = req.params.id
  
    try {
      
      const roleDB = await Role.findById(id)
  
      if(!roleDB){
        return res.status(401).json({
          ok: false,
          message:`'There is no role with this id:' ${id}`,
        })
      }
  
      const roleDeleted = await Role.findByIdAndRemove(roleDB._id)
  
  
      res.status(200).json({
        ok: true,
        message: ' Everything is normal',
        roleDeleted
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
    deleteRole
  }