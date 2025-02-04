

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

module.exports = { addToCart, singleCart };
