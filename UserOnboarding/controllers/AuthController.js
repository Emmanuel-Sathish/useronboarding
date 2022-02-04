const User = require('../models/User')
const Address = require('../models/Address')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const register = (req, res, next) => {
    bcrypt.hash(req.body.password, 10, (err, hashedPass) => {
        if (err) {
            res.json({
                error: err
            })
        }

        let user = new User({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            password: hashedPass,
            gender: "",
            dob: "",
            bloodgrp: ""


        })

        user.save()
            .then(user => {
                let regToken = jwt.sign({ id: user.id }, 'verySecretValue', { expiresIn: '1hr' })
                let reg_id = user._id

                res.json({
                    message: 'User Added Successfully!',
                    regToken,
                    reg_id

                })
            })
            .catch(error => {
                res.json({
                    message: error.message
                })
            })
    })

}

const index = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1]
    const payload = jwt.verify(token, 'verySecretValue')
    let UserID = payload.id
    User.findById(UserID)
        .then(response => {
            res.json({
                response
            })
        })
        .catch(error => {
            res.json({
                message: 'Error in list of user display'
            })
        })
}

const list = (req, res, next) => {
    User.find()
        .then(response => {
            res.json({
                response
            })
        })
        .catch(error => {
            res.json({
                message: 'Error in list of user display'
            })
        })
}

const update = async (req, res, next) => {
    let { name, gender, dob, bloodgrp } = req.body;
    let id = req.body.id
    if (req.body.password) {
        req.body.password = await bcrypt.hash(req.body.password, 10)
    }
    // bcrypt.hash(req.body.password, 10, (err, hashedPass)=>{
    //     if(err) {
    //         res.json({
    //             error:err
    //         })
    //     }

    let updatedData = {
        // name    :req.body.name, 
        // email   :req.body.email, 
        // phone   :req.body.phone, 
        // password:req.body.password,
        // gender  : req.body.gender,
        // dob     : req.body.dob,
        // bloodgrp: req.body.bloodgrpg
    }
    if (name) {
        updatedData.name = name
    }
    if (gender) {
        updatedData.gender = gender
    }
    if (dob) {
        updatedData.dob = dob
    }
    if (bloodgrp) {
        updatedData.bloodgrp = bloodgrp
    }
    if (req.body.password) {
        updatedData.password = req.body.password
    }

    let updateIntoDB = await User.findByIdAndUpdate(id, { $set: updatedData });
    console.log(updateIntoDB)
    // let updateIntoDB = await User.findByIdAndUpdate(id, {$set: updatedData}) ;
    // console.log(updateIntoDB)
    // .then((user)=>{ 
    //     let updateToken = jwt.sign({id:user.id}, 'verySecretValue',{expiresIn: '1hr'})
    //     res.json({ 
    //         message:'User updated successfully', 
    //         updateToken

    //     }) 
    // }) 
    // .catch(error=>{ 
    //     res.json({ 
    //         message:'Error in updating  user' 
    //     }) 
    // }) 
    //})


}

const address = (req, res, next)=> {

    let add=new Address({ 
        userId:req.body.userId, 
        name:req.body.name, 
        phone:req.body.phone, 
        address:req.body.address,
        pincode:req.body.pincode, 
        landmark:req.body.landmark, 
        city:req.body.city, 
        state:req.body.state, 
        typeOfPlace:req.body.typeOfPlace,  
    }) 
    add.save() 
    .then(response=>{ 
        res.status(200).json({ 
            response 
        }) 
    }) 
    .catch(error=>{ 
        res.status(400).json({ 
            message:error.message
        }) 
    }) 
}

const showAddress=(req,res,next)=>{ 
    Address.find({userId:req.query.userId}) 
        .then(response=>{ 
            res.status(200).json({  
                response 
            }) 
        }) 
        .catch(error=>{ 
            res.status(400).json({ 
                message:error.message 
            }) 
        }) 
}



const login = (req, res, next) => {
    try{
    var username = req.body.username
    var password = req.body.password

    User.findOne({ $or: [{ email: username }, { phone: username }] })
        .then(user => {
            console.log("user", user)
            if (user) {
                if (!user.password) {
                    return res.status(400).json({
                        status: 400,
                        message: "Password not found"
                    })
                }
                bcrypt.compare(password, user.password, (err, result) => {
                    if (err) {
                        console.log(err)
                        return res.json({
                            error: err
                        })
                    }
                    if (result) {
                        let token = jwt.sign({ id: user.id }, 'verySecretValue', { expiresIn: '1hr' })
                        let log_id = user._id

                        return res.json({
                            message: 'Login Successful!',
                            token,
                            log_id
                        })
                    } else {
                        return res.json({
                            message: 'Password does not match'
                        })
                    }
                })
            } else {
                return res.json({
                    message: 'No user found!'
                })
            }
        })
    } catch(err) {
        console.log(err)
    }
}


module.exports = {
    register, login, index, update, list, address, showAddress
}

