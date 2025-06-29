import express from 'express';

import tblUsers from '../Schema/tblUserSchema.js';
import tblProducts from '../Schema/tblProductSchema.js';
import tblStock from '../Schema/tblStockSchema.js';
import tblCartItem from '../Schema/tblCartItemSchema.js';
import tblOrder from '../Schema/tblOrderSchema.js';



const router = express.Router();

// router.get('/user', async(req, res)=>{
// 	await tblOrder.removeAllListeners({})
// 	const qaade = await tblOrder.insertMany(Data.sdata)
// 	res.send({qaade})
// })

// display data
// Products
router.get('/products', async(req, res)=>{
	const qaade = await tblProducts.find()
	res.send({qaade})
})
// add product
router.post('/addproduct', async (req, res) => {
  try {
    const updated = await tblProducts.insertMany(req.body);
    res.json({ message: 'Product Inserted', product: updated });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// update product
router.put('/editproduct/:id', async (req, res) => {
  try {
    const updated = await tblProducts.findByIdAndUpdate(req.params.id, req.body, { new: true });
     // Update stock items of this product to 'Discontinued'
    await tblStock.deleteMany(
      { Product: req.params.id }
      
    );

    res.json({ message: 'Product updated', product: updated });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// delete product
router.delete('/deleteproduct/:id', async (req, res) => {
	console.log(req.params.id)
  try {
    const updated = await tblProducts.findByIdAndDelete(req.params.id);

    res.json({ message: 'Product Deleted', product: updated });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// users
router.get('/users', async(req, res)=>{
	const qaade = await tblUsers.find()
	res.send({qaade})
})

// add User
router.post('/adduser', async (req, res) => {
  try {
    const updated = await tblUsers.insertMany(req.body);
    res.json({ message: 'User Inserted', User: updated });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// update User
router.put('/edituser/:id', async (req, res) => {
  try {
    const updated = await tblUsers.findByIdAndUpdate(req.params.id, req.body, { new: true });
    
    res.json({ message: 'User updated', User: updated });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// delete User
router.delete('/deleteuser/:id', async (req, res) => {
  console.log(req.params.id)
  try {
    const updated = await tblUsers.findByIdAndDelete(req.params.id);

    res.json({ message: 'User Deleted', User: updated });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});








// stock
router.get('/stock', async(req, res)=>{
	const qaade = await tblStock.find()
	res.send({qaade})
})

// add stock
router.post('/addstock', async (req, res) => {
  try {
    const updated = await tblStock.insertMany(req.body);
    res.json({ message: 'stock Inserted', stock: updated });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// update stock
router.put('/editstock/:id', async (req, res) => {
  try {
    const updated = await tblStock.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ message: 'stock updated', stock: updated });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// delete stock
router.delete('/deletestock/:id', async (req, res) => {
	console.log(req.params.id)
  try {
    const updated = await tblStock.findByIdAndDelete(req.params.id);
    res.json({ message: 'stock Deleted', stock: updated });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



// cart
router.get('/cartitems/:id', async(req, res)=>{
	const id = req.params.id;
	const qaade = await tblCartItem.findById(id)
	res.send({qaade})
})

// orders
router.get('/orders', async(req, res)=>{
	const qaade = await tblOrder.find()
	res.send({qaade})
})

router.put('/editorder/:id', async (req, res) => {
  try {
    const updated = await tblOrder.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ message: 'Order updated', Order: updated });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



// login
// orders
// In /back-end/Router/router.js
import jwt from 'jsonwebtoken';

router.post('/login', async (req, res) => {
  const { Username, Password } = req.body;

  try {
    const user = await tblUsers.findOne({ Username });

    if (!user || user.Password !== Password || user.Role !== 'Admin') {
      return res.json({ success: false, message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id, role: user.Role }, 'myadmin', { expiresIn: '1d' });

    res.json({ success: true, token });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});




export default router;