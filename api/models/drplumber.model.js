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
  deadline : {
    type : Date,
    required : true
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

mongoose.model('Plumber', plumberSchema);
