const { User, Appointment } = require('../models')

class DashboardController {
  async index (req, res) {
    if (req.session.user && req.session.user.provider === true) {
      const appointments = await Appointment.findAll({
        where: { provider_id: req.session.user.id }
      })
      const provider = await User.findByPk(req.session.user.id)
      return res.render('provider-dashboard', { appointments, provider })
    }
    const providers = await User.findAll({ where: { provider: true } })
    return res.render('dashboard', { providers })
  }
}

module.exports = new DashboardController()
