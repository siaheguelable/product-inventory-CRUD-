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
 * /vendors:
 *   post:
 *     summary: Create a new vendor
 *     tags: [Vendors]
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: vendor
 *         description: Vendor to create
 *         required: true
 *         schema:
 *           type: object
 *           required:
 *             - name
 *             - address
 *             - contact
 *           properties:
 *             name:
 *               type: string
 *             address:
 *               type: string
 *             contact:
 *               type: object
 *               required:
 *                 - email
 *                 - phone
 *               properties:
 *                 email:
 *                   type: string
 *                 phone:
 *                   type: string
 *     responses:
 *       201:
 *         description: Vendor created successfully
 *       400:
 *         description: Validation failed
 *       500:
 *         description: Error creating vendor
 */

// Create a new vendor
routes.post("/", vendorsController.createVendor);

/* @swagger
 * /vendors/{id}:
 *   put:
 *     summary: Update a vendor by ID
 *     tags: [Vendors]
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *       - in: body
 *         name: vendor
 *         description: Vendor data to update
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *             address:
 *               type: string
 *             contact:
 *               type: object
 *               properties:
 *                 email:
 *                   type: string
 *                 phone:
 *                   type: string
 *     responses:
 *       200:
 *         description: Vendor updated successfully
 *       400:
 *         description: Validation failed
 *       404:
 *         description: Vendor not found
 *       500:
 *         description: Error updating vendor
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

// Edit vendor form
routes.get("/:id/edit", vendorsController.editVendorForm);
routes.post("/:id/edit", vendorsController.updateVendor); // or use PUT with method-override
module.exports = routes;
