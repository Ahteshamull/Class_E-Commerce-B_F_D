const orderModel = require("../model/orderModel");
const SSLCommerzPayment = require("sslcommerz-lts");
const store_id = process.env.STORE_ID;
const store_passwd = process.env.STORE_PASS;
const is_live = false;

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
    if (paymentMethod == "Cash On Delivery") {
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
      const Tran_id = Math.floor(
        1000000000 + Math.random() * 9000000000
      ).toString();

      const data = {
        total_amount: totalPrice,
        currency: "BDT",
        tran_id: Tran_id, // use unique tran_id for each api call
        success_url: `http://localhost:3000/api/v1/order/payment/success/${Tran_id}`,
        fail_url: `http://localhost:3000/api/v1/order/payment/failed/${Tran_id}`,
        cancel_url: `http://localhost:3000/api/v1/order/payment/cancel/${Tran_id}`,
        ipn_url: "http://localhost:3030/ipn",
        shipping_method: "Courier",
        product_name: "Computer.",
        product_category: "Electronic",
        product_profile: "general",
        cus_name: name,
        cus_email: email,
        cus_add1: address,
        cus_add2: "Dhaka",
        cus_city: city,
        cus_state: "Dhaka",
        cus_postcode: "1000",
        cus_country: "Bangladesh",
        cus_phone: phone,
        cus_fax: "01711111111",
        ship_name: "Customer Name",
        ship_add1: "Dhaka",
        ship_add2: "Dhaka",
        ship_city: "Dhaka",
        ship_state: "Dhaka",
        ship_postcode: postal,
        ship_country: "Bangladesh",
      };
      const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
      sslcz.init(data).then(async (apiResponse) => {
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
          tran_id: Tran_id,
        });
        await Order.save();

        let GatewayPageURL = apiResponse.GatewayPageURL;
       

        return res.status(200).send(GatewayPageURL);
      });
    }
  } catch (error) {
    return res.status(500).send({
      success: false,
      error: true,
      message: `${error.message ? error.message : "Internal server error"}`,
    });
  }
};

const paymentSuccess = async (req, res) => {
  const { id } = req.params;
   await orderModel
    .findOneAndUpdate(
      { tran_id: id },
      {
        paymentStatus: "paid",
      },
      {
        new: true,
      }
    )
    .then(() => {
      res.redirect(`http://localhost:5173/payment/success/${id}`);
    });
};
const paymentFailed = async (req, res) => {
  const { id } = req.params;
  const deleteOrder = await orderModel.findOneAndDelete({ tran_id: id }).then(() => {
    res.redirect(`http://localhost:5173/payment/failed/${id}`);
    
  })
};
const paymentCancel = async (req, res) => {
  const { id } = req.params;
  await orderModel
    .findOneAndDelete({ tran_id: id })
    .then(() => {
      
      res.redirect(`http://localhost:5173/payment/cancel/${id}`);
    });
};

module.exports = { userOrder, paymentSuccess, paymentFailed, paymentCancel };
