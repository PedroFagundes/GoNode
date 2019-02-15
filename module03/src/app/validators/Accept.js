const Joi = require('joi')

module.exports = {
  req: {
    ad: Joi.string().required(),
    purchase: Joi.string().required()
  }
}
