const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  customer: {
    name: {
      type: String,
      required: true,
    },

    surname: {
      type: String,
      required: true,
    },

    city: {
      type: String,
      required: true,
    },

    country: {
      type: String,
      required: true,
    },

    postalcode: {
      type: Number,
      required: true,
    },

    phone: {
      type: Number,
      required: true,
    },
  },
  items: {
    product: {
      type: Array,
      required: true,
    },
  },
});

module.exports = mongoose.model("Order", OrderSchema);
