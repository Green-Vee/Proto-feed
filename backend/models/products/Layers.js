import mongoose from "mongoose";

const layersSchema = new mongoose.Schema(
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

const Broiler = mongoose.model("Broiler", layersSchema);

export default Broiler;
