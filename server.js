const express = require("express");
const bodyParser = require("body-parser");
const productsRoutes = require("./routes/productsRoutes");
const vendorsRoutes = require("./routes/vendorsRoutes");
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./swagger-output.json");
const cors = require("cors");

const connectDB = require("./DB/connection");

connectDB();
const app = express();

app.use(cors());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/products", productsRoutes);
app.use("/vendors", vendorsRoutes);

// Configure PORT
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} 🚀`);
});
