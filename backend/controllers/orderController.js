const Order = require('../model/Order');
const sendEmail = require('../utils/sendEmail');

const createOrder = async (req, res) => {
  try {
    const { products, totalAmount, address, paymentId } = req.body;

    if (!products || products.length === 0) {
      return res.status(400).json({
        message: 'No order products',
      });
    }

    const order = new Order({
      user: req.user._id,
      products,
      totalAmount,
      address,
      paymentId,
    });

    const createdOrder = await order.save();

    // Send Order Confirmation Email
    const message = `
      <h2>Order Confirmation</h2>
      <p>Hello ${req.user.name},</p>
      <p>
        Your order has been successfully placed!
        Order ID:
        <strong>${createdOrder._id}</strong>
      </p>
      <p>Total Amount Paid: ₹${Number(totalAmount).toFixed(2)}</p>
      <p>
        It will be shipped to:
        ${address.street}, ${address.city}, ${address.postalCode}
      </p>
      <p>Thank you for shopping with ShopNest!</p>
    `;

    await sendEmail({
      email: req.user.email,
      subject: 'ShopNest - Order Confirmation',
      message,
    });

    res.status(201).json(createdOrder);
  } catch (error) {
    console.error('Create order error:', error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// Get logged-in user's orders
const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      user: req.user._id,
    })
      .populate('products.product')
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    console.error('Get orders error:', error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// Get all orders - Admin
const getOrderById = async (req, res) => {
  try {
    const orders = await Order.find({})
      .populate('user', 'name email')
      .populate('products.product')
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    console.error('Get all orders error:', error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// Get orders for a specific user - Admin
const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      user: req.params.userId,
    })
      .populate('products.product')
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    console.error('Get user orders error:', error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// Update order status
const updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        message: 'Order not found',
      });
    }

    order.status = req.body.status || order.status;

    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } catch (error) {
    console.error('Update order error:', error);

    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createOrder,
  getOrders,
  getOrderById,
  getUserOrders,
  updateOrderStatus,
};
