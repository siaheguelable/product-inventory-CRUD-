const Product = require("./models/productsModel");
const Vendor = require("./models/vendorsModel"); // adjust path if needed
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const GitHubStrategy = require("passport-github2").Strategy;
const path = require("path");
require("dotenv").config(); // Load environment variables

const productsRoutes = require("./routes/productsRoutes");
const vendorsRoutes = require("./routes/vendorsRoutes");
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./swagger-output.json");
const cors = require("cors");
const expressLayouts = require("express-ejs-layouts");
const methodOverride = require("method-override");

const connectDB = require("./DB/connection");

connectDB();
const app = express();

// Session middleware (required for Passport)
app.use(
  session({
    secret: "your-session-secret",
    resave: false,
    saveUninitialized: false,
  })
);

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Passport GitHub Strategy setup
passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID || "GITHUB_CLIENT_ID",
      clientSecret: process.env.GITHUB_CLIENT_SECRET || "GITHUB_CLIENT_SECRET",
      callbackURL:
        process.env.GITHUB_CALLBACK_URL ||
        "https://product-inventory-crud.onrender.com/auth/github/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      // Here you would look up or create the user in your DB
      return done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((obj, done) => {
  done(null, obj);
});
app.use(cors());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(expressLayouts);
app.set("view engine", "ejs");
app.set("layout", "../Views/Pages/layout");
app.set("views", path.join(__dirname, "Views"));
app.use(express.static("public"));

// navigate to home page
app.get("/", (req, res) => {
  res.render("Accounts/login");
});

// Render vendor page
app.get("/Pages/vendor", async (req, res) => {
  if (!req.isAuthenticated || !req.isAuthenticated()) {
    return res.redirect("/login");
  }
  try {
    const vendors = await Vendor.find();
    res.render("Pages/vendor", { vendors });
  } catch (err) {
    res.status(500).send("Error loading vendors");
  }
});

// Render product page
app.get("/Pages/product", async (req, res) => {
  if (!req.isAuthenticated || !req.isAuthenticated()) {
    return res.redirect("/login");
  }
  try {
    const products = await Product.find();
    res.render("Pages/product", { products });
  } catch (err) {
    res.status(500).send("Error loading products");
  }
});

// Routes
app.use("/products", productsRoutes);
app.use("/vendors", vendorsRoutes);
// After middleware, before routes
// app.post("/vendors/:id", (req, res) => {
//   res.send("POST received, method-override not working");
// });

// Auth routes
app.get(
  "/auth/github",
  passport.authenticate("github", { scope: ["user:email"] })
);
app.get(
  "/auth/github/callback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  (req, res) => {
    // Successful authentication
    if (req.isAuthenticated && req.isAuthenticated()) {
      res.redirect("/Pages/dashboard");
    } else {
      res.redirect("/login");
    }
  }
);

app.get("/Pages/dashboard", (req, res) => {
  if (!req.isAuthenticated || !req.isAuthenticated()) {
    return res.redirect("/login");
  }
  res.render("Pages/dashboard", { user: req.user });
});

app.get("/logout", (req, res) => {
  req.logout(() => {
    res.redirect("/");
  });
});

const authRoutes = require("./routes/authRoutes");
app.use("/", authRoutes);

// Middleware to require login for all routes except /login and /auth/github
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated && req.isAuthenticated()) {
    return next();
  }
  // Allow access to login and GitHub auth routes
  if (
    req.path === "/login" ||
    req.path.startsWith("/auth/github") ||
    req.path === "/auth/github/callback" ||
    req.path === "/logout" ||
    req.path.startsWith("/public")
  ) {
    return next();
  }
  res.redirect("/login");
}

app.use(ensureAuthenticated);

// Configure PORT
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} 🚀`);
});
