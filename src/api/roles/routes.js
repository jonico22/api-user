const express = require('express')
const { create, get, update, Delete } = require('./controller')
const router = express.Router()
 
const  auth = require('../../middlewares/auth') // auth

router.post('/',[auth.verificaToken], create.createRole ) 
router.get('/',  [auth.verificaToken], get.getRoles) 
router.get('/:id', auth.verificaToken,  get.getRol) 
router.delete('/:id', [ auth.verificaToken, auth.verificaRole_Super ],  Delete.deleteRole) 
router.put('/:id', [ auth.verificaToken], update.updateRole)  


module.exports = router;