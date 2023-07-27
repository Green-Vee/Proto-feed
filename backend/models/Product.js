import { Schema, model } from "mongoose";

const productSchema = new Schema(
  {
    productType: {
      type: String,
      required: true,
      enum: ["broilers", "layers", "cattle"],
    },

    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    kgs: { type: Number, required: true },
    isSold: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const Product = model("Product", productSchema);

export default Product;
