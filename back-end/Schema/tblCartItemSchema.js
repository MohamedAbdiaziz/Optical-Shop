import mongoose from 'mongoose';

const cartItemSchema = new mongoose.Schema({
  
  Customer: {
    type: String,
    required: true,
    maxlength: 50
  },
  Product: {
    type: Number,
    required: true
  },
  Quantity: {
    type: Number,
    required: true
  },
  Price: {
    type: mongoose.Schema.Types.Decimal128,
    required: true
  },
  Subtotal: {
    type: mongoose.Schema.Types.Decimal128,
    required: true
  }
},{
  timestamp: true
});

const tblCartItem = mongoose.model('tblCartItem', cartItemSchema);
export default tblCartItem;
