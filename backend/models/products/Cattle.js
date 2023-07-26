import mongoose from "mongoose";

const cattleSchema = new mongoose.Schema(
  {
    product: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    isSold: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const Broiler = mongoose.model("Broiler", cattleSchema);

export default Broiler;
