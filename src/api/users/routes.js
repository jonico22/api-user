const express = require('express')
const { create, get, update, Delete } = require('./controller')
const router = express.Router()
 
const  auth = require('../../middlewares/auth') // auth

router.post('/', create.createUser ) // POST USER
router.get('/',  [ auth.verificaToken], get.getUsers) // GET USER
router.get('/:id', auth.verificaToken,  get.getUser) // GET USERS
router.delete('/:id', [ auth.verificaToken, auth.verificaRole_Admin ],  Delete.deleteUser) // GET USERS
router.put('/:id', [ auth.verificaToken], update.updateUser)  // GET USERS


module.exports = router;