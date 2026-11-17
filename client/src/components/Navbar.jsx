import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar-custom">
      <div className="navbar-title">Expense Tracker</div>

      <div style={{ marginTop: "10px" }}>
        <Link to="/" style={linkStyle}>
          Dashboard
        </Link>
        <Link to="/add" style={linkStyle}>
          Add Expense
        </Link>
        <Link to="/history" style={linkStyle}>
          History
        </Link>
        <Link to="/reports" style={linkStyle}>
          Reports
        </Link>
      </div>
    </nav>
  );
}

const linkStyle = {
  color: "white",
  marginRight: "20px",
  textDecoration: "none",
};

export default Navbar;
