const routes = require("express").Router();

const vendorsController = require("../controllers/vendorsController");

// Get all vendors
routes.get("/", vendorsController.getAllVendors);

// Get a vendor by ID
routes.get("/:id", vendorsController.getVendorById);

// Create a new vendor
routes.post("/", vendorsController.createVendor);

// Update a vendor by ID
routes.put("/:id", vendorsController.updateVendor);

// Delete a vendor by ID
routes.delete("/:id", vendorsController.deleteVendor);
module.exports = routes;
