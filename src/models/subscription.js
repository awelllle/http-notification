
'use strict';
const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

let SubscriptionSchema = new Schema({
    
    url: String,
    topic: String,
    created: {type: Date, require:true, default: Date.now}
});

module.exports = mongoose.model('Subscription', SubscriptionSchema);
