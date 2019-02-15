const Ad = require('../models/Ad')
const User = require('../models/User')
const Purchase = require('../models/Purchase')
const PurchaseMail = require('../jobs/PurchaseMail')
const Queue = require('../services/Queue')

class PurchaseController {
  async index (req, res) {
    const purchases = await Purchase.find()

    return res.json(purchases)
  }

  async store (req, res) {
    const { ad, content } = req.body

    const purchaseAd = await Ad.findById(ad).populate('author')

    if (purchaseAd.purchasedBy !== null) {
      return res.json({ error: 'This ad has already been purchased' })
    }

    const user = await User.findById(req.userId)

    const purchase = await Purchase.create({ ...req.body, buyer: user.id })

    Queue.create(PurchaseMail.key, {
      ad: purchaseAd,
      user,
      content
    }).save()

    return res.json(purchase)
  }

  async accept (req, res) {
    const ad = await Ad.findById(req.params.id)
    const user = await User.findById(req.userId)

    const purchase = await Purchase.findById(req.params.purchase)

    if (!purchase) {
      return res.status(404).json({ error: 'Purchase not found' })
    }

    if (String(user.id) !== String(ad.author)) {
      return res.status(403).json({ error: 'Permission denied' })
    }

    ad.purchasedBy = purchase.id
    await ad.save()

    return res.json(ad)
  }
}

module.exports = new PurchaseController()
