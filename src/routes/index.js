const express = require('express');
const users = require('../api/users/routes');
const roles = require('../api/roles/routes');
const { login } = require('../api/users/controller')
const  auth = require('../middlewares/auth')

const router = express.Router();

router.post('/auth/login', login.login);
router.get('/auth/renew',[ auth.verificaToken,auth.renewToken], login.login);
router.use('/user', users);
router.use('/rol', roles);
module.exports = router;