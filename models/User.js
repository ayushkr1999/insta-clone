const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  },

  followers:[
    {
      user: {
        type: Schema.Types.ObjectId
      },
      
    }
  ],
  following:[
    {
      user: {
        type: Schema.Types.ObjectId
      },
    }
  ],

  notifications:[
    {
      user:{
        type: Schema.Types.ObjectId
      },
      action:{
        type:String
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('User', UserSchema);
