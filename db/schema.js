// Database schema and sample data for SQL Interview Mastery
export function initializeDatabase(db) {
  // ======== EMPLOYEES TABLE ========
  db.run(`CREATE TABLE employees (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    department_id INTEGER,
    salary REAL,
    hire_date TEXT,
    manager_id INTEGER,
    email TEXT,
    age INTEGER,
    city TEXT
  )`);

  const employees = [
    [1, 'Alice Johnson', 1, 90000, '2019-03-15', null, 'alice@company.com', 34, 'New York'],
    [2, 'Bob Smith', 1, 85000, '2020-01-10', 1, 'bob@company.com', 29, 'New York'],
    [3, 'Charlie Brown', 2, 78000, '2018-07-22', null, 'charlie@company.com', 42, 'San Francisco'],
    [4, 'Diana Prince', 2, 92000, '2017-05-01', 3, 'diana@company.com', 37, 'San Francisco'],
    [5, 'Eve Davis', 3, 65000, '2021-09-30', null, 'eve@company.com', 26, 'Chicago'],
    [6, 'Frank Miller', 3, 72000, '2020-11-15', 5, 'frank@company.com', 31, 'Chicago'],
    [7, 'Grace Lee', 1, 95000, '2016-02-28', 1, 'grace@company.com', 45, 'New York'],
    [8, 'Henry Wilson', 4, 88000, '2019-08-05', null, 'henry@company.com', 38, 'Boston'],
    [9, 'Ivy Chen', 4, 70000, '2022-01-20', 8, 'ivy@company.com', 25, 'Boston'],
    [10, 'Jack Brown', 2, 82000, '2019-04-12', 3, 'jack@company.com', 33, 'San Francisco'],
    [11, 'Karen White', 5, 110000, '2015-01-01', null, 'karen@company.com', 48, 'Seattle'],
    [12, 'Leo Martinez', 5, 98000, '2018-06-15', 11, 'leo@company.com', 36, 'Seattle'],
    [13, 'Mia Taylor', 1, 75000, '2021-03-22', 1, 'mia@company.com', 27, 'New York'],
    [14, 'Noah Anderson', 3, 68000, '2022-07-10', 5, 'noah@company.com', 24, 'Chicago'],
    [15, 'Olivia Thomas', 2, 87000, '2020-02-14', 3, 'olivia@company.com', 32, 'San Francisco'],
    [16, 'Peter Jackson', 4, 91000, '2017-11-30', 8, 'peter@company.com', 40, 'Boston'],
    [17, 'Quinn Harris', 5, 105000, '2016-09-05', 11, 'quinn@company.com', 43, 'Seattle'],
    [18, 'Rachel Green', 1, 80000, '2021-06-01', 1, 'rachel@company.com', 28, 'New York'],
    [19, 'Sam Wilson', 3, 62000, '2023-01-15', 5, 'sam@company.com', 23, 'Chicago'],
    [20, 'Tina Turner', 2, 95000, '2018-03-20', 3, 'tina@company.com', 39, 'San Francisco'],
  ];

  employees.forEach(e => {
    db.run(`INSERT INTO employees VALUES (?,?,?,?,?,?,?,?,?)`, e);
  });

  // ======== DEPARTMENTS TABLE ========
  db.run(`CREATE TABLE departments (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    location TEXT,
    budget REAL
  )`);

  const departments = [
    [1, 'Engineering', 'New York', 500000],
    [2, 'Marketing', 'San Francisco', 300000],
    [3, 'Sales', 'Chicago', 250000],
    [4, 'HR', 'Boston', 200000],
    [5, 'Finance', 'Seattle', 400000],
    [6, 'Legal', 'Austin', 150000],
  ];

  departments.forEach(d => {
    db.run(`INSERT INTO departments VALUES (?,?,?,?)`, d);
  });

  // ======== SALARIES TABLE (historical) ========
  db.run(`CREATE TABLE salaries (
    id INTEGER PRIMARY KEY,
    emp_id INTEGER,
    salary REAL,
    from_date TEXT,
    to_date TEXT
  )`);

  const salaries = [
    [1, 1, 70000, '2019-03-15', '2020-03-14'],
    [2, 1, 80000, '2020-03-15', '2021-03-14'],
    [3, 1, 90000, '2021-03-15', '9999-12-31'],
    [4, 2, 75000, '2020-01-10', '2021-01-09'],
    [5, 2, 85000, '2021-01-10', '9999-12-31'],
    [6, 3, 60000, '2018-07-22', '2019-07-21'],
    [7, 3, 70000, '2019-07-22', '2020-07-21'],
    [8, 3, 78000, '2020-07-22', '9999-12-31'],
    [9, 4, 85000, '2017-05-01', '2019-04-30'],
    [10, 4, 92000, '2019-05-01', '9999-12-31'],
    [11, 5, 55000, '2021-09-30', '2022-09-29'],
    [12, 5, 65000, '2022-09-30', '9999-12-31'],
    [13, 7, 85000, '2016-02-28', '2018-02-27'],
    [14, 7, 90000, '2018-02-28', '2020-02-27'],
    [15, 7, 95000, '2020-02-28', '9999-12-31'],
    [16, 11, 90000, '2015-01-01', '2017-12-31'],
    [17, 11, 100000, '2018-01-01', '2020-12-31'],
    [18, 11, 110000, '2021-01-01', '9999-12-31'],
  ];

  salaries.forEach(s => {
    db.run(`INSERT INTO salaries VALUES (?,?,?,?,?)`, s);
  });

  // ======== CUSTOMERS TABLE ========
  db.run(`CREATE TABLE customers (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT,
    city TEXT,
    country TEXT,
    signup_date TEXT,
    is_active INTEGER DEFAULT 1
  )`);

  const customers = [
    [1, 'John Doe', 'john@email.com', 'New York', 'USA', '2020-01-15', 1],
    [2, 'Jane Smith', 'jane@email.com', 'London', 'UK', '2020-03-22', 1],
    [3, 'Raj Patel', 'raj@email.com', 'Mumbai', 'India', '2019-11-05', 1],
    [4, 'Maria Garcia', 'maria@email.com', 'Madrid', 'Spain', '2021-02-10', 0],
    [5, 'Yuki Tanaka', 'yuki@email.com', 'Tokyo', 'Japan', '2020-07-18', 1],
    [6, 'Hans Mueller', 'hans@email.com', 'Berlin', 'Germany', '2019-05-30', 1],
    [7, 'Sophie Martin', 'sophie@email.com', 'Paris', 'France', '2021-08-14', 1],
    [8, 'Ahmed Hassan', 'ahmed@email.com', 'Cairo', 'Egypt', '2020-12-01', 0],
    [9, 'Li Wei', 'li@email.com', 'Beijing', 'China', '2019-09-20', 1],
    [10, 'Emma Wilson', 'emma@email.com', 'Sydney', 'Australia', '2021-04-05', 1],
    [11, 'Carlos Silva', 'carlos@email.com', 'Sao Paulo', 'Brazil', '2020-06-25', 1],
    [12, 'Anna Kowalski', 'anna@email.com', 'Warsaw', 'Poland', '2021-11-12', 0],
  ];

  customers.forEach(c => {
    db.run(`INSERT INTO customers VALUES (?,?,?,?,?,?,?)`, c);
  });

  // ======== PRODUCTS TABLE ========
  db.run(`CREATE TABLE products (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    category TEXT,
    price REAL,
    stock INTEGER
  )`);

  const products = [
    [1, 'Laptop Pro', 'Electronics', 1299.99, 50],
    [2, 'Wireless Mouse', 'Electronics', 29.99, 200],
    [3, 'Desk Chair', 'Furniture', 349.99, 30],
    [4, 'Monitor 27"', 'Electronics', 449.99, 75],
    [5, 'Keyboard', 'Electronics', 79.99, 150],
    [6, 'Standing Desk', 'Furniture', 599.99, 20],
    [7, 'Webcam HD', 'Electronics', 69.99, 100],
    [8, 'Headphones', 'Electronics', 199.99, 80],
    [9, 'Book: SQL Guide', 'Books', 39.99, 500],
    [10, 'Book: Python', 'Books', 44.99, 400],
    [11, 'Mousepad XL', 'Accessories', 19.99, 300],
    [12, 'USB Hub', 'Electronics', 24.99, 120],
    [13, 'Cable Kit', 'Accessories', 14.99, 250],
    [14, 'Desk Lamp', 'Furniture', 89.99, 60],
    [15, 'Notebook Set', 'Accessories', 9.99, 800],
  ];

  products.forEach(p => {
    db.run(`INSERT INTO products VALUES (?,?,?,?,?)`, p);
  });

  // ======== ORDERS TABLE ========
  db.run(`CREATE TABLE orders (
    id INTEGER PRIMARY KEY,
    customer_id INTEGER,
    product_id INTEGER,
    quantity INTEGER,
    amount REAL,
    order_date TEXT,
    status TEXT DEFAULT 'completed'
  )`);

  const orders = [
    [1, 1, 1, 1, 1299.99, '2023-01-15', 'completed'],
    [2, 1, 2, 2, 59.98, '2023-01-15', 'completed'],
    [3, 2, 3, 1, 349.99, '2023-02-10', 'completed'],
    [4, 3, 1, 1, 1299.99, '2023-02-20', 'completed'],
    [5, 3, 5, 1, 79.99, '2023-02-20', 'completed'],
    [6, 5, 4, 2, 899.98, '2023-03-05', 'completed'],
    [7, 1, 8, 1, 199.99, '2023-03-18', 'completed'],
    [8, 6, 6, 1, 599.99, '2023-04-01', 'completed'],
    [9, 2, 9, 3, 119.97, '2023-04-15', 'cancelled'],
    [10, 7, 1, 1, 1299.99, '2023-05-02', 'completed'],
    [11, 3, 7, 2, 139.98, '2023-05-10', 'completed'],
    [12, 9, 10, 1, 44.99, '2023-05-22', 'completed'],
    [13, 1, 4, 1, 449.99, '2023-06-01', 'completed'],
    [14, 10, 2, 3, 89.97, '2023-06-15', 'completed'],
    [15, 5, 8, 1, 199.99, '2023-06-30', 'returned'],
    [16, 11, 1, 2, 2599.98, '2023-07-10', 'completed'],
    [17, 6, 3, 1, 349.99, '2023-07-25', 'completed'],
    [18, 2, 5, 2, 159.98, '2023-08-05', 'completed'],
    [19, 7, 11, 5, 99.95, '2023-08-20', 'completed'],
    [20, 3, 12, 1, 24.99, '2023-09-01', 'completed'],
    [21, 1, 6, 1, 599.99, '2023-09-15', 'completed'],
    [22, 9, 14, 2, 179.98, '2023-10-01', 'completed'],
    [23, 4, 2, 1, 29.99, '2023-10-15', 'cancelled'],
    [24, 10, 1, 1, 1299.99, '2023-11-01', 'completed'],
    [25, 5, 15, 10, 99.90, '2023-11-15', 'completed'],
    [26, 8, 13, 3, 44.97, '2023-12-01', 'completed'],
    [27, 11, 4, 1, 449.99, '2023-12-10', 'completed'],
    [28, 2, 7, 1, 69.99, '2023-12-20', 'completed'],
    [29, 6, 9, 2, 79.98, '2024-01-05', 'completed'],
    [30, 1, 10, 1, 44.99, '2024-01-15', 'completed'],
  ];

  orders.forEach(o => {
    db.run(`INSERT INTO orders VALUES (?,?,?,?,?,?,?)`, o);
  });

  // ======== STUDENTS TABLE ========
  db.run(`CREATE TABLE students (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    grade INTEGER,
    score REAL,
    department TEXT,
    enrollment_date TEXT
  )`);

  const students = [
    [1, 'Alice', '10', 92.5, 'Science', '2022-08-01'],
    [2, 'Bob', '10', 85.0, 'Science', '2022-08-01'],
    [3, 'Charlie', '11', 78.3, 'Arts', '2021-08-01'],
    [4, 'Diana', '11', 95.0, 'Science', '2021-08-01'],
    [5, 'Eve', '10', 88.7, 'Arts', '2022-08-01'],
    [6, 'Frank', '12', 72.1, 'Commerce', '2020-08-01'],
    [7, 'Grace', '12', 91.0, 'Science', '2020-08-01'],
    [8, 'Henry', '11', 67.5, 'Commerce', '2021-08-01'],
    [9, 'Ivy', '10', 94.2, 'Science', '2022-08-01'],
    [10, 'Jack', '12', 83.0, 'Arts', '2020-08-01'],
    [11, 'Karen', '11', 76.8, 'Commerce', '2021-08-01'],
    [12, 'Leo', '12', 89.5, 'Science', '2020-08-01'],
  ];

  students.forEach(s => {
    db.run(`INSERT INTO students VALUES (?,?,?,?,?,?)`, s);
  });

  // ======== COURSES TABLE ========
  db.run(`CREATE TABLE courses (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    department TEXT,
    credits INTEGER,
    instructor TEXT
  )`);

  const courses = [
    [1, 'Database Systems', 'CS', 4, 'Dr. Smith'],
    [2, 'Algorithms', 'CS', 4, 'Dr. Johnson'],
    [3, 'Web Development', 'CS', 3, 'Prof. Lee'],
    [4, 'Statistics', 'Math', 3, 'Dr. Chen'],
    [5, 'Linear Algebra', 'Math', 4, 'Prof. Kumar'],
    [6, 'Machine Learning', 'CS', 4, 'Dr. Wilson'],
    [7, 'Data Structures', 'CS', 4, 'Dr. Smith'],
    [8, 'Calculus', 'Math', 4, 'Prof. Kumar'],
  ];

  courses.forEach(c => {
    db.run(`INSERT INTO courses VALUES (?,?,?,?,?)`, c);
  });

  // ======== ENROLLMENTS TABLE ========
  db.run(`CREATE TABLE enrollments (
    student_id INTEGER,
    course_id INTEGER,
    grade TEXT,
    semester TEXT,
    PRIMARY KEY (student_id, course_id)
  )`);

  const enrollments = [
    [1, 1, 'A', 'Fall 2023'], [1, 2, 'A', 'Fall 2023'], [1, 4, 'B', 'Spring 2024'],
    [2, 1, 'B', 'Fall 2023'], [2, 3, 'A', 'Spring 2024'],
    [3, 2, 'C', 'Fall 2023'], [3, 5, 'B', 'Fall 2023'],
    [4, 1, 'A', 'Fall 2023'], [4, 6, 'A', 'Spring 2024'], [4, 2, 'A', 'Spring 2024'],
    [5, 3, 'B', 'Fall 2023'], [5, 4, 'A', 'Fall 2023'],
    [6, 7, 'B', 'Fall 2023'],
    [7, 1, 'A', 'Fall 2023'], [7, 6, 'B', 'Spring 2024'],
    [8, 5, 'C', 'Fall 2023'],
    [9, 1, 'A', 'Fall 2023'], [9, 2, 'A', 'Fall 2023'], [9, 7, 'A', 'Fall 2023'],
    [10, 3, 'B', 'Fall 2023'],
  ];

  enrollments.forEach(e => {
    db.run(`INSERT INTO enrollments VALUES (?,?,?,?)`, e);
  });

  // ======== TRANSACTIONS TABLE ========
  db.run(`CREATE TABLE transactions (
    id INTEGER PRIMARY KEY,
    account_id INTEGER,
    type TEXT,
    amount REAL,
    transaction_date TEXT,
    description TEXT
  )`);

  const transactions = [
    [1, 1001, 'credit', 5000.00, '2024-01-05', 'Salary'],
    [2, 1001, 'debit', 200.00, '2024-01-10', 'Groceries'],
    [3, 1001, 'debit', 500.00, '2024-01-15', 'Rent'],
    [4, 1002, 'credit', 7000.00, '2024-01-05', 'Salary'],
    [5, 1002, 'debit', 1000.00, '2024-01-12', 'Shopping'],
    [6, 1001, 'credit', 200.00, '2024-01-20', 'Refund'],
    [7, 1003, 'credit', 4000.00, '2024-01-05', 'Salary'],
    [8, 1003, 'debit', 150.00, '2024-01-08', 'Utilities'],
    [9, 1002, 'debit', 300.00, '2024-01-25', 'Dining'],
    [10, 1001, 'debit', 100.00, '2024-02-01', 'Transport'],
    [11, 1003, 'credit', 500.00, '2024-02-05', 'Bonus'],
    [12, 1002, 'credit', 7000.00, '2024-02-05', 'Salary'],
    [13, 1001, 'credit', 5000.00, '2024-02-05', 'Salary'],
    [14, 1003, 'debit', 2000.00, '2024-02-10', 'Insurance'],
    [15, 1001, 'debit', 350.00, '2024-02-15', 'Shopping'],
  ];

  transactions.forEach(t => {
    db.run(`INSERT INTO transactions VALUES (?,?,?,?,?,?)`, t);
  });

  // ======== WEATHER TABLE (for interesting queries) ========
  db.run(`CREATE TABLE weather (
    id INTEGER PRIMARY KEY,
    city TEXT,
    date TEXT,
    temperature REAL,
    humidity INTEGER
  )`);

  const weather = [
    [1, 'New York', '2024-01-01', 2.5, 65],
    [2, 'New York', '2024-01-02', 3.1, 70],
    [3, 'New York', '2024-01-03', 1.8, 60],
    [4, 'New York', '2024-01-04', 4.2, 72],
    [5, 'New York', '2024-01-05', 3.5, 68],
    [6, 'San Francisco', '2024-01-01', 12.0, 55],
    [7, 'San Francisco', '2024-01-02', 11.5, 58],
    [8, 'San Francisco', '2024-01-03', 13.2, 52],
    [9, 'San Francisco', '2024-01-04', 12.8, 50],
    [10, 'San Francisco', '2024-01-05', 14.0, 48],
  ];

  weather.forEach(w => {
    db.run(`INSERT INTO weather VALUES (?,?,?,?,?)`, w);
  });

  // ======== BONUSES TABLE (LeetCode 577 — Employee Bonus) ========
  db.run(`CREATE TABLE bonuses (
    emp_id INTEGER PRIMARY KEY,
    bonus INTEGER
  )`);
  const bonuses = [
    [1, 1000],
    [3, 500],
    [5, 2000],
    [7, 150],
  ];
  bonuses.forEach(b => db.run(`INSERT INTO bonuses VALUES (?,?)`, b));

  // ======== ACTIVITIES TABLE (LeetCode 1141 — User Activity Past 30 Days) ========
  db.run(`CREATE TABLE activities (
    activity_id INTEGER PRIMARY KEY,
    user_id INTEGER,
    session_id INTEGER,
    activity_date TEXT,
    activity_type TEXT
  )`);
  const activities = [
    [1, 1, 101, '2019-07-20', 'open_session'],
    [2, 1, 101, '2019-07-20', 'scroll_down'],
    [3, 1, 101, '2019-07-20', 'end_session'],
    [4, 2, 102, '2019-07-21', 'open_session'],
    [5, 2, 102, '2019-07-21', 'send_message'],
    [6, 2, 102, '2019-07-21', 'end_session'],
    [7, 3, 103, '2019-07-22', 'open_session'],
    [8, 3, 103, '2019-07-22', 'scroll_down'],
    [9, 4, 104, '2019-06-25', 'open_session'],
    [10, 4, 104, '2019-06-25', 'end_session'],
    [11, 5, 105, '2019-07-18', 'open_session'],
    [12, 5, 105, '2019-07-18', 'scroll_down'],
    [13, 5, 106, '2019-07-20', 'open_session'],
    [14, 6, 107, '2019-07-23', 'open_session'],
    [15, 6, 107, '2019-07-23', 'send_message'],
  ];
  activities.forEach(a => db.run(`INSERT INTO activities VALUES (?,?,?,?,?)`, a));

  // ======== DELIVERY TABLE (LeetCode 1174 — Immediate Food Delivery II) ========
  db.run(`CREATE TABLE delivery (
    delivery_id INTEGER PRIMARY KEY,
    customer_id INTEGER,
    order_date TEXT,
    customer_pref_delivery_date TEXT
  )`);
  const delivery = [
    [1, 1, '2019-08-01', '2019-08-02'],
    [2, 2, '2019-08-02', '2019-08-02'],
    [3, 1, '2019-08-11', '2019-08-12'],
    [4, 3, '2019-08-24', '2019-08-24'],
    [5, 3, '2019-08-21', '2019-08-22'],
    [6, 2, '2019-08-11', '2019-08-13'],
    [7, 4, '2019-08-09', '2019-08-09'],
    [8, 5, '2019-08-15', '2019-08-16'],
    [9, 5, '2019-08-20', '2019-08-20'],
    [10, 6, '2019-08-14', '2019-08-14'],
  ];
  delivery.forEach(d => db.run(`INSERT INTO delivery VALUES (?,?,?,?)`, d));

  // ======== PATIENTS TABLE (LeetCode 1527 — Patients With a Condition) ========
  db.run(`CREATE TABLE patients (
    patient_id INTEGER PRIMARY KEY,
    patient_name TEXT,
    conditions TEXT
  )`);
  const patients = [
    [1, 'Daniel', 'YFEV COUGH'],
    [2, 'Alice', ''],
    [3, 'Bob', 'DIAB100 MYOP'],
    [4, 'George', 'ACNE DIAB100'],
    [5, 'Alain', 'DIAB201'],
    [6, 'Emma', 'TYPHO DIAB100'],
    [7, 'James', 'MYOP'],
    [8, 'Laura', 'PREDIAB'],
    [9, 'Sandra', 'DIAB100'],
    [10, 'Tom', 'HYPERLIPIDEMIA'],
  ];
  patients.forEach(p => db.run(`INSERT INTO patients VALUES (?,?,?)`, p));

  // ======== FOLLOWERS TABLE (LeetCode 1729 — Find Followers Count) ========
  db.run(`CREATE TABLE followers (
    user_id INTEGER,
    follower_id INTEGER,
    PRIMARY KEY (user_id, follower_id)
  )`);
  const followers = [
    [0, 1], [0, 2], [2, 0], [3, 1],
    [3, 2], [3, 4], [4, 3], [5, 2],
    [5, 3], [6, 1], [6, 2], [6, 3],
  ];
  followers.forEach(f => db.run(`INSERT INTO followers VALUES (?,?)`, f));

  // ======== TRIANGLES TABLE (LeetCode 610 — Triangle Judgement) ========
  db.run(`CREATE TABLE triangles (
    x INTEGER,
    y INTEGER,
    z INTEGER
  )`);
  const triangles = [
    [13, 15, 30],
    [10, 20, 15],
    [3, 4, 5],
    [5, 5, 5],
    [1, 1, 3],
    [7, 24, 25],
    [6, 8, 10],
  ];
  triangles.forEach(t => db.run(`INSERT INTO triangles VALUES (?,?,?)`, t));

  // ======== SIGNUPS TABLE (LeetCode 1934 — Confirmation Rate) ========
  db.run(`CREATE TABLE signups (
    user_id INTEGER PRIMARY KEY,
    time_stamp TEXT
  )`);
  const signups = [
    [3, '2020-03-21 10:16:13'],
    [7, '2020-01-04 13:57:59'],
    [2, '2020-07-29 23:09:44'],
    [6, '2020-12-09 10:39:31'],
    [5, '2021-01-14 09:22:11'],
    [1, '2020-05-18 11:20:00'],
  ];
  signups.forEach(s => db.run(`INSERT INTO signups VALUES (?,?)`, s));

  // ======== CONFIRMATIONS TABLE (LeetCode 1934 — Confirmation Rate) ========
  db.run(`CREATE TABLE confirmations (
    user_id INTEGER,
    time_stamp TEXT,
    action TEXT
  )`);
  const confirmations = [
    [3, '2021-01-06 03:30:46', 'timeout'],
    [3, '2021-07-14 14:00:00', 'timeout'],
    [7, '2021-06-12 11:57:29', 'confirmed'],
    [7, '2021-06-13 12:58:28', 'confirmed'],
    [2, '2021-01-22 00:00:00', 'confirmed'],
    [2, '2021-02-28 23:59:59', 'timeout'],
    [6, '2021-02-24 15:15:52', 'timeout'],
    [6, '2021-08-15 10:30:00', 'confirmed'],
    [5, '2021-03-10 08:00:00', 'timeout'],
    [1, '2021-04-01 09:00:00', 'confirmed'],
    [1, '2021-05-01 10:00:00', 'confirmed'],
    [1, '2021-06-01 11:00:00', 'timeout'],
  ];
  confirmations.forEach(c => db.run(`INSERT INTO confirmations VALUES (?,?,?)`, c));

  // ======== ACTORS_DIRECTORS TABLE (LeetCode 1136) ========
  db.run(`CREATE TABLE actors_directors (
    actor_id INTEGER,
    director_id INTEGER,
    timestamp INTEGER
  )`);
  const actorsDirectors = [
    [1, 1, 0], [1, 1, 1], [1, 1, 2],
    [1, 2, 3], [1, 2, 4], [2, 1, 5],
    [2, 1, 6], [2, 3, 7], [3, 4, 8],
    [4, 4, 9], [4, 4, 10], [4, 4, 11],
  ];
  actorsDirectors.forEach(a => db.run(`INSERT INTO actors_directors VALUES (?,?,?)`, a));

  // ======== GAME_PLAY TABLE (LeetCode 1179-1181 — Game Play Analysis) ========
  db.run(`CREATE TABLE game_play (
    player_id INTEGER,
    device_id INTEGER,
    event_date TEXT,
    games_played INTEGER
  )`);
  const gamePlays = [
    [1, 2, '2016-03-01', 5],
    [1, 2, '2016-05-02', 6],
    [2, 3, '2017-06-25', 1],
    [3, 1, '2016-03-02', 0],
    [3, 4, '2018-07-03', 5],
    [4, 5, '2017-01-10', 3],
    [4, 5, '2017-01-11', 4],
    [5, 6, '2018-09-05', 2],
  ];
  gamePlays.forEach(g => db.run(`INSERT INTO game_play VALUES (?,?,?,?)`, g));

  // ======== FOOTBALL_TEAMS TABLE (LeetCode 1339) ========
  db.run(`CREATE TABLE football_teams (
    team_id INTEGER PRIMARY KEY,
    team_name TEXT
  )`);
  const footballTeams = [
    [10, 'Leetcode FC'],
    [20, 'NewYork FC'],
    [30, 'Atlanta FC'],
    [40, 'Chicago FC'],
    [50, 'Toronto FC'],
  ];
  footballTeams.forEach(t => db.run(`INSERT INTO football_teams VALUES (?,?)`, t));

  // ======== FOOTBALL_MATCHES TABLE (LeetCode 1339) ========
  db.run(`CREATE TABLE football_matches (
    match_id INTEGER PRIMARY KEY,
    host_team INTEGER,
    guest_team INTEGER,
    host_goals INTEGER,
    guest_goals INTEGER
  )`);
  const footballMatches = [
    [1, 10, 20, 3, 0],
    [2, 30, 10, 2, 2],
    [3, 10, 50, 5, 1],
    [4, 20, 30, 1, 0],
    [5, 50, 30, 1, 0],
    [6, 40, 20, 0, 2],
    [7, 40, 50, 1, 1],
    [8, 30, 40, 3, 2],
  ];
  footballMatches.forEach(m => db.run(`INSERT INTO football_matches VALUES (?,?,?,?,?)`, m));

  // ======== EMPLOYEE_TIME TABLE (LeetCode 1892) ========
  db.run(`CREATE TABLE employee_time (
    emp_id INTEGER,
    event_day TEXT,
    in_time INTEGER,
    out_time INTEGER
  )`);
  const employeeTimes = [
    [1, '2020-11-28', 4, 32],
    [1, '2020-11-28', 55, 200],
    [1, '2020-12-03', 1, 42],
    [2, '2020-11-28', 3, 33],
    [2, '2020-12-09', 47, 74],
    [2, '2020-12-09', 56, 86],
    [3, '2020-12-01', 10, 100],
    [3, '2020-12-01', 110, 200],
  ];
  employeeTimes.forEach(e => db.run(`INSERT INTO employee_time VALUES (?,?,?,?)`, e));

  // ======== CALLS TABLE (LeetCode 1842) ========
  db.run(`CREATE TABLE calls (
    from_id INTEGER,
    to_id INTEGER,
    duration INTEGER
  )`);
  const callData = [
    [1, 2, 59],
    [2, 1, 11],
    [1, 3, 20],
    [3, 4, 100],
    [3, 4, 200],
    [3, 4, 200],
    [4, 3, 499],
    [5, 6, 60],
    [6, 5, 60],
    [5, 7, 80],
  ];
  callData.forEach(c => db.run(`INSERT INTO calls VALUES (?,?,?)`, c));

  // ======== VISITS TABLE (LeetCode 1852) ========
  db.run(`CREATE TABLE visits (
    user_id INTEGER,
    visit_date TEXT
  )`);
  const visitData = [
    [1, '2020-11-28'],
    [1, '2020-10-20'],
    [1, '2020-12-03'],
    [2, '2020-10-05'],
    [2, '2020-12-09'],
    [3, '2020-11-11'],
    [3, '2020-12-01'],
    [3, '2020-12-31'],
    [4, '2021-01-01'],
    [4, '2021-01-15'],
    [4, '2021-02-01'],
  ];
  visitData.forEach(v => db.run(`INSERT INTO visits VALUES (?,?)`, v));

  // ======== WAREHOUSE TABLE (LeetCode 1718) ========
  db.run(`CREATE TABLE warehouse (
    name TEXT,
    product_id INTEGER,
    units INTEGER
  )`);
  const warehouseData = [
    ['LCHouse1', 1, 1],
    ['LCHouse1', 2, 10],
    ['LCHouse1', 3, 5],
    ['LCHouse2', 1, 2],
    ['LCHouse2', 2, 2],
    ['LCHouse3', 4, 1],
    ['LCHouse4', 5, 5],
    ['LCHouse4', 3, 2],
  ];
  warehouseData.forEach(w => db.run(`INSERT INTO warehouse VALUES (?,?,?)`, w));
}
