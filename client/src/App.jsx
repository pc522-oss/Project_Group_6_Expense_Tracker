import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import AddExpense from "./pages/AddExpense";
import ExpenseHistory from "./pages/ExpenseHistory";
import Reports from "./pages/Reports";
import Navbar from "./components/Navbar";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/add" element={<AddExpense />} />
        <Route path="/history" element={<ExpenseHistory />} />
        <Route path="/reports" element={<Reports />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
