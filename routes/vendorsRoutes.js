const routes = require("express").Router();

const vendorsController = require("../controllers/vendorsController");
///swagger-autogen
/**
 * @swagger
 * /vendors:
 *   get:
 *     summary: Get all vendors
 *     responses:
 *       200:
 *         description: A list of vendors
 *   post:
 *     summary: Create a new vendor
 *     responses:
 *       201:
 *         description: The created vendor
 */

// Get all vendors
routes.get("/", vendorsController.getAllVendors);

///swagger-autogen
/**
 * @swagger
 * /vendors/{id}:
 *   get:
 *     summary: Get a vendor by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the vendor
 *     responses:
 *       200:
 *         description: The requested vendor
 *       404:
 *         description: Vendor not found
 */

// Get a vendor by ID
routes.get("/:id", vendorsController.getVendorById);
///swagger-autogen
/**
 * @swagger
 *  /vendors:
 *    post:
 *      summary: Create a new vendor
 *      responses:
 *        201:
 *          description: The created vendor
 *        400:
 *          description: Invalid request
 */

// Create a new vendor
routes.post("/", vendorsController.createVendor);

/**
 * @swagger
 * /vendors/{id}:
 *  put:
 *   summary: Update a vendor by ID
 *   responses:
 *     200:
 *       description: The updated vendor
 *     400:
 *       description: Invalid request
 *     404:
 *       description: Vendor not found
 */

// Update a vendor by ID
routes.put("/:id", vendorsController.updateVendor);
/**
 * @swagger
 * /vendors/{id}:
 *  delete:
 *  summary: Delete a vendor by ID
 * responses:
 *    204:
 *      description: Vendor deleted successfully
 */

// Delete a vendor by ID
routes.delete("/:id", vendorsController.deleteVendor);
module.exports = routes;
