import mongoose from 'mongoose';

const stockSchema = new mongoose.Schema({
  
  Product: {
    type: String,
    required: true
  },
  Quantity: {
    type: Number,
    required: true,
    max: 999 // to match SQL int(3)
  },
  Status: {
    type: String,
    default: 'Available',
    maxlength: 26
  }
},{
  timestamp:true
});

const tblStock = mongoose.model('tblStock', stockSchema);
export default tblStock;
