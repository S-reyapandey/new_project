const mongoose = require("mongoose");
const payment = require('../models/payment.js');

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        minLength : 3,
        maxLength : 20,
        validate : {
            validator : function(value){
                const nameRegex = /^[a-zA-Z\s]*$/;
                return nameRegex.test(value);
            },
            message : "name contain only alphabetic character"
        }
      },
      lastname: {
        type: String,
        required: true
      },
      email: {
        type: String,
        required: true,
        unique: true
      },
      password: {
        type: String,
        required: true
      },
     withdrawls : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Payment'
      }],
      createdAt: {
        type: Date,
        default: Date.now
      }
})

//we will create a new collection

const User = new mongoose.model('User', userSchema);

module.exports = User;