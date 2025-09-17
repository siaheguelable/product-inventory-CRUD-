const routes = require("express").Router();

const productsController = require("../controllers/productsController");

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: List of products
 */
// Get all products
routes.get("/", productsController.getAllProducts);

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *               stock:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Product created successfully
 */

// Create a new product
routes.post("/", productsController.createProduct);

// Get a product by ID
routes.get("/:id", productsController.getProductById);

// Update a product by ID
routes.put("/:id", productsController.updateProduct);

// Delete a product by ID
routes.delete("/:id", productsController.deleteProduct);

module.exports = routes;
