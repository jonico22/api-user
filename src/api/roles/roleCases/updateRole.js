
const Role = require("../model")

//=====================================
//       UPDATE USER ID = PUT
//=====================================

const updateRole = async (req, res) =>{

    const role = await Role.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
       })
    if (!role)
        return res.status(500).json({
            ok: true,
            message: `'Something on the server didn't work right.'`,
            err
          })

    res.status(200).json({ success: true, data: role })
    
  }

  module.exports = {
    updateRole
  }