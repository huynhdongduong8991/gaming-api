require("dotenv").config();
const express = require("express");
const app = express();
const authenticateJWT = require("./middleware/middleware");
const db = require("./db/db");
const { routeGame } = require("./routes/games");
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use("/api", authenticateJWT);

// Connect DB
db.run();

// Routes
app.use(routeGame);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
