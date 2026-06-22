import ProductModel from "../Models/Product.model.js";

export const showproduct = async (req, res) => {
  try {
    const page = Math.max(parseInt(req.query.page) || 1, 1);
    const limit = Math.max(parseInt(req.query.limit) || 20, 1);

    const category = req.query.category?.trim();
    const search = req.query.search?.trim();

    const filter = {};

    if (category) {
      filter.category = category;
    }

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { model_number: { $regex: search, $options: "i" } },
      ];
    }

    const totalItems = await ProductModel.countDocuments(filter);
    const totalPages = Math.ceil(totalItems / limit);

    const data = await ProductModel.find(filter)
      .sort({ createdAt: -1, _id: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    return res.status(200).json({
      data,
      page,
      limit,
      totalItems,
      totalPages,
    });
  } catch (error) {
    return res.status(500).json({
      message: "failed to get products",
      error: error.message,
    });
  }
};

export const addproduct = async (req, res) => {
  try {
    const { name, model_number, category } = req.body;

    if (!name || !model_number || !category) {
      return res.status(400).json({
        message: "name, model_number and category are required",
      });
    }

    const add_product = await ProductModel.create({
      name,
      model_number,
      category,
    });

    return res.status(201).json({
      message: "product added successfully",
      data: add_product,
    });
  } catch (error) {
    return res.status(500).json({
      message: "failed to add product",
      error: error.message,
    });
  }
};

export const updateproduct = async (req, res) => {
  try {
    const { _id, name, model_number, category } = req.body;

    if (!_id) {
      return res.status(400).json({ message: "_id is required for update" });
    }

    const updateFields = {};

    if (name !== undefined) updateFields.name = name;
    if (model_number !== undefined) updateFields.model_number = model_number;
    if (category !== undefined) updateFields.category = category;

    const updatedProduct = await ProductModel.findByIdAndUpdate(
      _id,
      { $set: updateFields },
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "product not found" });
    }

    return res.status(200).json({
      message: "product updated successfully",
      data: updatedProduct,
    });
  } catch (error) {
    return res.status(500).json({
      message: "failed to update product",
      error: error.message,
    });
  }
};