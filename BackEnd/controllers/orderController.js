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
      const data = {
        total_amount: 100,
        currency: "BDT",
        tran_id: "REF123", // use unique tran_id for each api call
        success_url: "http://localhost:3000/api/v1/order/payment/success",
        fail_url: "http://localhost:3000/api/v1/order/payment/failed",
        cancel_url: "http://localhost:3030/cancel",
        ipn_url: "http://localhost:3030/ipn",
        shipping_method: "Courier",
        product_name: "Computer.",
        product_category: "Electronic",
        product_profile: "general",
        cus_name: "Customer Name",
        cus_email: "customer@example.com",
        cus_add1: "Dhaka",
        cus_add2: "Dhaka",
        cus_city: "Dhaka",
        cus_state: "Dhaka",
        cus_postcode: "1000",
        cus_country: "Bangladesh",
        cus_phone: "01711111111",
        cus_fax: "01711111111",
        ship_name: "Customer Name",
        ship_add1: "Dhaka",
        ship_add2: "Dhaka",
        ship_city: "Dhaka",
        ship_state: "Dhaka",
        ship_postcode: 1000,
        ship_country: "Bangladesh",
      };
      const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
      sslcz.init(data).then((apiResponse) => {
        // Redirect the user to payment gateway
        let GatewayPageURL = apiResponse.GatewayPageURL;
        //  res.redirect(
        //    "https://sandbox.sslcommerz.com/EasyCheckOut/testcde4192ca58d422a038905eaab4e330b071"
        //  );

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
  res.redirect("http://localhost:5173/payment/success");
};
const paymentFailed = async (req, res) => {
  res.redirect("http://localhost:5173/payment/failed");
};
const paymentCancel = async (req, res) => {
  res.redirect("http://localhost:5173/payment/cancel");
};

module.exports = { userOrder, paymentSuccess, paymentFailed, paymentCancel };
