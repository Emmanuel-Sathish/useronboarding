const express = require('express')
const router = express.Router()

const EmployeeController = require('../controllers/EmployeeController')
const authenticate = require('../middleware/authenticate')


router.post('/show', EmployeeController.show)
router.post('/store', EmployeeController.store)
router.post('/update', EmployeeController.update)
router.post('/delete', EmployeeController.destroy)

module.exports = router