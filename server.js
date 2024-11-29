const express = require("express");
const path = require("path");
const app = express();

// Use the environment port for Heroku or default to 3000 locally
const port = process.env.PORT || 3000;

// Serve static files (CSS, JS, images, etc.) from the root directory
app.use(express.static(__dirname));

// Define routes for your HTML pages
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "about.html"));
});

app.get("/services", (req, res) => {
  res.sendFile(path.join(__dirname, "services.html"));
});

app.get("/contact", (req, res) => {
  res.sendFile(path.join(__dirname, "contact.html"));
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
