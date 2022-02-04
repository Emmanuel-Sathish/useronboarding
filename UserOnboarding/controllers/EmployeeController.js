const Employee = require('../models/Employee')

//To show the list of employees
const index = (req, res, next)=> {
    Employee.find()
    .then(response=> {
        res.json ({
            response
        })
    })
    .catch(error=>{
        res.json({
            message:'An error occured!'
        })
    })
}

//To show single employee

const show = (req, res, next)=> {
    let employeeID = req.body.employeeID
    Employee.findById(employeeID)
    .then(response=> {
        res.json ({
            response
        })
    })
    .catch(error =>{
        res.json ({
            message: 'An error occured!'
        })
    })
}

// To add new employee

const store = (req, res, next)=> {

    let employee = new Employee ({
        name: req.body.name,
        email:req.body.email,
        phone:req.body.phone,
        password: req.body.password
    })
    employee.save()
    .then(response => {
        res.json ({
            message: 'Employee Added Successfully!'
        })
    })
    .catch(error=> {
        res.json ({
            message: 'An error occured'
        })
    })

}

//update an employee

const update = (req, res, next)=> {
    let employeeID =req.body.employeeID
    let updatedData = {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        password: req.body.password
    }
    Employee.findByIdAndUpdate(employeeID, {$set: updatedData})
    .then (()=> {
        res.json ({
            message: 'Employee updated Successfully!'
        })
    })
    .catch (error => {
        res.json ({
            message: 'An error occured!'
        })
    })

}

// To delete an employee

const destroy = (reqq, res, next)=> {
    let employeeID= req.body.employeeID
    Employee.findOneAndRemove(employeeID)
    .then(()=> {
        res,json({
            message: 'Employee deleted successfully'
        })
    })
    .catch(error => {
        res,json ({
            message:'An error occured'
        })
    })
}

module.exports= {
    index, show, store, update, destroy
}