-- =========================
-- Expense Tracker Database
-- Group 6
-- =========================

CREATE TABLE IF NOT EXISTS categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE
);

INSERT INTO categories (name)
VALUES
('Food'),
('Transportation'),
('Shopping'),
('Entertainment'),
('Utilities'),
('Other')
ON CONFLICT (name) DO NOTHING;


CREATE TABLE IF NOT EXISTS expenses (
    id SERIAL PRIMARY KEY,
    amount DECIMAL(10,2) NOT NULL,
    category VARCHAR(50) NOT NULL,
    description TEXT,
    expense_date DATE NOT NULL
);


INSERT INTO expenses
(amount, category, description, expense_date)
VALUES
(75.00, 'Food', 'Groceries', '2026-11-15'),
(45.00, 'Transportation', 'Gas Station', '2026-11-14')
ON CONFLICT DO NOTHING;