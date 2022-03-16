const mongoose = require('mongoose');



const users = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: [true, 'user must have email'],
    },

    password: {
        type: String,
        required: [true, 'user must have a password'],
    },

    interest: {
        type: String,
        required: [true, 'user must have an interest'],

    },
    isAccountVerified: {
        type: Boolean,
        default: false,
    },

    verificationCode: {
        type: Number,
        required: [true, 'verification is required'],
    },

    
    profileImageUrl: {
        type: String,
    },

   

    username: {
        type: String,
    },

    firstName: {
        type: String,
    },



    lastName: {
        type: String,
    },

   
    phoneNumber: {
        type: String,
        unique: true,
        required: [true, 'user must have a phone number'],
    },

   

    
   
},
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);



const Users = mongoose.model('Users', users);

module.exports = Users;