const express = require("express");
const path = require("path");
const app = express();

// Use Heroku's dynamic port or default to 3000 for local development
const port = process.env.PORT || 3000;

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

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
