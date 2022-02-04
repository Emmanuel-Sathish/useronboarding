const Joi = require('joi')


const updateSupport = Joi.object({
    id: Joi.string().required(),
    name: Joi.string().optional(),
    gender: Joi.string().optional(),
    dob: Joi.string().optional(),
    bloodgrp: Joi.string().optional()
})

// const joiUpdate = validator.body(updateSupport)

//module.exports = joiValidator
module.exports = {
    updateSupport
}