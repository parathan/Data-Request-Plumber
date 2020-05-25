var mongoose = require('mongoose');

var requestSchema = new mongoose.Schema({
  name : {
    type : String,
    required : true
  },
  sender : {
    type : String,
    required : true
  },
  receiver : {
    type : String,
    required: true
  },
  createdOn : {
    type : Date,
    default : Date.now
  },
  priority : {
    type : Number,
    min : 0,
    max : 5,
    default : 5
  },
  specifications : {
    type : String,
    required : true
  }
});

var userSchema = new mongoose.Schema({
  name : {
    type : String,
    required : true
  },
  outgoing : [requestSchema],
  incoming : [requestSchema]
});

mongoose.model('Plumber', userSchema);
