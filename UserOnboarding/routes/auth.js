const express = require('express')
const router = express.Router()
let validator = require('express-joi-validation').createValidator({
    passError:false
})

const AuthController = require('../controllers/AuthController')
const authenticate = require('../middleware/authenticate')
const { updateSupport } = require('../middleware/joiValidator')

router.get('/',authenticate, AuthController.index)
router.get('/list', AuthController.list)
router.post('/register', AuthController.register)
router.post('/login', AuthController.login)
router.put('/update', validator.body(updateSupport), AuthController.update)
router.post('/address', authenticate, AuthController.address)
router.get('/view',authenticate, AuthController.showAddress)

module.exports = router