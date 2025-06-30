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

router.put('/update-password', async (req, res) => {
  const { Email, Password } = req.body;

  try {
    const updated = await tblUsers.findOneAndUpdate(
      { Email },
      { Password },
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: 'User not found' });

    res.json({ message: 'Password updated successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error updating password', error: err.message });
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
router.get('/cartitems/:email', async (req, res) => {
  try {
    const email = req.params.email;
    const qaade = await tblCartItem.find({ Customer: email });
    res.send({ qaade });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update cart item quantity
router.put('/cartitems/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const { Quantity, Subtotal } = req.body;

    const updated = await tblCartItem.findByIdAndUpdate(
      id,
      { Quantity, Subtotal },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: 'Cart item not found' });
    }

    res.json({ message: 'Cart item updated', item: updated });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/cartitems/:id', async (req, res) => {
  try {
    const deleted = await tblCartItem.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.json({ message: 'Cart item deleted', item: deleted });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/cartitems', async (req, res) => {
  try {
    const { Customer, Product, Quantity, Price, Subtotal } = req.body;
    Subtotal: parseFloat(Price?.$numberDecimal || 0) * Quantity;

    // Check if item already exists in cart
    const existing = await tblCartItem.findOne({ Customer, Product });

    if (existing) {
      // Update quantity and subtotal if it already exists
      existing.Quantity += Quantity;
      existing.Subtotal = existing.Quantity * parseFloat(existing.Price);
      await existing.save();
      return res.json({ message: 'Updated existing cart item', item: existing });
    }

    // Otherwise, create new item
    const newItem = new tblCartItem({
      Customer,
      Product,
      Quantity,
      Price,
      Subtotal
    });

    await newItem.save();
    res.status(201).json({ message: 'Item added to cart', item: newItem });
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: error.message });
  }
});






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
// POST /create/orders
router.post('/orders', async (req, res) => {
  try {
    const {
      Customer,
      Transaction,
      Total_Amount,
      Items,
      Status = 'Pending',
    } = req.body;

    // Validate required fields
    if (!Customer || !Transaction || !Total_Amount || !Items || !Array.isArray(Items)) {
      return res.status(400).json({ message: 'Missing required order fields.' });
    }

    const newOrder = new tblOrder({
      Customer,
      Transaction,
      Total_Amount,
      Status,
      Items,
    });

    const saved = await newOrder.save();
    try {
      const email = Customer;
      await tblCartItem.deleteMany({ Customer: email });
      res.json({ message: 'Cart cleared successfully' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
    res.status(201).json({ message: 'Order created successfully', order: saved });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
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

router.post('/customer-login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await tblUsers.findOne({ Email: email, Password: password, Role: 'customer' });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    res.json({
      message: 'Login successful',
      user: {
        id: user._id,
        email: user.Email,
        name: user.Username
      }
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});



// POST /create/register-customer
router.post('/register-customer', async (req, res) => {
  const { Username, Password, Email, Mobile, Address } = req.body;

  try {
    const exists = await tblUsers.findOne({ Email });
    if (exists) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    const newUser = new tblUsers({
      Username,
      Password,
      Email,
      Role: 'customer',
      Status: 'active',
      Mobile,
      Address
    });

    const saved = await newUser.save();

    res.status(201).json({
      message: 'Registration successful',
      user: {
        id: saved._id,
        email: saved.Email,
        name: saved.Username
      }
    });
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});




export default router;