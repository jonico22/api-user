const roleRepository = require('../roleRepository')

//=====================================
//           CREATE ROLE = POST
//=====================================

const createRole = async (req, res = response)=> {
  
 
  try {
      await roleRepository.save(req.body)
      res.status(201).json({
        ok: true,
        message: 'User is ready to save in DB',
        
      })
  } catch (error) {
    
      if(error) {
        return res.status(500).json({
          ok: false,
          message: 'error in the server | Server Error',
          error: Error
        })
      }
  } 

}
  

module.exports = {
    createRole
}