import Sale from "../models/new_sale_model.js";

export const new_sale = async (req, res) => {
  // console.log(req.body);
  //   const { quantity, item, price } = req.body.inputsFields;
  const {
    // total,
    user_id,
    full_name,
    email,
    address,
    district,
    phone,
    phone_2,
    cartItems,
  } = req.body;

  try {
    await Sale.create({
      user_id,
      full_name,
      email,
      address,
      district,
      phone,
      phone_2,
      // total,
      cartItems,
    });

    const all_sales = await Sale.find();

    res.status(201).json(all_sales);
  } catch (error) {
    console.log(error);
  }
};

export const deleteSale = async (req, res) => {
  const id = req.params.id;

  try {
    // Use Mongoose's findByIdAndDelete function to delete the Sale
    const deletedSale = await Sale.findByIdAndDelete(id);

    if (!deletedSale) {
      throw new Error("Sale not found"); // Handle the case when the Sale with the given ID is not found
    }

    const all_Sales = await Sale.find().sort({ updatedAt: -1 });

    res.status(201).json(all_Sales);

    return deletedSale; // Return the deleted Sale if successful
  } catch (error) {
    throw new Error("Failed to delete the Sale"); // Handle any errors during the deletion process
  }
};

export const all_sales = async (req, res) => {
  const all_Sales = await Sale.find().sort({ updatedAt: -1 });
  try {
    res.status(201).json(all_Sales);
  } catch (error) {
    console.log(error.message);
  }
};
