const express = require("express");
const jwt = require("jsonwebtoken");
const db = require("../db/db");
const routeGame = express.Router();

const connection = db.getDB();

routeGame.post("/token", (req, res) => {
  const JWT_SECRET = process.env.JWT_SECRET;
  const token = jwt.sign({}, JWT_SECRET, { expiresIn: "1h" });

  res.json({ token });
});

routeGame.post("/api/games", (req, res) => {
  const { title } = req.body;
  const query = "INSERT INTO games (title) VALUES (?)";
  connection.query(query, [title], (err, result) => {
    if (err) {
      console.error("Error creating game:", err);
      res.status(500).json({ error: "Failed to create game" });
      return;
    }
    res.status(201).json({ id: result.insertId, title });
  });
});

routeGame.get("/api/games", (req, res) => {
  const query = "SELECT * FROM games";
  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching games:", err);
      res.status(500).json({ error: "Failed to fetch games" });
      return;
    }
    res.json(results);
  });
});

routeGame.get("/api/games/:id", (req, res) => {
  const gameId = req.params.id;
  const query = "SELECT * FROM games WHERE id = ?";
  connection.query(query, [gameId], (err, results) => {
    if (err) {
      console.error("Error fetching game:", err);
      res.status(500).json({ error: "Failed to fetch game" });
      return;
    }
    if (results.length === 0) {
      res.status(404).json({ error: "Game not found" });
      return;
    }
    res.json(results[0]);
  });
});

routeGame.put("/api/games/:id", (req, res) => {
  const gameId = req.params.id;
  const { title } = req.body;
  const query = "UPDATE games SET title = ? WHERE id = ?";
  connection.query(query, [title, gameId], (err, result) => {
    if (err) {
      console.error("Error updating game:", err);
      res.status(500).json({ error: "Failed to update game" });
      return;
    }
    if (result.affectedRows === 0) {
      res.status(404).json({ error: "Game not found" });
      return;
    }
    res.json({ id: gameId, title });
  });
});

routeGame.delete("/api/games/:id", (req, res) => {
  const gameId = req.params.id;
  const query = "DELETE FROM games WHERE id = ?";
  connection.query(query, [gameId], (err, result) => {
    if (err) {
      console.error("Error deleting game:", err);
      res.status(500).json({ error: "Failed to delete game" });
      return;
    }
    if (result.affectedRows === 0) {
      res.status(404).json({ error: "Game not found" });
      return;
    }
    res.json({ message: "Game deleted successfully" });
  });
});

module.exports = { routeGame };
