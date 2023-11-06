const router = require("express").Router();
const Order = require("../models/Order.js");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verify.js");

// Create an order
router.post("/", verifyToken, async (req, res) => {
  const newOrder = new Order(req.body);
  try {
    const order = await newOrder.save();
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Update an order
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updateOrder = await Order.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );
    res.status(200).json(updateOrder);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Delete an order
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.status(200).json("Order deleted!");
  } catch (error) {
    res.status(500).json(error);
  }
});

// Get user order
router.get("/find/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const orders = await Order.find({ id: req.params.id });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json(error);
  }
});

//  Get all orders
router.get("/", verifyTokenAndAdmin, async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json(error);
  }
});


module.exports = router;