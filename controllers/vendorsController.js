const vendorsModel = require("../models/vendorsModel");
const { validateVendor } = require("../validators/vendorValidator");

// Get all vendors
exports.getAllVendors = async (req, res) => {
  try {
    const vendors = await vendorsModel.find();
    res.status(200).json(vendors);
  } catch (error) {
    res.status(500).json({ message: "Error fetching vendors", error });
  }
};

// Get a vendor by ID
exports.getVendorById = async (req, res) => {
  try {
    const vendor = await vendorsModel.findById(req.params.id);
    if (!vendor) {
      return res.status(404).json({ message: "Vendor not found" });
    }
    res.status(200).json(vendor);
  } catch (error) {
    res.status(500).json({ message: "Error fetching vendor", error });
  }
};

// Create a new vendor
exports.createVendor = async (req, res) => {
  try {
    const errors = validateVendor(req.body);

    if (errors.length) {
      return res.status(400).json({ message: "Validation failed", errors });
    }
    const newVendor = new vendorsModel(req.body);
    await newVendor.save();
    res
      .status(201)
      .json({ message: "Vendor created successfully", data: newVendor });
  } catch (error) {
    res.status(500).json({ message: "Error creating vendor", error });
  }
};

// Update a vendor by ID
exports.updateVendor = async (req, res) => {
  try {
    const errors = validateVendor(req.body);
    if (errors.length) {
      return res.status(400).json({ message: "Validation failed", errors });
    }

    const vendor = await vendorsModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!vendor) {
      return res.status(404).json({ message: "Vendor not found" });
    }
    res
      .status(200)
      .json({ message: "Vendor updated successfully", data: vendor });
  } catch (error) {
    res.status(500).json({ message: "Error updating vendor", error });
  }
};

// Delete a vendor by ID
exports.deleteVendor = async (req, res) => {
  try {
    const vendor = await vendorsModel.findByIdAndDelete(req.params.id);
    if (!vendor) {
      return res.status(404).json({ message: "Vendor not found" });
    }
    res.json({ message: "Vendor deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting vendor", error });
  }
};
