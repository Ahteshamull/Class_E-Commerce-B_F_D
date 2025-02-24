const orderModel = require("../model/orderModel");

const userOrder = async (req, res) => {
  const {
    user,
    postal,
    email,
    address,
    city,
    name,
    totalPrice,
    cartItems,
    phone,
    paymentMethod,
  } = req.body;

  try {
    if (paymentMethod === "Cash On Delivery") {
      const Order = new orderModel({
        user,
        phone,
        email,
        address,
        city,
        name,
        totalPrice,
        cartItems,
        postal,
        paymentMethod,
      });
      await Order.save();
      return res.status(201).send({
        success: true,
        error: false,
        message: "Order Successfully",
        Order,
      });
    } else {
      return res.json("Online Payment");
    }
  } catch (error) {
    return res.status(500).send({
      success: false,
      error: true,
      message: `${error.message ? error.message : "Internal server error"}`,
    });
  }
};

module.exports = { userOrder };
