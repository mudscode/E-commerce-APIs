const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    products: [
      {
        producId: {
          type: String,
        },
        quantity: {
          type: String,
          default: 1,
        },
      },
    ], amount: {
        type: Number,
        required: true 
    }, address: {
        type: Object,
        required: true 
    }, status: {
        type: String,
        default: "Pending"
    }
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Cart;