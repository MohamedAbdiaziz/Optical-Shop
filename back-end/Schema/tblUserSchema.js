import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  
  Username: {
    type: String,
    required: true,
    maxlength: 50
  },
  Password: {
    type: String,
    required: true,
    maxlength: 255
  },
  Email: {
    type: String,
    required: true,
    maxlength: 100
  },
  Role: {
    type: String,
    required: true,
    maxlength: 15
  },
  Status: {
    type: String,
    required: true,
    maxlength: 20
  },
  Mobile: {
    type: Number,
    required: true
  },
  Address: {
    type: String,
    required: true,
    maxlength: 255
  },
},{
  timestamp: true
});

const tblUsers = mongoose.model("tblUsers",userSchema)



export default tblUsers;