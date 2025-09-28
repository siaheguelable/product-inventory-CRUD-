const productsModel = require("../models/productsModel");
const { validateProduct } = require("../validators/productValidator");

// Get all products (API)
exports.getAllProducts = async (req, res) => {
  try {
    const products = await productsModel.find();
    if (!products.length) {
      return res.status(404).json({ message: "No products found" });
    }
    res.json({ message: "Products fetched successfully", data: products });
  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error });
  }
};

// Get a product by ID (API)
exports.getProductById = async (req, res) => {
  try {
    const product = await productsModel.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json({ message: "Product fetched successfully", data: product });
  } catch (error) {
    res.status(500).json({ message: "Error fetching product", error });
  }
};

// Create a new product (API)
exports.createProduct = async (req, res) => {
  try {
    req.body.price = Number(req.body.price); // Convert price to number
    const errors = validateProduct(req.body);

    if (errors.length) {
      return res.status(400).json({ message: "Validation failed", errors });
    }

    const newProduct = new productsModel(req.body);
    await newProduct.save();
    if (!newProduct) {
      return res.status(400).json({ message: "Failed to create product" });
    }
    res
      .status(201)
      .json({ message: "Product created successfully", data: newProduct });
  } catch (error) {
    res.status(500).json({ message: "Error creating product", error });
  }
};

// Update a product by ID (API)
exports.updateProductApi = async (req, res) => {
  try {
    req.body.price = Number(req.body.price); // Convert price to number
    const errors = validateProduct(req.body);
    if (errors.length > 0) {
      return res.status(400).json({
        message: "Validation failed",
        errors,
      });
    }

    const product = await productsModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({
      message: "Error updating product",
      error: error.message || error,
    });
  }
};

// Delete a product by ID (API)
exports.deleteProduct = async (req, res) => {
  try {
    const product = await productsModel.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting product", error });
  }
};

// Show edit form (Web)
exports.editProductForm = async (req, res) => {
  const product = await productsModel.findById(req.params.id);
  res.render("Pages/editProduct", { product });
};

// Handle update from form (Web)
exports.updateProductForm = async (req, res) => {
  req.body.price = Number(req.body.price); // Convert price to number
  await productsModel.findByIdAndUpdate(req.params.id, req.body);
  res.redirect("/Pages/product");
};
