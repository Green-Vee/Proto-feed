import Product from "../models/Product.js";

export async function createProduct(req, res) {
  try {
    const inputData = req.body;
    // Insert each item from inputData into the database
    for (const item of inputData) {
      await Product.create(item);
    }

    res.status(201).json({ message: "Data added successfully" });
  } catch (error) {
    console.error("Error adding data:", error);
    res.status(500).json({ message: "An error occurred" });
  }

  // try {
  //   const { productType, name, price, kgs, quantity } = req.body;
  //   // console.log(req.body)

  //   // if (!["broilers", "layers", "cattle"].includes(productType)) {
  //   //   return res.status(400).json({ error: "Invalid product type." });
  //   // }

  //   // Create and save the new product

  //   return res.status(201).json(newProduct);
  // } catch (error) {
  //   console.error("Error creating product:", error);
  //   return res.status(500).json({ error: "Server error." });
  // }
}

export async function getAllProducts(req, res) {
  try {
    const products = await Product.find().sort({ createdAt: -1 }).limit(24);
    // console.log(products);
    return res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    return res.status(500).json({ error: "Server error." });
  }
}

export async function sellProduct(req, res) {
  const { productId, itemIndex } = req.body;
  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: "Product not found." });
    }

    const item = product.items[itemIndex];
    if (!item || item.isSold) {
      return res.status(400).json({ error: "Invalid product item." });
    }

    item.isSold = true;
    await product.save();

    return res.status(200).json(product);
  } catch (error) {
    console.error("Error selling product:", error);
    return res.status(500).json({ error: "Server error." });
  }
}

// Assuming you have a route to handle the PUT request to toggle the 'isSold' property
export async function toggleIsSold(req, res) {
  try {
    const productId = req.params.productId;
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    product.isSold = !product.isSold;
    await product.save();

    const products = await Product.find();

    return res.json(products);
  } catch (err) {
    console.error("Error updating product:", err);
    return res.status(500).json({ error: "Failed to update product" });
  }
}
