import { useState, useEffect } from "react";
import axios from "axios";

function ExpenseHistory() {
  const [expenses, setExpenses] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");

  const [selectedCategory, setSelectedCategory] = useState("All Categories");

  const [sortOption, setSortOption] = useState("Date (Newest First)");

  const [editingExpense, setEditingExpense] = useState(null);

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/expenses");

      setExpenses(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const filteredExpenses = expenses
    .filter((expense) => {
      const matchesSearch = expense.description
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      const matchesCategory =
        selectedCategory === "All Categories" ||
        expense.category === selectedCategory;

      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortOption === "Highest Amount") {
        return b.amount - a.amount;
      }

      if (sortOption === "Lowest Amount") {
        return a.amount - b.amount;
      }

      if (sortOption === "Date (Newest First)") {
        return new Date(b.date) - new Date(a.date);
      }

      if (sortOption === "Date (Oldest First)") {
        return new Date(a.date) - new Date(b.date);
      }

      return 0;
    });

  const getCategoryClass = (category) => {
    switch (category) {
      case "Food":
        return "category-food";

      case "Transportation":
        return "category-transportation";

      case "Shopping":
        return "category-shopping";

      case "Entertainment":
        return "category-entertainment";

      case "Utilities":
        return "category-utilities";

      default:
        return "category-other";
    }
  };
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/expenses/${id}`);

      fetchExpenses();
    } catch (err) {
      console.error(err);
    }
  };
  const handleUpdate = async () => {
    try {
      await axios.put(
        `http://localhost:5000/api/expenses/${editingExpense.id}`,
        editingExpense,
      );

      setEditingExpense(null);

      fetchExpenses();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="page">
      <h1>Expense History</h1>

      <div className="create-card">
        <div className="filter-row">
          <input
            className="form-control"
            placeholder="Search expenses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <select
            className="form-control"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option>All Categories</option>
            <option>Food</option>
            <option>Transportation</option>
            <option>Shopping</option>
            <option>Entertainment</option>
            <option>Utilities</option>
            <option>Other</option>
          </select>

          <select
            className="form-control"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option>Sort By Date</option>
            <option>Date (Newest First)</option>
            <option>Date (Oldest First)</option>
            <option>Highest Amount</option>
            <option>Lowest Amount</option>
          </select>
        </div>

        <table className="expense-table">
          <thead>
            <tr>
              <th>Description</th>
              <th>Category</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredExpenses.map((expense) => (
              <tr key={expense.id}>
                <td>{expense.description}</td>

                <td>
                  <span
                    className={`category-badge ${getCategoryClass(expense.category)}`}
                  >
                    {expense.category}
                  </span>
                </td>

                <td>${expense.amount}</td>

                <td>{expense.expense_date?.substring(0, 10)}</td>

                <td>
                  <button
                    className="btn-edit-card"
                    onClick={() => setEditingExpense(expense)}
                  >
                    Edit
                  </button>

                  <button
                    className="btn-del-card"
                    style={{ marginLeft: "8px" }}
                    onClick={() => handleDelete(expense.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {editingExpense && (
        <div className="modal-overlay">
          <div className="edit-modal">
            <h2>Edit Expense</h2>

            <input
              className="form-control"
              value={editingExpense.amount}
              onChange={(e) =>
                setEditingExpense({
                  ...editingExpense,
                  amount: e.target.value,
                })
              }
            />

            <select
              className="form-control"
              value={editingExpense.category}
              onChange={(e) =>
                setEditingExpense({
                  ...editingExpense,
                  category: e.target.value,
                })
              }
            >
              <option>Food</option>
              <option>Transportation</option>
              <option>Shopping</option>
              <option>Entertainment</option>
              <option>Utilities</option>
              <option>Other</option>
            </select>

            <input
              type="date"
              className="form-control"
              value={editingExpense.expense_date?.substring(0, 10)}
              onChange={(e) =>
                setEditingExpense({
                  ...editingExpense,
                  expense_date: e.target.value,
                })
              }
            />

            <input
              className="form-control"
              value={editingExpense.description}
              onChange={(e) =>
                setEditingExpense({
                  ...editingExpense,
                  description: e.target.value,
                })
              }
            />

            <button className="btn-primary" onClick={handleUpdate}>
              Save Changes
            </button>

            <button
              className="btn-del-card"
              style={{ marginLeft: "10px" }}
              onClick={() => setEditingExpense(null)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ExpenseHistory;
