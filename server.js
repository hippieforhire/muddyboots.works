const express = require("express");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config(); // Load environment variables

const app = express();
const port = process.env.PORT || 3000; // Use Heroku's dynamic port or 3000 for local dev

// Enable CORS for all routes
app.use(cors());

// Parse incoming JSON and URL-encoded data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve all static files (CSS, JS, images) from the current directory
app.use(express.static(__dirname));

// Routes for your pages
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/services", (req, res) => {
  res.sendFile(path.join(__dirname, "services.html"));
});

app.get("/contact", (req, res) => {
  res.sendFile(path.join(__dirname, "contact.html"));
});

app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "about.html"));
});

// Example API route for future backend features
app.get("/api/example", (req, res) => {
  res.json({ message: "This is an example API response!" });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
