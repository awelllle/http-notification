const mongoose = require('mongoose')

const { Schema } = mongoose

const PurchaseSchema = new Schema({
  prodId: String,
  qty: String,
  created: { type: Date, require: true, default: Date.now }
})

module.exports = mongoose.model('Purchase', PurchaseSchema)
