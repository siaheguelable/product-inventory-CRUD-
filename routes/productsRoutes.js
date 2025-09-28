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
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: product
 *         description: Product to create
 *         required: true
 *         schema:
 *           type: object
 *           required:
 *             - name
 *             - price
 *             - description
 *             - category
 *             - stock
 *             - vendor
 *           properties:
 *             name:
 *               type: string
 *             price:
 *               type: number
 *             description:
 *               type: string
 *             category:
 *               type: string
 *             stock:
 *               type: integer
 *             vendor:
 *               type: string
 */
routes.post("/", productsController.createProduct);

// Get a product by ID

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Get a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Product found
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal server error
 */
routes.get("/:id", productsController.getProductById);

// Update a product by ID

/**
 * @swagger
 * /products/{id}:
 *  put:
 *   summary: Update a product by ID
 *  tags: [Products]
 *  parameters:
 *
 *    - in: path
 *     name: id
 *    required: true
 *    type: string
 *   - in: body
 *    name: product
 *   description: Product data to update
 *  required: true
 *  schema:
 *    type: object
 *   properties:
 *    name:
 *    type: string
 *  price:
 *  type: number
 * description:
 *  type: string
 * category:
 * type: string
 * stock:
 * type: integer
 * vendor:
 * type: string
 * responses:
 *  200:
 *  description: Product updated successfully
 *  400:
 * description: Validation failed
 *  404:
 * description: Product not found
 * 500:
 * description: Error updating product
 */
routes.put("/:id", productsController.updateProductApi);

// Delete a product by ID
/**
 * * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Delete a product by ID
 *
 *     tags: [Products]
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        type: string
 *    responses:
 *      204:
 *        description: Product deleted successfully
 *      404:
 *        description: Product not found
 *      500:
 *        description: Error deleting product
 */
routes.delete("/:id", productsController.deleteProduct);

// Edit product form
routes.get("/:id/edit", productsController.editProductForm);
routes.post("/:id/edit", productsController.updateProductForm); // or use PUT with method-override

module.exports = routes;
