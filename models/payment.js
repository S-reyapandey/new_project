const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required : true
    }, 
    lastname : {
        type: String,
        required: true
    },
    amount : {
        type: Number,
        required: true
    },
    userid : {
        type: String,
        required : true
    },
    paid: {
        type : Boolean,
        required : true
    },
    date : {
        type: Date,
        default : Date.now
    }
})

const Payment = new mongoose.model('Payment', paymentSchema);

module.exports = Payment;