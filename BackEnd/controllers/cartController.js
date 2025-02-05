const cartModel = require("../model/cardModel");

const addToCart = async (req, res) => {
  const { user, products, quantity, price } = req.body;
  try {
    const newCart = new cartModel({
      user,
      products,
      quantity,
      price,
    });
    await newCart.save();
    return res.status(201).send({
      success: true,
      error: false,
      message: "Cart add successfully",
      newCart,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      error: true,
      message: error.message || "Internal server error",
    });
  }
};
const singleCart = async (req, res) => {
  const { userId } = req.params;
  try {
    const singleCart = await cartModel.find({ user: userId });
    return res.status(200).send({
      success: true,
      error: false,
      message: "Your cart here",
      singleCart,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      error: true,
      message: error.message || "Internal server error",
    });
  }
};
const incrementCart = async (req, res) => {
  const { cartId } = req.params;
  try {
    const incrementCart = await cartModel
      .findOne({ _id: cartId })
      .populate("products");
    if (incrementCart.products.stock > incrementCart.quantity) {
      incrementCart.quantity++;
      await incrementCart.save();
      return res.status(200).send({
        success: true,
        error: false,
        message: "Cart update Successfully",
        incrementCart,
      });
    } else {
       return res.status(200).send({
         success: true,
         error: false,
         message: "Out of Stock",
        
       });
    }
  } catch (error) {
    return res.status(500).send({
      success: false,
      error: true,
      message: error.message || "Internal server error",
    });
  }
};
const decrementCart = async (req, res) => {
  const { cartId } = req.params;
  try {
    const decrementCart = await cartModel.findOne({ _id: cartId });
    if (decrementCart.quantity > 1) {
      decrementCart.quantity--;
      await decrementCart.save();
      return res.status(200).send({
        success: true,
        error: false,
        message: "Cart update Successfully",
        decrementCart,
      });
    } else {
      return res.status(200).send({
        success: true,
        error: false,
        message: "Item Must Be One",
      });
    }
  } catch (error) {
    return res.status(500).send({
      success: false,
      error: true,
      message: error.message || "Internal server error",
    });
  }
};
const deleteCartProduct = async (req, res) => {
  const { cartId } = req.params;
  try {
    const deleteCartProduct = await cartModel.findOneAndDelete({ _id: cartId });
    return res.status(200).send({
      success: true,
      error: false,
      message: "Cart delete Successfully",
      deleteCartProduct,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      error: true,
      message: error.message || "Internal server error",
    });
  }
};

module.exports = {
  addToCart,
  singleCart,
  incrementCart,
  decrementCart,
  deleteCartProduct,
};
