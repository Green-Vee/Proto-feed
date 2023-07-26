import mongoose from "mongoose";

const broilerSchema = new mongoose.Schema(
  {
    product_type: {
      type: String,
      required: true,
    },
    product_name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    isSold: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const Broiler = mongoose.model("Broiler", broilerSchema);

export default Broiler;
