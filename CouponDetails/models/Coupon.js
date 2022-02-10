const mongoose = require('mongoose')
const Schema = mongoose.Schema

const coupenSchema = new Schema ({

    offerName : {
        type:String,
        required: true
        
    },
    couponCode : {
        type:String,
        required: true,
        unique : true
        
    },
    startDate : {
        type: Date,
        required:true
        
    },
    endDate : {
        type: Date,
        required: true
    },
    discountPercentage : {
        type: Number,
        required: true
    },
    discountAmount : {
        type: Number,
        required:true
    },
    termsAndConditions: {
        type:String
    },
    markAsActive : {
        type:Boolean,
        default: false
    },
    offerPoster : {
        type: String
    }
    // userId: {
    //     type: String,
    // }
}, {timestamps:true})

const Coupon = mongoose.model('Coupon', coupenSchema)
module.exports = Coupon