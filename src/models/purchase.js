
'use strict';
const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

let PurchaseSchema = new Schema({
    
    prodId: String,
    qty: String,  
    created: {type: Date, require:true, default: Date.now}
});

module.exports = mongoose.model('Purchase', PurchaseSchema);
