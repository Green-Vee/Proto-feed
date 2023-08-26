import mongoose from "mongoose";

const salesSchema = mongoose.Schema(
  {
    user_id: {
      type: String,
      required: true,
    },
    full_name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    district: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    phone_2: {
      type: String,
      required: true,
    },


    cartItems: {
      type: Array,
      required:"Please by something",
    },
  },
  {
    timestamps: true,
  }
);

const Sale = mongoose.model("Sale", salesSchema);

export default Sale;
