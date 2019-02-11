const { User } = require('../models')

class UserController {
  create (req, res) {
    return res.render('auth/signup')
  }

  async store (req, res) {
    if (req.file) {
      const { filename: avatar } = req.file
      await User.create({ ...req.body, avatar })
    } else {
      const userExists = await User.count({ where: { email: req.body.email } })
      if (userExists) {
        req.flash('error', 'Usuário com este email ja existe!')
        return res.redirect('/')
      }
      await User.create({ ...req.body })
    }

    req.flash('success', 'Usuário criado com sucesso!')
    return res.redirect('/')
  }
}

module.exports = new UserController()
