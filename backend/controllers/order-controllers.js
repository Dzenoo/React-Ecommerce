const HttpError = require("../models/http-error");
const Order = require("../models/order");

exports.createOrder = async (req, res, next) => {
  const { name, surname, city, country, postalcode, phone, product } = req.body;

  const createdOrder = new Order({
    customer: {
      name,
      surname,
      city,
      country,
      postalcode,
      phone,
    },
    items: { product },
  });

  try {
    await createdOrder.save();
  } catch (err) {
    const error = new HttpError("Ne moze se sacuvati order pokusajte ponovo");
    return next(error);
  }

  res.json({ order: createdOrder });
};

exports.getOrders = async (req, res, next) => {
  let orders;
  try {
    orders = await Order.find();
  } catch (err) {
    const error = new HttpError("Ne moze se pronaci order pokusajte ponovo");
    return next(error);
  }

  res.json({ orders });
};

exports.deleteOrder = async (req, res, next) => {
  const orderId = req.params.oid;

  let order;

  try {
    order = await Order.findById(orderId);
  } catch (err) {
    const error = new HttpError("Ne moze se izbrisati order pokusajte ponovo");
    return next(error);
  }

  try {
    await order.remove();
  } catch (err) {
    const error = new HttpError("Ne moze se izbrisati order pokusajte ponovo");
    return next(error);
  }

  res.status(200).json({ message: "Order izbrisan" });
};
