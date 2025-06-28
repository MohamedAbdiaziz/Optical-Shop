import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  image: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['sunglasses', 'prescription'],
    required: true
  },
  status: {
    type: String,
    enum: ['actie', 'deactive'],
    required: true
  },
  description: {
    type: String,
    required: false
  }
},{
	timestamp: true
});

const tblProduct = mongoose.model('tblProduct', productSchema);

export default tblProduct;


