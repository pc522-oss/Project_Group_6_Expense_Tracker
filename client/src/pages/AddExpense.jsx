import { useState } from "react";
import axios from "axios";

function AddExpense() {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async () => {
    const newExpense = {
      amount,
      category,
      date,
      description,
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/api/expenses",
        newExpense,
      );

      console.log(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="page">
      <h1>Add Expense</h1>

      <div className="create-card">
        <input
          className="form-control"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <select
          className="form-control"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option>Food</option>
          <option>Transportation</option>
          <option>Utilities</option>
          <option>Entertainment</option>
          <option>Shopping</option>
          <option>Other</option>
        </select>

        <input
          type="date"
          className="form-control"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <input
          className="form-control"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button className="btn-primary" onClick={handleSubmit}>
          Save Expense
        </button>
      </div>
    </div>
  );
}

export default AddExpense;
