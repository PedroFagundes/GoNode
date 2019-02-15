const path = require('path')
const nodemailer = require('nodemailer')
const mailConfig = require('../../config/mail')
const hbs = require('nodemailer-express-handlebars')
const exphbs = require('express-handlebars')

const transport = nodemailer.createTransport(mailConfig)

transport.use(
  'compile',
  hbs({
    viewEngine: exphbs(),
    viewPath: path.resolve(__dirname, '..', 'views', 'emails'),
    extName: '.hbs'
  })
)

module.exports = transport
