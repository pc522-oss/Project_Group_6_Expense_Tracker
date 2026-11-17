const pool = require("./db");
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Expense Tracker API Running");
});
app.get("/api/test-db", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM categories");

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Database connection failed",
    });
  }
});

app.post("/api/expenses", async (req, res) => {
  try {
    const { amount, category, description, date } = req.body;

    const result = await pool.query(
      `
      INSERT INTO expenses
      (amount, category, description, expense_date)
      VALUES ($1, $2, $3, $4)
      RETURNING *
      `,
      [amount, category, description, date],
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Failed to create expense",
    });
  }
});

app.post("/api/expenses", async (req, res) => {
  try {
    const { amount, category, description, date } = req.body;

    const result = await pool.query(
      `
      INSERT INTO expenses
      (amount, category, description, expense_date)
      VALUES ($1, $2, $3, $4)
      RETURNING *
      `,
      [amount, category, description, date],
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: "Failed to create expense",
    });
  }
});

app.get("/api/expenses", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM expenses ORDER BY id DESC");

    res.json(result.rows);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: "Failed to fetch expenses",
    });
  }
});

app.put("/api/expenses/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const { amount, category, description, expense_date } = req.body;

    const result = await pool.query(
      `
      UPDATE expenses
      SET
        amount = $1,
        category = $2,
        description = $3,
        expense_date = $4
      WHERE id = $5
      RETURNING *
      `,
      [amount, category, description, expense_date, id],
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: "Update failed",
    });
  }
});

app.delete("/api/expenses/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await pool.query("DELETE FROM expenses WHERE id = $1", [id]);

    res.json({
      success: true,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: "Failed to delete expense",
    });
  }
});
app.listen(5000, () => {
  console.log("Server running on port 5000");
});
