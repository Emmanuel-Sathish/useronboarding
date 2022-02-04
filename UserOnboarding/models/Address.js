const mongoose = require('mongoose')
const Schema = mongoose.Schema

const addressSchema = new Schema ({

    userId: {
        type: String,
        required:true
    }, 
    name: {
        type: String,
        required:true
    }, 
    phone: {
        type: String,
        required:true
    }, 
    pincode: {
        type: String,
        required:true
    }, 
    address: {
        type: String,
        required:true
    }, 
    city: {
        type: String,
        required:true
    }, 
    state: {
        type: String,
        required:true
    },
    typeOfPlace: {
        type: String,
        required:true
    }


}, {timestamps:true}) 

const Address= mongoose.model('Address', addressSchema)
module.exports = Address