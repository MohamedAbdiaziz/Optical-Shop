import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  
  Customer: {
    type: String,
    required: true,
    maxlength: 50
  },
  Transaction: {
    type: String,
    required: true
  },
  Order_Date: {
    type: Date,
    default: Date.now
  },
  Total_Amount: {
    type: mongoose.Schema.Types.Decimal128,
    required: true
  },
  Status: {
    type: String,
    default: 'Pending',
    maxlength: 20
  },
  Items: [
    {
      ID: {
        type: Number,
        required: true,
        unique: true
      },
      Product: {
        type: String,
        required: true
      },
      Quantity: {
        type: Number,
        required: true
      },
      Price: {
        type: mongoose.Schema.Types.Decimal128,
        required: true
      }
    }
  ]
},{
  timestamp:true
});

const tblOrder = mongoose.model('tblOrder', orderSchema);
export default tblOrder;
