## Database Setup

Create the database:

```sql
CREATE DATABASE expense_tracker;
```

Connect to the database:

```sql
\c expense_tracker
```

Run the setup script:

```bash
psql -U postgres -d expense_tracker -f database.sql
```

The script creates:

- categories table
- expenses table
- default expense categories
- sample expense records

---

## Environment Variables

Create a file named:

```text
server/.env
```

Example:

```env
DB_USER=postgres
DB_PASSWORD=your_password_here
DB_HOST=localhost
DB_PORT=5432
DB_NAME=expense_tracker
```

---

## Installing Dependencies

### Frontend

```bash
cd client
npm install
```

### Backend

```bash
cd server
npm install
```

---

## Running the Application

### Start Backend

Open Terminal 1:

```bash
cd server
node server.js
```

Expected output:

```text
Server running on port 5000
```

---

### Start Frontend

Open Terminal 2:

```bash
cd client
npm run dev
```

Expected output:

```text
Local: http://localhost:5173
```

---

### Open The Application

Navigate to:

```text
http://localhost:5173
```

---