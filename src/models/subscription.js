const mongoose = require('mongoose')

const { Schema } = mongoose

const SubscriptionSchema = new Schema({
  url: String,
  topic: String,
  created: { type: Date, require: true, default: Date.now }
})

module.exports = mongoose.model('Subscription', SubscriptionSchema)
