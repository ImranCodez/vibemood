const cartSchema = require("../models/cartSchema");
const orderSchema = require("../models/orderSchema");
const sendResponse = require("../services/responsiveHandler");
const stripeKey = process.env.STRIPE_SECRET_KEY;
const stripe = stripeKey ? require("stripe")(stripeKey) : null;
const endpointSecret = process.env.STRIPE_ENDPOINT;
const CheckOut = async (req, res) => {
  try {
    const { paymentyp, CartId, deliveryCharge, insideDhaka, shippingAddress } =
      req.body;
    if (!paymentyp || !insideDhaka || !shippingAddress)
      return sendResponse(res, 400, "All fiel required");
    const orderNumber = `${Date.now()}`;
    if (!CartId) return sendResponse(res, 400, "Invalid request");
    const CartData = await cartSchema.findById(CartId);
    if (!CartData) return sendResponse(res, 400, "Invalid request");
    const charge = insideDhaka === "true" ? 70 : 120;
    const totalPrice = CartData.items.reduce((totall, current) => {
      return (totall += current.subtotal);
    }, charge);
    const orderData = new orderSchema({
      user: req.user._id,
      items: CartData.items,
      deliveryCharge: charge,
      shippingAddress,
      insideDhaka,
      totalPrice,
      payment: {
        method: paymentyp,
      },
      orderNumber,
    });
    orderData.save();
    if (paymentyp === "cash") {
      return sendResponse(res, 200, "order placed successfully.", orderData);
    }
    // .......for online banking .....//
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "BDT",
            product_data: {
              name: "T-Shirt",
              description: `Blue T-Shirt with chest print`,
            },
            unit_amount: 1 * 100,
          },
          quantity: 1,
        },
      ],
      customer_email: `${req.user.email}`,
      success_url: `https://example.com/success`,
      cancel_url: `https://example.com/error`,
    });

    res.redirect(303, session.url);

    console.log(session);
  } catch (error) {
    console.log(error);
    sendResponse(res, 500, "Internal server error ");
  }
};
const webhook = async (req, res) => {
  const signature = req.headers["stripe-signature"];

  let event;
  try {
    event = stripe.webhooks.constructEvent(req.body, signature, endpointSecret);
  } catch (err) {
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  console.log(event);

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    // Saving the payment details in the database
    const orderData = await Orderschema.findByIdAndUpdate(
      session.metadata.orderId,
      { "payment.status": "paid" },
      { new: true },
    );
  }

  // Return a 200 response to acknowledge receipt of the event
  res.send();
};
module.exports = { CheckOut, webhook };
