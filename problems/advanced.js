// LeetCode SQL Patterns - advanced.js
export const advanced = [
    {
        "id": "512",
        "title": "Game Play Analysis II",
        "difficulty": "easy",
        "description": "<p>Table: <code>Activity</code></p>\\n\\n<pre>\\n+------------+------------+------------+--------------+\\n| player_id  | device_id  | event_date | games_played |\\n+------------+------------+------------+--------------+\\n| int        | int        | date       | int          |\\n+------------+------------+------------+--------------+\\n</pre>\\n\\n<p>&nbsp;</p>\\n\\n<p>Report the <strong>device</strong> that is first logged in for each player.</p>\\n\\n<p>The result format is in the following example.</p>\\n\\n<p>&nbsp;</p>\\n<p><strong class=\\\"example\\\">Example 1:</strong></p>\\n\\n<pre>\\n<strong>Input:</strong> \\nActivity table:\\n+-----------+-----------+------------+--------------+\\n| player_id | device_id | event_date | games_played |\\n+-----------+-----------+------------+--------------+\\n| 1         | 2         | 2016-03-01 | 5            |\\n| 1         | 2         | 2016-05-02 | 6            |\\n| 2         | 3         | 2017-06-25 | 1            |\\n| 3         | 1         | 2016-03-02 | 0            |\\n| 3         | 4         | 2018-07-03 | 5            |\\n+-----------+-----------+------------+--------------+\\n<strong>Output:</strong> \\n+-----------+-----------+\\n| player_id | device_id |\\n+-----------+-----------+\\n| 1         | 2         |\\n| 2         | 3         |\\n| 3         | 1         |\\n+-----------+-----------+\\n<strong>Explanation:</strong> \\nPlayer 1 first logged in on 2016-03-01 using device 2. Player 2 first logged in on 2017-06-25 using device 3. Player 3 first logged in on 2016-03-02 using device 1.\\n</pre>\\n",
        "schema": "Create table If Not Exists Activity (player_id int, device_id int, event_date date, games_played int)\nTruncate table Activity\ninsert into Activity (player_id, device_id, event_date, games_played) values ('1', '2', '2016-03-01', '5')\ninsert into Activity (player_id, device_id, event_date, games_played) values ('1', '2', '2016-05-02', '6')\ninsert into Activity (player_id, device_id, event_date, games_played) values ('2', '3', '2017-06-25', '1')\ninsert into Activity (player_id, device_id, event_date, games_played) values ('3', '1', '2016-03-02', '0')\ninsert into Activity (player_id, device_id, event_date, games_played) values ('3', '4', '2018-07-03', '5')",
        "slug": "game-play-analysis-ii",
        "originalCategory": "advanced"
    },
    {
        "id": "586",
        "title": "Customer Placing the Largest Number of Orders",
        "difficulty": "easy",
        "description": "<p>Table: <code>Orders</code></p>\n\n<pre>\n+-----------------+----------+\n| Column Name     | Type     |\n+-----------------+----------+\n| order_number    | int      |\n| customer_number | int      |\n+-----------------+----------+\norder_number is the primary key (column with unique values) for this table.\nThis table contains information about the order ID and the customer ID.\n</pre>\n\n<p>&nbsp;</p>\n\n<p>Write a solution to find the <code>customer_number</code> for the customer who has placed <strong>the largest number of orders</strong>.</p>\n\n<p>The test cases are generated so that <strong>exactly one customer</strong> will have placed more orders than any other customer.</p>\n\n<p>The result format is in the following example.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> \nOrders table:\n+--------------+-----------------+\n| order_number | customer_number |\n+--------------+-----------------+\n| 1            | 1               |\n| 2            | 2               |\n| 3            | 3               |\n| 4            | 3               |\n+--------------+-----------------+\n<strong>Output:</strong> \n+-----------------+\n| customer_number |\n+-----------------+\n| 3               |\n+-----------------+\n<strong>Explanation:</strong> \nThe customer with number 3 has two orders, which is greater than either customer 1 or 2 because each of them only has one order. \nSo the result is customer_number 3.\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Follow up:</strong> What if more than one customer has the largest number of orders, can you find all the <code>customer_number</code> in this case?</p>\n",
        "schema": "Create table If Not Exists orders (order_number int, customer_number int)\nTruncate table orders\ninsert into orders (order_number, customer_number) values ('1', '1')\ninsert into orders (order_number, customer_number) values ('2', '2')\ninsert into orders (order_number, customer_number) values ('3', '3')\ninsert into orders (order_number, customer_number) values ('4', '3')",
        "slug": "customer-placing-the-largest-number-of-orders",
        "originalCategory": "advanced"
    },
    {
        "id": "603",
        "title": "Consecutive Available Seats",
        "difficulty": "easy",
        "description": "<p>Table: <code>Cinema</code></p>\\n\\n<pre>\\n+------------+------------+\\n| seat_id    | free       |\\n+------------+------------+\\n| int        | bool       |\\n+------------+------------+\\n</pre>\\n\\n<p>&nbsp;</p>\\n\\n<p>Find all consecutive available seats in the cinema. Return the result table ordered by <code>seat_id</code> in ascending order. Two seats are considered consecutive if they have consecutive <code>seat_id</code>s and both are free (<code>free = 1</code>).</p>\\n\\n<p>The result format is in the following example.</p>\\n\\n<p>&nbsp;</p>\\n<p><strong class=\\\"example\\\">Example 1:</strong></p>\\n\\n<pre>\\n<strong>Input:</strong> \\nCinema table:\\n+---------+------+\\n| seat_id | free |\\n+---------+------+\\n| 1       | 1    |\\n| 2       | 0    |\\n| 3       | 1    |\\n| 4       | 1    |\\n| 5       | 1    |\\n+---------+------+\\n<strong>Output:</strong> \\n+---------+\\n| seat_id |\\n+---------+\\n| 3       |\\n| 4       |\\n| 5       |\\n+---------+\\n<strong>Explanation:</strong> \\nSeat 3, 4, and 5 are consecutive and free.\\n</pre>\\n",
        "schema": "Create table If Not Exists Cinema (seat_id int primary key auto_increment, free bool)\nTruncate table Cinema\ninsert into Cinema (seat_id, free) values ('1', '1')\ninsert into Cinema (seat_id, free) values ('2', '0')\ninsert into Cinema (seat_id, free) values ('3', '1')\ninsert into Cinema (seat_id, free) values ('4', '1')\ninsert into Cinema (seat_id, free) values ('5', '1')",
        "slug": "consecutive-available-seats",
        "originalCategory": "advanced"
    },
    {
        "id": "610",
        "title": "Triangle Judgement",
        "difficulty": "easy",
        "description": "<p>Table: <code>Triangle</code></p>\n\n<pre>\n+-------------+------+\n| Column Name | Type |\n+-------------+------+\n| x           | int  |\n| y           | int  |\n| z           | int  |\n+-------------+------+\nIn SQL, (x, y, z) is the primary key column for this table.\nEach row of this table contains the lengths of three line segments.\n</pre>\n\n<p>&nbsp;</p>\n\n<p>Report for every three line segments whether they can form a triangle.</p>\n\n<p>Return the result table in <strong>any order</strong>.</p>\n\n<p>The&nbsp;result format is in the following example.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> \nTriangle table:\n+----+----+----+\n| x  | y  | z  |\n+----+----+----+\n| 13 | 15 | 30 |\n| 10 | 20 | 15 |\n+----+----+----+\n<strong>Output:</strong> \n+----+----+----+----------+\n| x  | y  | z  | triangle |\n+----+----+----+----------+\n| 13 | 15 | 30 | No       |\n| 10 | 20 | 15 | Yes      |\n+----+----+----+----------+\n</pre>\n",
        "schema": "Create table If Not Exists Triangle (x int, y int, z int)\nTruncate table Triangle\ninsert into Triangle (x, y, z) values ('13', '15', '30')\ninsert into Triangle (x, y, z) values ('10', '20', '15')",
        "slug": "triangle-judgement",
        "originalCategory": "advanced"
    },
    {
        "id": "613",
        "title": "Shortest Distance in a Line",
        "difficulty": "easy",
        "description": "<p>Table: <code>Point</code></p>\\n\\n<pre>\\n+------------+\\n| x          |\\n+------------+\\n| int        |\\n+------------+\\n</pre>\\n\\n<p>&nbsp;</p>\\n\\n<p>Find the shortest distance between any two points in the <code>Point</code> table.</p>\\n\\n<p>The result format is in the following example.</p>\\n\\n<p>&nbsp;</p>\\n<p><strong class=\\\"example\\\">Example 1:</strong></p>\\n\\n<pre>\\n<strong>Input:</strong> \\nPoint table:\\n+------+\\n| x    |\\n+------+\\n| -1   |\\n| 0    |\\n| 2    |\\n+------+\\n<strong>Output:</strong> \\n+----------+\\n| shortest |\\n+----------+\\n| 1        |\\n+----------+\\n<strong>Explanation:</strong> \\nThe shortest distance is 1, between point -1 and 0.\\n</pre>\\n",
        "schema": "Create Table If Not Exists Point (x int not null)\nTruncate table Point\ninsert into Point (x) values ('-1')\ninsert into Point (x) values ('0')\ninsert into Point (x) values ('2')",
        "slug": "shortest-distance-in-a-line",
        "originalCategory": "advanced"
    },
    {
        "id": "1050",
        "title": "Actors and Directors Who Cooperated At Least Three Times",
        "difficulty": "easy",
        "description": "<p>Table: <code>ActorDirector</code></p>\n\n<pre>\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| actor_id    | int     |\n| director_id | int     |\n| timestamp   | int     |\n+-------------+---------+\ntimestamp is the primary key (column with unique values) for this table.\n</pre>\n\n<p>&nbsp;</p>\n\n<p>Write a solution to find all the pairs <code>(actor_id, director_id)</code> where the actor has cooperated with the director at least three times.</p>\n\n<p>Return the result table in <strong>any order</strong>.</p>\n\n<p>The result format is in the following example.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> \nActorDirector table:\n+-------------+-------------+-------------+\n| actor_id    | director_id | timestamp   |\n+-------------+-------------+-------------+\n| 1           | 1           | 0           |\n| 1           | 1           | 1           |\n| 1           | 1           | 2           |\n| 1           | 2           | 3           |\n| 1           | 2           | 4           |\n| 2           | 1           | 5           |\n| 2           | 1           | 6           |\n+-------------+-------------+-------------+\n<strong>Output:</strong> \n+-------------+-------------+\n| actor_id    | director_id |\n+-------------+-------------+\n| 1           | 1           |\n+-------------+-------------+\n<strong>Explanation:</strong> The only pair is (1, 1) where they cooperated exactly 3 times.\n</pre>\n",
        "schema": "Create table If Not Exists ActorDirector (actor_id int, director_id int, timestamp int)\nTruncate table ActorDirector\ninsert into ActorDirector (actor_id, director_id, timestamp) values ('1', '1', '0')\ninsert into ActorDirector (actor_id, director_id, timestamp) values ('1', '1', '1')\ninsert into ActorDirector (actor_id, director_id, timestamp) values ('1', '1', '2')\ninsert into ActorDirector (actor_id, director_id, timestamp) values ('1', '2', '3')\ninsert into ActorDirector (actor_id, director_id, timestamp) values ('1', '2', '4')\ninsert into ActorDirector (actor_id, director_id, timestamp) values ('2', '1', '5')\ninsert into ActorDirector (actor_id, director_id, timestamp) values ('2', '1', '6')",
        "slug": "actors-and-directors-who-cooperated-at-least-three-times",
        "originalCategory": "advanced"
    },
    {
        "id": "1303",
        "title": "Find the Team Size",
        "difficulty": "easy",
        "description": "<p>Table: <code>Employee</code></p>\\n\\n<pre>\\n+-------------+------------+\\n| employee_id | team_id    |\\n+-------------+------------+\\n| int         | int        |\\n+-------------+------------+\\n</pre>\\n\\n<p>&nbsp;</p>\\n\\n<p>Write a solution to find the team size of each of the employees. Return the result table in <strong>any order</strong>.</p>\\n\\n<p>The result format is in the following example.</p>\\n\\n<p>&nbsp;</p>\\n<p><strong class=\\\"example\\\">Example 1:</strong></p>\\n\\n<pre>\\n<strong>Input:</strong> \\nEmployee table:\\n+-------------+---------+\\n| employee_id | team_id |\\n+-------------+---------+\\n| 1           | 8       |\\n| 2           | 8       |\\n| 3           | 8       |\\n| 4           | 7       |\\n| 5           | 9       |\\n| 6           | 9       |\\n+-------------+---------+\\n<strong>Output:</strong> \\n+-------------+-----------+\\n| employee_id | team_size |\\n+-------------+-----------+\\n| 1           | 3         |\\n| 2           | 3         |\\n| 3           | 3         |\\n| 4           | 1         |\\n| 5           | 2         |\\n| 6           | 2         |\\n+-------------+-----------+\\n<strong>Explanation:</strong> \\nEmployees 1, 2, 3 are in team 8 (size 3). Employee 4 is in team 7 (size 1). Employees 5 and 6 are in team 9 (size 2).\\n</pre>\\n",
        "schema": "Create table If Not Exists Employee (employee_id int, team_id int)\nTruncate table Employee\ninsert into Employee (employee_id, team_id) values ('1', '8')\ninsert into Employee (employee_id, team_id) values ('2', '8')\ninsert into Employee (employee_id, team_id) values ('3', '8')\ninsert into Employee (employee_id, team_id) values ('4', '7')\ninsert into Employee (employee_id, team_id) values ('5', '9')\ninsert into Employee (employee_id, team_id) values ('6', '9')",
        "slug": "find-the-team-size",
        "originalCategory": "advanced"
    },
    {
        "id": "1350",
        "title": "Students With Invalid Departments",
        "difficulty": "easy",
        "description": "<p>Table: <code>Departments</code></p>\\n\\n<pre>\\n+------------+-------------+\\n| id         | name        |\\n+------------+-------------+\\n| int        | varchar(30) |\\n+------------+-------------+\\n</pre>\\n\\n<p>Table: <code>Students</code></p>\\n\\n<pre>\\n+------------+-------------+---------------+\\n| id         | name        | department_id |\\n+------------+-------------+---------------+\\n| int        | varchar(30) | int           |\\n+------------+-------------+---------------+\\n</pre>\\n\\n<p>&nbsp;</p>\\n\\n<p>Find the students who are enrolled in a department that no longer exists. Return the result table in <strong>any order</strong>.</p>\\n\\n<p>The result format is in the following example.</p>\\n\\n<p>&nbsp;</p>\\n<p><strong class=\\\"example\\\">Example 1:</strong></p>\\n\\n<pre>\\n<strong>Input:</strong> \\nDepartments table:\\n+------+--------------------------+\\n| id   | name                     |\\n+------+--------------------------+\\n| 1    | Electrical Engineering   |\\n| 7    | Computer Engineering     |\\n| 13   | Bussiness Administration |\\n+------+--------------------------+\\nStudents table:\\n+------+----------+---------------+\\n| id   | name     | department_id |\\n+------+----------+---------------+\\n| 23   | Alice    | 1             |\\n| 1    | Bob      | 7             |\\n| 5    | Jennifer | 13            |\\n| 2    | John     | 14            |\\n| 4    | Jasmine  | 77            |\\n| 3    | Steve    | 74            |\\n| 6    | Luis     | 1             |\\n| 8    | Jonathan | 7             |\\n| 7    | Daiana   | 33            |\\n| 11   | Madelynn | 1             |\\n+------+----------+---------------+\\n<strong>Output:</strong> \\n+------+---------+\\n| id   | name    |\\n+------+---------+\\n| 2    | John    |\\n| 4    | Jasmine |\\n| 3    | Steve   |\\n| 7    | Daiana  |\\n+------+---------+\\n<strong>Explanation:</strong> \\nThese students have department_ids that do not exist in the Departments table.\\n</pre>\\n",
        "schema": "Create table If Not Exists Departments (id int, name varchar(30))\nCreate table If Not Exists Students (id int, name varchar(30), department_id int)\nTruncate table Departments\ninsert into Departments (id, name) values ('1', 'Electrical Engineering')\ninsert into Departments (id, name) values ('7', 'Computer Engineering')\ninsert into Departments (id, name) values ('13', 'Bussiness Administration')\nTruncate table Students\ninsert into Students (id, name, department_id) values ('23', 'Alice', '1')\ninsert into Students (id, name, department_id) values ('1', 'Bob', '7')\ninsert into Students (id, name, department_id) values ('5', 'Jennifer', '13')\ninsert into Students (id, name, department_id) values ('2', 'John', '14')\ninsert into Students (id, name, department_id) values ('4', 'Jasmine', '77')\ninsert into Students (id, name, department_id) values ('3', 'Steve', '74')\ninsert into Students (id, name, department_id) values ('6', 'Luis', '1')\ninsert into Students (id, name, department_id) values ('8', 'Jonathan', '7')\ninsert into Students (id, name, department_id) values ('7', 'Daiana', '33')\ninsert into Students (id, name, department_id) values ('11', 'Madelynn', '1')",
        "slug": "students-with-invalid-departments",
        "originalCategory": "advanced"
    },
    {
        "id": "1407",
        "title": "Top Travellers",
        "difficulty": "easy",
        "description": "<p>Table: <code>Users</code></p>\n\n<pre>\n+---------------+---------+\n| Column Name   | Type    |\n+---------------+---------+\n| id            | int     |\n| name          | varchar |\n+---------------+---------+\nid is the column with unique values for this table.\nname is the name of the user.\n</pre>\n\n<p>&nbsp;</p>\n\n<p>Table: <code>Rides</code></p>\n\n<pre>\n+---------------+---------+\n| Column Name   | Type    |\n+---------------+---------+\n| id            | int     |\n| user_id       | int     |\n| distance      | int     |\n+---------------+---------+\nid is the column with unique values for this table.\nuser_id is the id of the user who traveled the distance &quot;distance&quot;.\n</pre>\n\n<p>&nbsp;</p>\n\n<p>Write a solution&nbsp;to report the distance traveled by each user.</p>\n\n<p>Return the result table ordered by <code>travelled_distance</code> in <strong>descending order</strong>, if two or more users traveled the same distance, order them by their <code>name</code> in <strong>ascending order</strong>.</p>\n\n<p>The&nbsp;result format is in the following example.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> \nUsers table:\n+------+-----------+\n| id   | name      |\n+------+-----------+\n| 1    | Alice     |\n| 2    | Bob       |\n| 3    | Alex      |\n| 4    | Donald    |\n| 7    | Lee       |\n| 13   | Jonathan  |\n| 19   | Elvis     |\n+------+-----------+\nRides table:\n+------+----------+----------+\n| id   | user_id  | distance |\n+------+----------+----------+\n| 1    | 1        | 120      |\n| 2    | 2        | 317      |\n| 3    | 3        | 222      |\n| 4    | 7        | 100      |\n| 5    | 13       | 312      |\n| 6    | 19       | 50       |\n| 7    | 7        | 120      |\n| 8    | 19       | 400      |\n| 9    | 7        | 230      |\n+------+----------+----------+\n<strong>Output:</strong> \n+----------+--------------------+\n| name     | travelled_distance |\n+----------+--------------------+\n| Elvis    | 450                |\n| Lee      | 450                |\n| Bob      | 317                |\n| Jonathan | 312                |\n| Alex     | 222                |\n| Alice    | 120                |\n| Donald   | 0                  |\n+----------+--------------------+\n<strong>Explanation:</strong> \nElvis and Lee traveled 450 miles, Elvis is the top traveler as his name is alphabetically smaller than Lee.\nBob, Jonathan, Alex, and Alice have only one ride and we just order them by the total distances of the ride.\nDonald did not have any rides, the distance traveled by him is 0.\n</pre>\n",
        "schema": "Create Table If Not Exists Users (id int, name varchar(30))\nCreate Table If Not Exists Rides (id int, user_id int, distance int)\nTruncate table Users\ninsert into Users (id, name) values ('1', 'Alice')\ninsert into Users (id, name) values ('2', 'Bob')\ninsert into Users (id, name) values ('3', 'Alex')\ninsert into Users (id, name) values ('4', 'Donald')\ninsert into Users (id, name) values ('7', 'Lee')\ninsert into Users (id, name) values ('13', 'Jonathan')\ninsert into Users (id, name) values ('19', 'Elvis')\nTruncate table Rides\ninsert into Rides (id, user_id, distance) values ('1', '1', '120')\ninsert into Rides (id, user_id, distance) values ('2', '2', '317')\ninsert into Rides (id, user_id, distance) values ('3', '3', '222')\ninsert into Rides (id, user_id, distance) values ('4', '7', '100')\ninsert into Rides (id, user_id, distance) values ('5', '13', '312')\ninsert into Rides (id, user_id, distance) values ('6', '19', '50')\ninsert into Rides (id, user_id, distance) values ('7', '7', '120')\ninsert into Rides (id, user_id, distance) values ('8', '19', '400')\ninsert into Rides (id, user_id, distance) values ('9', '7', '230')",
        "slug": "top-travellers",
        "editorial": `[TOC]

## Solution

--- 

### Overview

This is the type of question that you might want to slow down and pay attention to the details before writing: 

1. Since the question is asking for the distance travelled by each user and there may be users who have not travelled any distance, \`LEFT JOIN\` is needed so each user from the \`Users\` table will be included.

2. For those users who have not travelled, functions such as \`IFNULL()\` or \`COALESCE()\` are needed to return 0 instead of null for their total distance. The two functions are a little bit different, but for this question, they can be used interchangeably.

[IFNULL()](https://dev.mysql.com/doc/refman/5.7/en/flow-control-functions.html#function_ifnull): takes two arguments and returns the first one if it's not NULL or the second if the first one is NULL.

[COALESCE()](https://dev.mysql.com/doc/refman/5.7/en/comparison-operators.html#function_coalesce): takes two or more parameters and returns the first non-NULL parameter, or NULL if all parameters are NULL.

3. Since users might have the same name and \`id\` is the primary key for this table (which means the values in this column will be unique). We need to use \`id\` for \`GROUP BY\` to get the aggregated distance for each user. 

4. Don't forget to check the order required for the final output! This question requires two different types of order. 

### Approach: LEFT JOIN

#### Algorithm

1. Select the columns needed for the final output: \`name\` of the user, and the total \`distance\`; for users who do not have any rides, use \`IFNULL()\` or \`COALESCE()\` to return 0 for their distance
2. \`JOIN\` the two tables by user \`id\`
3. \`GROUP\` the result by \`id\` so each user has only one aggregated total distance. It's important to use \`id\` instead of \`name\` so the users with the same names will not be merged
4. \`ORDER\` the result by the 2nd column in descending order and the 1st column in ascending order per requested

#### Implementation

##### MySQL

\`\`\`sql
SELECT 
    u.name, 
    IFNULL(SUM(distance),0) AS travelled_distance
FROM 
    Users u
LEFT JOIN 
    Rides r
ON 
    u.id = r.user_id
GROUP BY 
    u.id
ORDER BY 2 DESC, 1 ASC
\`\`\`

-----`,
        "originalCategory": "advanced"
    },
    {
        "id": "1495",
        "title": "Friendly Movies Streamed Last Month",
        "difficulty": "easy",
        "description": "<p>Table: <code>TVProgram</code></p>\\n\\n<pre>\\n+--------------+------------+-------------+\\n| program_date | content_id | channel     |\\n+--------------+------------+-------------+\\n| date         | int        | varchar(30) |\\n+--------------+------------+-------------+\\n</pre>\\n\\n<p>Table: <code>Content</code></p>\\n\\n<pre>\\n+-------------+-------------+--------------+--------------+\\n| content_id  | title       | Kids_content | content_type |\\n+-------------+-------------+--------------+--------------+\\n| varchar(30) | varchar(30) | ENUM('Y'     | varchar(30)  |\\n+-------------+-------------+--------------+--------------+\\n</pre>\\n\\n<p>&nbsp;</p>\\n\\n<p>Report the distinct titles of the kid-friendly movies streamed in <strong>June 2020</strong>. A movie is kid-friendly if <code>Kids_content = 'Y'</code> and <code>content_type = 'Movies'</code>. Return the result table in <strong>any order</strong>.</p>\\n\\n<p>The result format is in the following example.</p>\\n\\n<p>&nbsp;</p>\\n<p><strong class=\\\"example\\\">Example 1:</strong></p>\\n\\n<pre>\\n<strong>Input:</strong> \\nTVProgram table:\\n+------------------+------------+------------+\\n| program_date     | content_id | channel    |\\n+------------------+------------+------------+\\n| 2020-06-10 08:00 | 1          | LC-Channel |\\n| 2020-05-11 12:00 | 2          | LC-Channel |\\n| 2020-05-12 12:00 | 3          | LC-Channel |\\n| 2020-05-13 14:00 | 4          | Disney Ch  |\\n| 2020-06-18 14:00 | 4          | Disney Ch  |\\n| 2020-07-15 16:00 | 5          | Disney Ch  |\\n+------------------+------------+------------+\\nContent table:\\n+------------+----------------+--------------+--------------+\\n| content_id | title          | Kids_content | content_type |\\n+------------+----------------+--------------+--------------+\\n| 1          | Leetcode Movie | N            | Movies       |\\n| 2          | Alg. for Kids  | Y            | Series       |\\n| 3          | Database Sols  | N            | Series       |\\n| 4          | Aladdin        | Y            | Movies       |\\n| 5          | Cinderella     | Y            | Movies       |\\n+------------+----------------+--------------+--------------+\\n<strong>Output:</strong> \\n+---------+\\n| title   |\\n+---------+\\n| Aladdin |\\n+---------+\\n<strong>Explanation:</strong> \\nAladdin is the only kid-friendly movie streamed in June 2020.\\n</pre>\\n",
        "schema": "Create table If Not Exists TVProgram (program_date date, content_id int, channel varchar(30))\nCreate table If Not Exists Content (content_id varchar(30), title varchar(30), Kids_content ENUM('Y', 'N'), content_type varchar(30))\nTruncate table TVProgram\ninsert into TVProgram (program_date, content_id, channel) values ('2020-06-10 08:00', '1', 'LC-Channel')\ninsert into TVProgram (program_date, content_id, channel) values ('2020-05-11 12:00', '2', 'LC-Channel')\ninsert into TVProgram (program_date, content_id, channel) values ('2020-05-12 12:00', '3', 'LC-Channel')\ninsert into TVProgram (program_date, content_id, channel) values ('2020-05-13 14:00', '4', 'Disney Ch')\ninsert into TVProgram (program_date, content_id, channel) values ('2020-06-18 14:00', '4', 'Disney Ch')\ninsert into TVProgram (program_date, content_id, channel) values ('2020-07-15 16:00', '5', 'Disney Ch')\nTruncate table Content\ninsert into Content (content_id, title, Kids_content, content_type) values ('1', 'Leetcode Movie', 'N', 'Movies')\ninsert into Content (content_id, title, Kids_content, content_type) values ('2', 'Alg. for Kids', 'Y', 'Series')\ninsert into Content (content_id, title, Kids_content, content_type) values ('3', 'Database Sols', 'N', 'Series')\ninsert into Content (content_id, title, Kids_content, content_type) values ('4', 'Aladdin', 'Y', 'Movies')\ninsert into Content (content_id, title, Kids_content, content_type) values ('5', 'Cinderella', 'Y', 'Movies')",
        "slug": "friendly-movies-streamed-last-month",
        "originalCategory": "advanced"
    },
    {
        "id": "1587",
        "title": "Bank Account Summary II",
        "difficulty": "easy",
        "description": "<p>Table: <code>Users</code></p>\n\n<pre>\n+--------------+---------+\n| Column Name  | Type    |\n+--------------+---------+\n| account      | int     |\n| name         | varchar |\n+--------------+---------+\naccount is the primary key (column with unique values) for this table.\nEach row of this table contains the account number of each user in the bank.\nThere will be no two users having the same name in the table.\n</pre>\n\n<p>&nbsp;</p>\n\n<p>Table: <code>Transactions</code></p>\n\n<pre>\n+---------------+---------+\n| Column Name   | Type    |\n+---------------+---------+\n| trans_id      | int     |\n| account       | int     |\n| amount        | int     |\n| transacted_on | date    |\n+---------------+---------+\ntrans_id is the primary key (column with unique values) for this table.\nEach row of this table contains all changes made to all accounts.\namount is positive if the user received money and negative if they transferred money.\nAll accounts start with a balance of 0.\n</pre>\n\n<p>&nbsp;</p>\n\n<p>Write a solution to report the name and balance of users with a balance higher than <code>10000</code>. The balance of an account is equal to the sum of the amounts of all transactions involving that account.</p>\n\n<p>Return the result table in <strong>any order</strong>.</p>\n\n<p>The result format is in the following example.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> \nUsers table:\n+------------+--------------+\n| account    | name         |\n+------------+--------------+\n| 900001     | Alice        |\n| 900002     | Bob          |\n| 900003     | Charlie      |\n+------------+--------------+\nTransactions table:\n+------------+------------+------------+---------------+\n| trans_id   | account    | amount     | transacted_on |\n+------------+------------+------------+---------------+\n| 1          | 900001     | 7000       |  2020-08-01   |\n| 2          | 900001     | 7000       |  2020-09-01   |\n| 3          | 900001     | -3000      |  2020-09-02   |\n| 4          | 900002     | 1000       |  2020-09-12   |\n| 5          | 900003     | 6000       |  2020-08-07   |\n| 6          | 900003     | 6000       |  2020-09-07   |\n| 7          | 900003     | -4000      |  2020-09-11   |\n+------------+------------+------------+---------------+\n<strong>Output:</strong> \n+------------+------------+\n| name       | balance    |\n+------------+------------+\n| Alice      | 11000      |\n+------------+------------+\n<strong>Explanation:</strong> \nAlice&#39;s balance is (7000 + 7000 - 3000) = 11000.\nBob&#39;s balance is 1000.\nCharlie&#39;s balance is (6000 + 6000 - 4000) = 8000.\n</pre>\n",
        "schema": "Create table If Not Exists Users (account int, name varchar(20))\nCreate table If Not Exists Transactions (trans_id int, account int, amount int, transacted_on date)\nTruncate table Users\ninsert into Users (account, name) values ('900001', 'Alice')\ninsert into Users (account, name) values ('900002', 'Bob')\ninsert into Users (account, name) values ('900003', 'Charlie')\nTruncate table Transactions\ninsert into Transactions (trans_id, account, amount, transacted_on) values ('1', '900001', '7000', '2020-08-01')\ninsert into Transactions (trans_id, account, amount, transacted_on) values ('2', '900001', '7000', '2020-09-01')\ninsert into Transactions (trans_id, account, amount, transacted_on) values ('3', '900001', '-3000', '2020-09-02')\ninsert into Transactions (trans_id, account, amount, transacted_on) values ('4', '900002', '1000', '2020-09-12')\ninsert into Transactions (trans_id, account, amount, transacted_on) values ('5', '900003', '6000', '2020-08-07')\ninsert into Transactions (trans_id, account, amount, transacted_on) values ('6', '900003', '6000', '2020-09-07')\ninsert into Transactions (trans_id, account, amount, transacted_on) values ('7', '900003', '-4000', '2020-09-11')",
        "slug": "bank-account-summary-ii",
        "editorial": `[TOC]

## Solution

--- 

### Overview

Since each user has only one name but multiple transactions (\`amount\`), it's easier to calculate the balance for each \`account\` to identify the qualified accounts (with a balance higher than 10000), and then join the other table to get the user name. 

---

### Approach 1: First Calculate Then JOIN

#### Algorithm

1. Use \`SUM()\` to get the total balance for each account
2. Use \`HAVING\` to filter the aggregated results (total balance for each account) and return only the qualified accounts
3. Join the User table to get the user name for these accounts

##### MySQL

Step 1 and 2

\`\`\`sql
SELECT 
    account, SUM(amount) as balance
FROM 
    Transactions
GROUP BY 1
HAVING 
    balance>10000
\`\`\`
Step 3 - Join the subquery created in the previous steps to the other table

\`\`\`sql
SELECT 
    DISTINCT a.name, b.balance
FROM 
    Users a
JOIN (
    SELECT 
        account, SUM(amount) as balance
    FROM 
        Transactions
    GROUP BY 1
    HAVING balance>10000) b
ON 
    a.account = b.account 
\`\`\`

---

### Approach 2: Use JOIN and Calculate At Same Time

#### Algorithm

1. Select the two columns needed for the final output: \`name\` of the user, and the \`balance\` (SUM of the column \`amount\`)
2. \`JOIN\` the two tables
3. \`GROUP\` the results by each account, so the query will return only one result for each user
4. Use \`HAVING\` to filter the aggregated results and return only the qualified accounts

##### MySQL
\`\`\`sql
SELECT 
    u.name, SUM(t.amount) AS balance
FROM 
    Users u
JOIN 
    Transactions t
ON 
    u.account = t.account
GROUP BY u.account
HAVING 
    balance > 10000
\`\`\`

-----`,
        "originalCategory": "advanced"
    },
    {
        "id": "1607",
        "title": "Sellers With No Sales",
        "difficulty": "easy",
        "description": "<p>Table: <code>Customer</code></p>\\n\\n<pre>\\n+-------------+---------------+\\n| customer_id | customer_name |\\n+-------------+---------------+\\n| int         | varchar(20)   |\\n+-------------+---------------+\\n</pre>\\n\\n<p>Table: <code>Orders</code></p>\\n\\n<pre>\\n+------------+------------+------------+-------------+------------+\\n| order_id   | sale_date  | order_cost | customer_id | seller_id  |\\n+------------+------------+------------+-------------+------------+\\n| int        | date       | int        | int         | int        |\\n+------------+------------+------------+-------------+------------+\\n</pre>\\n\\n<p>Table: <code>Seller</code></p>\\n\\n<pre>\\n+------------+-------------+\\n| seller_id  | seller_name |\\n+------------+-------------+\\n| int        | varchar(20) |\\n+------------+-------------+\\n</pre>\\n\\n<p>&nbsp;</p>\\n\\n<p>Report the names of all sellers who did not make any sales in <strong>2020</strong>. Return the result table ordered by <code>seller_name</code> in ascending order.</p>\\n\\n<p>The result format is in the following example.</p>\\n\\n<p>&nbsp;</p>\\n<p><strong class=\\\"example\\\">Example 1:</strong></p>\\n\\n<pre>\\n<strong>Input:</strong> \\nCustomer table:\\n+-------------+---------------+\\n| customer_id | customer_name |\\n+-------------+---------------+\\n| 101         | Alice         |\\n| 102         | Bob           |\\n| 103         | Charlie       |\\n+-------------+---------------+\\nOrders table:\\n+----------+------------+------------+-------------+-----------+\\n| order_id | sale_date  | order_cost | customer_id | seller_id |\\n+----------+------------+------------+-------------+-----------+\\n| 1        | 2020-03-01 | 1500       | 101         | 1         |\\n| 2        | 2020-05-25 | 2400       | 102         | 2         |\\n| 3        | 2019-05-25 | 800        | 101         | 3         |\\n| 4        | 2020-09-13 | 1000       | 103         | 2         |\\n| 5        | 2019-02-11 | 700        | 101         | 2         |\\n+----------+------------+------------+-------------+-----------+\\nSeller table:\\n+-----------+-------------+\\n| seller_id | seller_name |\\n+-----------+-------------+\\n| 1         | Daniel      |\\n| 2         | Elizabeth   |\\n| 3         | Frank       |\\n+-----------+-------------+\\n<strong>Output:</strong> \\n+-------------+\\n| seller_name |\\n+-------------+\\n| Frank       |\\n+-------------+\\n<strong>Explanation:</strong> \\nFrank did not make any sales in 2020.\\n</pre>\\n",
        "schema": "Create table If Not Exists Customer (customer_id int, customer_name varchar(20))\nCreate table If Not Exists Orders (order_id int, sale_date date, order_cost int, customer_id int, seller_id int)\n\nCreate table If Not Exists Seller (seller_id int, seller_name varchar(20))\n\nTruncate table Customer\ninsert into Customer (customer_id, customer_name) values ('101', 'Alice')\ninsert into Customer (customer_id, customer_name) values ('102', 'Bob')\ninsert into Customer (customer_id, customer_name) values ('103', 'Charlie')\nTruncate table Orders\ninsert into Orders (order_id, sale_date, order_cost, customer_id, seller_id) values ('1', '2020-03-01', '1500', '101', '1')\ninsert into Orders (order_id, sale_date, order_cost, customer_id, seller_id) values ('2', '2020-05-25', '2400', '102', '2')\ninsert into Orders (order_id, sale_date, order_cost, customer_id, seller_id) values ('3', '2019-05-25', '800', '101', '3')\ninsert into Orders (order_id, sale_date, order_cost, customer_id, seller_id) values ('4', '2020-09-13', '1000', '103', '2')\ninsert into Orders (order_id, sale_date, order_cost, customer_id, seller_id) values ('5', '2019-02-11', '700', '101', '2')\nTruncate table Seller\ninsert into Seller (seller_id, seller_name) values ('1', 'Daniel')\ninsert into Seller (seller_id, seller_name) values ('2', 'Elizabeth')\ninsert into Seller (seller_id, seller_name) values ('3', 'Frank')",
        "slug": "sellers-with-no-sales",
        "originalCategory": "advanced"
    },
    {
        "id": "1731",
        "title": "The Number of Employees Which Report to Each Employee",
        "difficulty": "easy",
        "description": "<p>Table: <code>Employees</code></p>\n\n<pre>\n+-------------+----------+\n| Column Name | Type     |\n+-------------+----------+\n| employee_id | int      |\n| name        | varchar  |\n| reports_to  | int      |\n| age         | int      |\n+-------------+----------+\nemployee_id is the column with unique values for this table.\nThis table contains information about the employees and the id of the manager they report to. Some employees do not report to anyone (reports_to is null). \n</pre>\n\n<p>&nbsp;</p>\n\n<p>For this problem, we will consider a <strong>manager</strong> an employee who has at least 1 other employee reporting to them.</p>\n\n<p>Write a solution to report the ids and the names of all <strong>managers</strong>, the number of employees who report <strong>directly</strong> to them, and the average age of the reports rounded to the nearest integer.</p>\n\n<p>Return the result table ordered by <code>employee_id</code>.</p>\n\n<p>The&nbsp;result format is in the following example.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> \nEmployees table:\n+-------------+---------+------------+-----+\n| employee_id | name    | reports_to | age |\n+-------------+---------+------------+-----+\n| 9           | Hercy   | null       | 43  |\n| 6           | Alice   | 9          | 41  |\n| 4           | Bob     | 9          | 36  |\n| 2           | Winston | null       | 37  |\n+-------------+---------+------------+-----+\n<strong>Output:</strong> \n+-------------+-------+---------------+-------------+\n| employee_id | name  | reports_count | average_age |\n+-------------+-------+---------------+-------------+\n| 9           | Hercy | 2             | 39          |\n+-------------+-------+---------------+-------------+\n<strong>Explanation:</strong> Hercy has 2 people report directly to him, Alice and Bob. Their average age is (41+36)/2 = 38.5, which is 39 after rounding it to the nearest integer.\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> \nEmployees table:\n+-------------+---------+------------+-----+ \n| employee_id | name &nbsp; &nbsp;| reports_to | age |\n|-------------|---------|------------|-----|\n| 1 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; | Michael | null &nbsp; &nbsp; &nbsp; | 45 &nbsp;|\n| 2 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; | Alice &nbsp; | 1 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;| 38 &nbsp;|\n| 3 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; | Bob &nbsp; &nbsp; | 1 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;| 42 &nbsp;|\n| 4 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; | Charlie | 2 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;| 34 &nbsp;|\n| 5 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; | David &nbsp; | 2 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;| 40 &nbsp;|\n| 6 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; | Eve &nbsp; &nbsp; | 3 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;| 37 &nbsp;|\n| 7 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; | Frank &nbsp; | null &nbsp; &nbsp; &nbsp; | 50 &nbsp;|\n| 8 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; | Grace &nbsp; | null &nbsp; &nbsp; &nbsp; | 48 &nbsp;|\n+-------------+---------+------------+-----+ \n<strong>Output:</strong> \n+-------------+---------+---------------+-------------+\n| employee_id | name &nbsp; &nbsp;| reports_count | average_age |\n| ----------- | ------- | ------------- | ----------- |\n| 1 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; | Michael | 2 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; | 40 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;|\n| 2 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; | Alice &nbsp; | 2 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; | 37 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;|\n| 3 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; | Bob &nbsp; &nbsp; | 1 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; | 37 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;|\n+-------------+---------+---------------+-------------+\n\n</pre>\n",
        "schema": "Create table If Not Exists Employees(employee_id int, name varchar(20), reports_to int, age int)\nTruncate table Employees\ninsert into Employees (employee_id, name, reports_to, age) values ('9', 'Hercy', NULL, '43')\ninsert into Employees (employee_id, name, reports_to, age) values ('6', 'Alice', '9', '41')\ninsert into Employees (employee_id, name, reports_to, age) values ('4', 'Bob', '9', '36')\ninsert into Employees (employee_id, name, reports_to, age) values ('2', 'Winston', NULL, '37')",
        "slug": "the-number-of-employees-which-report-to-each-employee",
        "editorial": `[TOC]

# Solution

---

## pandas

### Approach: Aggregation-Merge Rounding Strategy

Initially, this approach involves aggregating employee data to identify managerial roles and compute key metrics, such as the count of direct reports and their average age. This aggregation phase allows for the extraction of insightful summaries about the workforce distribution and demographics. Following this, the strategy employs a merge operation to reintegrate these summaries with the broader dataset, thereby appending meaningful context like manager names to the aggregated statistics. A critical aspect of this strategy is the implementation of a custom rounding technique designed to circumvent the limitations of banker's rounding. Banker's rounding, also known as round half to even, is a method where half values (e.g., 0.5) are rounded to the nearest even number to reduce bias in the sum of many rounded numbers. This technique minimizes cumulative rounding errors in statistical operations but may not always align with common rounding expectations, where 0.5 is traditionally rounded up. By adjusting the rounding method, it ensures that the average age calculations align more closely with intuitive expectations.

 **Visualization of Approach:**

![fig](../Figures/1731/1731-1.gif)

#### Intuition

Let's review the intuition behind each step given the following input DataFrames:

Employees DataFrame (\`employees\`):

| employee_id | name    | reports_to | age |
| ----------- | ------- | ---------- | --- |
| 9           | Hercy   | null       | 43  |
| 6           | Alice   | 9          | 41  |
| 4           | Bob     | 9          | 36  |
| 2           | Winston | null       | 37  |
<br>

1. **Aggregation for Average Age**

- The first step involves grouping the data by the \`reports_to\` field, which represents the manager each employee reports to. The goal here is to calculate two key metrics for each manager: the total number of direct reports (\`reports_count\`) and the average age of these reports (\`average_age\`). This aggregation is crucial for understanding the composition and demographics of teams within the organization.

\`\`\`python
by_manager = employees.groupby('reports_to', as_index=False).agg(
    reports_count=('employee_id', 'size'),
    average_age=('age', 'mean')
)
\`\`\`
- This step allows us to identify which employees are managers (those who have others reporting to them) and summarize the average age of their teams, laying the groundwork for further analysis.

\`by_manager\`:

| reports_to | reports_count | average_age |
|------------|---------------|-------------|
| 9          | 2             | 38.5        |
<br>

2. **Custom Rounding to Overcome Banker's Rounding**

- Banker's rounding can lead to counterintuitive results, especially when the average age is exactly halfway between two integers. To ensure the average age rounds in a way that aligns with common expectations (up from .5), we adjust the rounding process.

\`\`\`python
by_manager['average_age'] = (by_manager['average_age'] + 1e-12).round(0)
\`\`\`
- Adding a minuscule value before rounding ensures that values exactly at the half mark are always rounded up, thus addressing the potential issue of banker's rounding where such values might otherwise round to the nearest even number.

\`by_manager\`:

| reports_to | reports_count | average_age |
|------------|---------------|-------------|
| 9          | 2             | 39.0        |
<br>


3. **Merging Aggregated Data with Manager Names**

- Having aggregated the data, we now need to link each manager's ID back to their name for a more intuitive and informative output. This is achieved by merging the aggregated data with the original dataset based on the \`employee_id\`.

\`\`\`python
merged = by_manager.merge(
    employees[['employee_id', 'name']],
    how='left',
    left_on='reports_to',
    right_on='employee_id'
)
\`\`\`
- This step enriches the average age with human-readable information, specifically the names of the managers, making the final output more accessible and actionable for decision-making or reporting purposes.

\`merged\`:

| reports_to | reports_count | average_age | employee_id | name  |
|------------|---------------|-------------|-------------|-------|
| 9          | 2             | 39.0        | 9           | Hercy |
<br>

4. **Final Output Preparation**

- Finally, we need to prepare the output in a clear and structured format, selecting only the relevant columns and renaming them as necessary to match the expected output schema.

\`\`\`python
merged.rename(
    columns={
        'employee_id_y': 'employee_id',  # This is the actual manager's ID
    }, 
    inplace=True
)
final_output = merged[['employee_id', 'name', 'reports_count', 'average_age']]
\`\`\`
- The final step ensures that the output is presented in a user-friendly format, with each column clearly labeled to reflect its content—manager IDs, manager names, counts of direct reports, and their average age. 

\`merged\`:

| employee_id | name  | reports_count | average_age |
| ----------- | ----- | ------------- | ----------- |
| 9           | Hercy | 2             | 39          |
<br>


#### Implementation

<iframe src="https://leetcode.com/playground/fqGndmTp/shared" frameBorder="0" width="100%" height="500" name="fqGndmTp"></iframe>

---

## Database

### Approach 1: Self Join

This SQL query is designed to identify managers within an organization, count how many employees report directly to each manager, and calculate the average age of these direct reports. The query operates on a single table, \`employees\`, which contains records of all employees, including their \`employee_id\`, \`name\`, age, and the \`employee_id\` of their manager (\`reports_to\`). 

The query effectively utilizes SQL's capabilities to perform a self-join on the \`employees\` table, enabling the identification of managers and the aggregation of direct report counts and average ages.

#### Intuition

Let's break down the SQL query step by step and explain the intuition behind each part:

1. **Join Operation**

- This step creates a self-join on the \`employees\` table. It essentially pairs each employee (\`emp\`) with their respective manager (\`mgr\`) by matching the \`emp.reports_to\` field with \`mgr.employee_id\`. This join is necessary because both employee and manager information resides within the same table, and we need to link employees to their managers to compute the required statistics.

\`\`\`sql
FROM employees emp JOIN employees mgr ON emp.reports_to = mgr.employee_id
\`\`\`

- The self-join enables us to work with employee-manager pairs in the subsequent steps, facilitating the aggregation of data based on manager.


2. **Aggregation and Calculation**

- This part of the query selects the manager's \`employee_id\` and \`name\`, counts the number of direct reports for each manager (\`COUNT(emp.employee_id) AS reports_count\`), and calculates the average age of these reports (\`ROUND(AVG(emp.age)) AS average_age\`).

\`\`\`sql
SELECT 
  mgr.employee_id, 
  mgr.name, 
  COUNT(emp.employee_id) AS reports_count, 
  ROUND(AVG(emp.age)) AS average_age
\`\`\`

- **Manager Identification**: By selecting \`mgr.employee_id\` and \`mgr.name\`, we ensure that the output will list managers, not all employees.
- **Reports Count**: \`COUNT(emp.employee_id)\` counts how many times each manager appears in employee-manager pairs, effectively counting the number of direct reports.
- **Average Age Calculation**: \`ROUND(AVG(emp.age))\` calculates the average age of the direct reports for each manager, rounding it to the nearest whole number for simplicity and readability.


3. **Grouping**

- This clause groups the results by the manager's \`employee_id\`. It ensures that the aggregation functions (\`COUNT\` and \`AVG\`) operate within each group, that is, for each manager, rather than on the entire dataset.

\`\`\`sql
GROUP BY employee_id
\`\`\`

- Without grouping by \`employee_id\`, we wouldn't be able to calculate the \`reports_count\` and \`average_age\` per manager. This step is crucial for performing the per-manager calculations required by the query.


4. **Ordering**

- Orders the final result set by the manager's \`employee_id\`. This is likely for presentation purposes, to make the data easier to read and to follow a logical sequence (usually ascending order by ID).

\`\`\`sql
ORDER BY employee_id
\`\`\`

- This is required by the problem statement, but also ordering the results makes the output systematic and easier to navigate, especially useful in scenarios where the dataset includes a large number of managers.


#### Implementation


\`\`\`mysql []
SELECT 
  mgr.employee_id, 
  mgr.name, 
  COUNT(emp.employee_id) AS reports_count, 
  ROUND(
    AVG(emp.age)
  ) AS average_age 
FROM 
  employees emp 
  JOIN employees mgr ON emp.reports_to = mgr.employee_id 
GROUP BY 
  employee_id 
ORDER BY 
  employee_id
\`\`\`

### Approach 2: Correlated Sub-Query

This alternative SQL query also aims to list managers within an organization, the number of employees who report directly to each manager, and the average age of these reports. Unlike the previous approach that used a self-join, this solution employs a correlated subquery to fetch the manager's name and utilizes \`GROUP BY\` and \`HAVING\` clauses to aggregate and filter the data. 

This alternative query leverages a mix of grouping, a correlated subquery for enhanced data retrieval, and conditional filtering to achieve its goal. By doing so, it provides a clear and efficient way to identify managers, count their direct reports, and calculate the average age of these reports, all while ensuring the output is neatly organized and focused only on those employees who are indeed managers.

#### Intuition

Let's break down the SQL query step by step and explain the intuition behind each part:

1. **Grouping by Manager**

- The query starts by selecting from the \`employees\` table (aliased as \`e\`) and groups the results by the \`reports_to\` column. This column indicates the manager each employee reports to, effectively grouping employees by their manager.

\`\`\`sql
FROM employees e GROUP BY reports_to
\`\`\`

- Grouping by \`reports_to\` is essential for calculating the count of direct reports and their average age for each manager. It organizes the data such that each group corresponds to a manager's direct reports.


2. **Selecting Manager ID and Name**

- This part of the query selects two pieces of information for each manager: their \`employee_id\` (using the \`reports_to\` column from the grouped data) and their name (using a correlated subquery).

\`\`\`sql
SELECT 
  reports_to AS employee_id, 
  (
    SELECT name FROM employees e1 WHERE e.reports_to = e1.employee_id
  ) AS name,
\`\`\`

- **Manager ID**: The \`reports_to\` column directly maps to the \`employee_id\` of the manager, so it's used to identify the manager.
- **Manager Name**: A correlated subquery fetches the name of each manager from the \`employees\` table by matching \`e.reports_to\` with \`e1.employee_id\`. This approach allows fetching related data without performing a join operation, which can be advantageous in terms of readability or performance.


3. **Calculating Reports Count and Average Age**

- For each group (i.e., each manager), this calculates the number of direct reports (\`COUNT(reports_to)\`) and the average age of these reports (\`ROUND(AVG(age))\`).

\`\`\`sql
COUNT(reports_to) AS reports_count, 
ROUND(AVG(age)) AS average_age
\`\`\`

- **Reports Count**: Counting the \`reports_to\` occurrences within each group gives the number of employees reporting to each manager.
- **Average Age Calculation**: Calculating the average of \`age\` and rounding it provides a simple, readable metric of the average age of each manager's direct reports.


4. **Calculating Reports Count and Average Age**

- This clause filters the grouped results to include only those entries where the \`reports_count\` is greater than 0. 

\`\`\`sql
HAVING reports_count > 0
\`\`\`

- This ensures that the query only returns records for actual managers (employees who have at least one direct report), excluding employees who do not manage anyone.


5. **Ordering Results**

- Orders the resulting records by \`employee_id\` (which, in this context, is the \`reports_to\` field renamed), ensuring a structured and predictable output.

\`\`\`sql
ORDER BY employee_id
\`\`\`

- This is required by the problem statement but also makes the results easier to read and understand, particularly useful when dealing with a large dataset.


#### Implementation


\`\`\`mysql []
SELECT 
  reports_to AS employee_id, 
  (
    SELECT 
      name 
    FROM 
      employees e1 
    WHERE 
      e.reports_to = e1.employee_id 
  ) AS name, 
  COUNT(reports_to) AS reports_count, 
  ROUND(
    AVG(age)
  ) AS average_age 
FROM 
  employees e 
GROUP BY 
  reports_to 
HAVING 
  reports_count > 0 
ORDER BY 
  employee_id
\`\`\``,
        "originalCategory": "advanced"
    },
    {
        "id": "1741",
        "title": "Find Total Time Spent by Each Employee",
        "difficulty": "easy",
        "description": "<p>Table: <code>Employees</code></p>\n\n<pre>\n+-------------+------+\n| Column Name | Type |\n+-------------+------+\n| emp_id      | int  |\n| event_day   | date |\n| in_time     | int  |\n| out_time    | int  |\n+-------------+------+\n(emp_id, event_day, in_time) is the primary key (combinations of columns with unique values) of this table.\nThe table shows the employees&#39; entries and exits in an office.\nevent_day is the day at which this event happened, in_time is the minute at which the employee entered the office, and out_time is the minute at which they left the office.\nin_time and out_time are between 1 and 1440.\nIt is guaranteed that no two events on the same day intersect in time, and in_time &lt; out_time.\n</pre>\n\n<p>&nbsp;</p>\n\n<p>Write a solution to calculate the total time <strong>in minutes</strong> spent by each employee on each day at the office. Note that within one day, an employee can enter and leave more than once. The time spent in the office for a single entry is <code>out_time - in_time</code>.</p>\n\n<p>Return the result table in <strong>any order</strong>.</p>\n\n<p>The result format is in the following example.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> \nEmployees table:\n+--------+------------+---------+----------+\n| emp_id | event_day  | in_time | out_time |\n+--------+------------+---------+----------+\n| 1      | 2020-11-28 | 4       | 32       |\n| 1      | 2020-11-28 | 55      | 200      |\n| 1      | 2020-12-03 | 1       | 42       |\n| 2      | 2020-11-28 | 3       | 33       |\n| 2      | 2020-12-09 | 47      | 74       |\n+--------+------------+---------+----------+\n<strong>Output:</strong> \n+------------+--------+------------+\n| day        | emp_id | total_time |\n+------------+--------+------------+\n| 2020-11-28 | 1      | 173        |\n| 2020-11-28 | 2      | 30         |\n| 2020-12-03 | 1      | 41         |\n| 2020-12-09 | 2      | 27         |\n+------------+--------+------------+\n<strong>Explanation:</strong> \nEmployee 1 has three events: two on day 2020-11-28 with a total of (32 - 4) + (200 - 55) = 173, and one on day 2020-12-03 with a total of (42 - 1) = 41.\nEmployee 2 has two events: one on day 2020-11-28 with a total of (33 - 3) = 30, and one on day 2020-12-09 with a total of (74 - 47) = 27.\n</pre>\n",
        "schema": "Create table If Not Exists Employees(emp_id int, event_day date, in_time int, out_time int)\nTruncate table Employees\ninsert into Employees (emp_id, event_day, in_time, out_time) values ('1', '2020-11-28', '4', '32')\ninsert into Employees (emp_id, event_day, in_time, out_time) values ('1', '2020-11-28', '55', '200')\ninsert into Employees (emp_id, event_day, in_time, out_time) values ('1', '2020-12-3', '1', '42')\ninsert into Employees (emp_id, event_day, in_time, out_time) values ('2', '2020-11-28', '3', '33')\ninsert into Employees (emp_id, event_day, in_time, out_time) values ('2', '2020-12-9', '47', '74')",
        "slug": "find-total-time-spent-by-each-employee",
        "originalCategory": "advanced"
    },
    {
        "id": "1789",
        "title": "Primary Department for Each Employee",
        "difficulty": "easy",
        "description": "<p>Table: <code>Employee</code></p>\n\n<pre>\n+---------------+---------+\n| Column Name   |  Type   |\n+---------------+---------+\n| employee_id   | int     |\n| department_id | int     |\n| primary_flag  | varchar |\n+---------------+---------+\n(employee_id, department_id) is the primary key (combination of columns with unique values) for this table.\nemployee_id is the id of the employee.\ndepartment_id is the id of the department to which the employee belongs.\nprimary_flag is an ENUM (category) of type (&#39;Y&#39;, &#39;N&#39;). If the flag is &#39;Y&#39;, the department is the primary department for the employee. If the flag is &#39;N&#39;, the department is not the primary.\n</pre>\n\n<p>&nbsp;</p>\n\n<p>Employees can belong to multiple departments. When the employee joins other departments, they need to decide which department is their primary department. Note that when an employee belongs to only one department, their primary column is <code>&#39;N&#39;</code>.</p>\n\n<p>Write a solution to report all the employees with their primary department. For employees who belong to one department, report their only department.</p>\n\n<p>Return the result table in <strong>any order</strong>.</p>\n\n<p>The&nbsp;result format is in the following example.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> \nEmployee table:\n+-------------+---------------+--------------+\n| employee_id | department_id | primary_flag |\n+-------------+---------------+--------------+\n| 1           | 1             | N            |\n| 2           | 1             | Y            |\n| 2           | 2             | N            |\n| 3           | 3             | N            |\n| 4           | 2             | N            |\n| 4           | 3             | Y            |\n| 4           | 4             | N            |\n+-------------+---------------+--------------+\n<strong>Output:</strong> \n+-------------+---------------+\n| employee_id | department_id |\n+-------------+---------------+\n| 1           | 1             |\n| 2           | 1             |\n| 3           | 3             |\n| 4           | 3             |\n+-------------+---------------+\n<strong>Explanation:</strong> \n- The Primary department for employee 1 is 1.\n- The Primary department for employee 2 is 1.\n- The Primary department for employee 3 is 3.\n- The Primary department for employee 4 is 3.\n</pre>\n",
        "schema": "Create table If Not Exists Employee (employee_id int, department_id int, primary_flag ENUM('Y','N'))\nTruncate table Employee\ninsert into Employee (employee_id, department_id, primary_flag) values ('1', '1', 'N')\ninsert into Employee (employee_id, department_id, primary_flag) values ('2', '1', 'Y')\ninsert into Employee (employee_id, department_id, primary_flag) values ('2', '2', 'N')\ninsert into Employee (employee_id, department_id, primary_flag) values ('3', '3', 'N')\ninsert into Employee (employee_id, department_id, primary_flag) values ('4', '2', 'N')\ninsert into Employee (employee_id, department_id, primary_flag) values ('4', '3', 'Y')\ninsert into Employee (employee_id, department_id, primary_flag) values ('4', '4', 'N')",
        "slug": "primary-department-for-each-employee",
        "editorial": `[TOC]

# Solution

---

### Overview

Employees can be associated with one or multiple departments. The task is to determine and report each employee's primary department, noting that if they're part of only one department, that's automatically their primary.

---

## pandas
### Approach 1: Conditional Filtering and Aggregation-based Union

![fig](../Figures/1789/1789-1.png)

#### Intuition

Sample \`employee\` DataFrame:

<table>
   <thead>
      <tr>
         <th>employee_id</th>
         <th>department_id</th>
         <th>primary_flag</th>
      </tr>
   </thead>
   <tbody>
      <tr>
         <td>1</td>
         <td>1</td>
         <td>N</td>
      </tr>
      <tr>
         <td>2</td>
         <td>1</td>
         <td>Y</td>
      </tr>
      <tr>
         <td>2</td>
         <td>2</td>
         <td>N</td>
      </tr>
      <tr>
         <td>3</td>
         <td>3</td>
         <td>N</td>
      </tr>
      <tr>
         <td>4</td>
         <td>2</td>
         <td>N</td>
      </tr>
      <tr>
         <td>4</td>
         <td>3</td>
         <td>Y</td>
      </tr>
      <tr>
         <td>4</td>
         <td>4</td>
         <td>N</td>
      </tr>
   </tbody>
</table>
<br>

 **Step 1 - Filter by Flag**:
\`\`\`python
 filtered_by_flag = employee[employee['primary_flag'] == 'Y'][['employee_id', 'department_id']]
\`\`\`
 - This part deals with employees that belong to multiple departments.
  - The code filters rows from the \`employee\` DataFrame where the \`primary_flag\` is set to \`'Y'\`. This means we are interested in the primary department of employees who belong to multiple departments.
  - After filtering, we only select two columns: \`'employee_id'\` and \`'department_id'\`. This will give us the primary department of each employee.
  - The result is stored in \`filtered_by_flag\`.

<table>
   <thead>
      <tr>
         <th>employee_id</th>
         <th>department_id</th>
      </tr>
   </thead>
   <tbody>
      <tr>
         <td>2</td>
         <td>1</td>
      </tr>
      <tr>
         <td>4</td>
         <td>3</td>
      </tr>
   </tbody>
</table>
<br>

**Step 2 - Unique Employees**:
\`\`\`python
unique_employees = employee.groupby('employee_id').filter(lambda x: len(x) == 1)[['employee_id', 'department_id']]
\`\`\`
  - This part deals with employees that belong to only one department.
  - Using \`groupby\`, we group the \`employee\` DataFrame by \`employee_id\`. This will group the rows based on the unique employee IDs.
  - Using the \`filter\` function, we filter out groups whose size (number of rows in the group) is exactly 1. This means that these employees belong to only one department.
  - After filtering, we select the same two columns: \`'employee_id'\` and \`'department_id'\`. Since these employees belong to only one department, that single department is their primary department.
  - The result is stored in \`unique_employees\`.

<table>
   <thead>
      <tr>
         <th>employee_id</th>
         <th>department_id</th>
      </tr>
   </thead>
   <tbody>
      <tr>
         <td>1</td>
         <td>1</td>
      </tr>
      <tr>
         <td>3</td>
         <td>3</td>
      </tr>
   </tbody>
</table>
<br>

**Step 3 - Combining and Cleaning**:
\`\`\`python
result = pd.concat([filtered_by_flag, unique_employees]).drop_duplicates().reset_index(drop=True)
\`\`\`
  - We now have two DataFrames: \`filtered_by_flag\`, which contains the primary departments of employees with multiple departments, and \`unique_employees\`, which contains the primary (and only) department of employees with a single department.
  - Using \`pd.concat\`, we concatenate (or combine) these two DataFrames vertically. The resulting DataFrame will have all the primary departments for all employees.
  - We then call \`drop_duplicates()\` to remove any duplicate rows. This is a safety measure; in the given context, it's unlikely that duplicates exist after the previous steps. However, it's good to be cautious.
  - Finally, \`reset_index(drop=True)\` is used to reset the index of the DataFrame and make it more orderly. The \`drop=True\` argument ensures the old index doesn't become a column in the DataFrame.

<table>
   <thead>
      <tr>
         <th>employee_id</th>
         <th>department_id</th>
      </tr>
   </thead>
   <tbody>
      <tr>
         <td>2</td>
         <td>1</td>
      </tr>
      <tr>
         <td>4</td>
         <td>3</td>
      </tr>
      <tr>
         <td>1</td>
         <td>1</td>
      </tr>
      <tr>
         <td>3</td>
         <td>3</td>
      </tr>
   </tbody>
</table>
<br>

**4. Return Result**:
\`\`\`python
return result
\`\`\`
  - The final DataFrame, \`result\`, containing the primary department for each employee, is returned.

In summary, the function provides an efficient way to determine the primary department of each employee, regardless of whether they belong to one or multiple departments.

#### Implementation

Based on the understanding above, the solution can be implemented as:


\`\`\`python
import pandas as pd

def find_primary_department(employee: pd.DataFrame) -> pd.DataFrame:
    # 1. Employees with primary_flag set to 'Y'
    filtered_by_flag = employee[employee['primary_flag'] == 'Y'][['employee_id', 'department_id']]

    # 2. Employees that appear exactly once in the Employee table
    unique_employees = employee.groupby('employee_id').filter(lambda x: len(x) == 1)[['employee_id', 'department_id']]

    # 3. Combine both DataFrames using concat and drop duplicates
    result = pd.concat([filtered_by_flag, unique_employees]).drop_duplicates().reset_index(drop=True)
    
    #4. Return result
    return result

\`\`\`

### Approach 2: Group-based Transform and Conditional Filtering

![fig](../Figures/1789/1789-2.png)

#### Intuition

Sample \`employee\` dataframe:
<table>
   <thead>
      <tr>
         <th>employee_id</th>
         <th>department_id</th>
         <th>primary_flag</th>
      </tr>
   </thead>
   <tbody>
      <tr>
         <td>1</td>
         <td>1</td>
         <td>N</td>
      </tr>
      <tr>
         <td>2</td>
         <td>1</td>
         <td>Y</td>
      </tr>
      <tr>
         <td>2</td>
         <td>2</td>
         <td>N</td>
      </tr>
      <tr>
         <td>3</td>
         <td>3</td>
         <td>N</td>
      </tr>
      <tr>
         <td>4</td>
         <td>2</td>
         <td>N</td>
      </tr>
      <tr>
         <td>4</td>
         <td>3</td>
         <td>Y</td>
      </tr>
      <tr>
         <td>4</td>
         <td>4</td>
         <td>N</td>
      </tr>
   </tbody>
</table>
<br>

 **Step 1 - Calculate EmployeeCount**:
\`\`\`python
 employee["EmployeeCount"] = employee.groupby("employee_id")["employee_id"].transform("size")
\`\`\`
  - For each employee (\`employee_id\`), the code calculates how many departments they are associated with.
  - The \`groupby\` method groups the DataFrame by unique employee IDs.
  - The \`transform("size")\` method calculates the size (or count) of each group. It will return a Series with an identical size to \`employee\` where each entry corresponds to the count of rows for that \`employee_id\`.
  - The result is a new column named \`EmployeeCount\` in the \`employee\` DataFrame which contains the number of rows (i.e., departments) for each \`employee_id\`.

<table>
   <thead>
      <tr>
         <th>employee_id</th>
         <th>department_id</th>
         <th>primary_flag</th>
         <th>EmployeeCount</th>
      </tr>
   </thead>
   <tbody>
      <tr>
         <td>1</td>
         <td>1</td>
         <td>N</td>
         <td>1</td>
      </tr>
      <tr>
         <td>2</td>
         <td>1</td>
         <td>Y</td>
         <td>2</td>
      </tr>
      <tr>
         <td>2</td>
         <td>2</td>
         <td>N</td>
         <td>2</td>
      </tr>
      <tr>
         <td>3</td>
         <td>3</td>
         <td>N</td>
         <td>1</td>
      </tr>
      <tr>
         <td>4</td>
         <td>2</td>
         <td>N</td>
         <td>3</td>
      </tr>
      <tr>
         <td>4</td>
         <td>3</td>
         <td>Y</td>
         <td>3</td>
      </tr>
      <tr>
         <td>4</td>
         <td>4</td>
         <td>N</td>
         <td>3</td>
      </tr>
   </tbody>
</table>
<br>

 **Step 2 - Filtering the DataFrame**:
\`\`\`python
result = employee[(employee["EmployeeCount"] == 1) | (employee["primary_flag"] == "Y")][
    ["employee_id", "department_id"]
]
\`\`\`
  - The goal is to filter out rows that represent the primary department for each employee.
  - Two conditions are applied for filtering:
      1. If \`EmployeeCount\` is \`1\`, it means the employee belongs to only one department, so that department is automatically the primary one.
      2. If \`primary_flag\` is \`"Y"\`, it indicates that for employees who are part of multiple departments, this particular department is their primary one.
  - The logical "or" (\`|\`) operator is used to combine the two conditions, so any row meeting either condition is retained.
  - The resulting filtered DataFrame will contain only the primary department for each employee.
  - The final filtered DataFrame will only retain two columns: \`"employee_id"\` and \`"department_id"\`.

<table>
   <thead>
      <tr>
         <th>employee_id</th>
         <th>department_id</th>
      </tr>
   </thead>
   <tbody>
      <tr>
         <td>1</td>
         <td>1</td>
      </tr>
      <tr>
         <td>2</td>
         <td>1</td>
      </tr>
      <tr>
         <td>3</td>
         <td>3</td>
      </tr>
      <tr>
         <td>4</td>
         <td>3</td>
      </tr>
   </tbody>
</table>
<br>

 **Step 3 - Return Result**:
\`\`\`python
 return result
\`\`\`
  - Return the filtered DataFrame as the result.

In essence, the function works efficiently by leveraging the power of pandas to group and transform the data. It ensures that the output DataFrame contains only the primary department for each employee, whether they belong to one or multiple departments.
#### Implementation

Based on the understanding above, the solution can be implemented as:

<iframe src="https://leetcode.com/playground/Yf372Pmr/shared" frameBorder="0" width="100%" height="310" name="Yf372Pmr"></iframe>

---

## Database
### Approach 1: \`UNION\`

#### Intuition

The \`UNION\` approach combines two distinct sets of logic using the \`UNION\` operator. Here's the intuition behind each part:

**Step 1 - Retrieving employees with primary_flag set to 'Y'**:
\`\`\`sql
SELECT 
  employee_id, 
  department_id 
FROM 
  Employee 
WHERE 
  primary_flag = 'Y'
\`\`\`
  - This part selects those employees that have been explicitly marked as having a particular department as their primary. 
  - For employees who belong to multiple departments, one of those departments will have the \`primary_flag\` set to 'Y', which denotes it as the primary department.
  - The SQL code fetches \`employee_id\` and \`department_id\` where \`primary_flag\` is 'Y'.
  
**Step 2 - Retrieving employees that appear exactly once in the Employee table**:
\`\`\`sql
SELECT 
  employee_id, 
  department_id 
FROM 
  Employee 
GROUP BY 
  employee_id 
HAVING 
  COUNT(employee_id) = 1
\`\`\`
  - The objective here is to capture employees who are associated with only one department. In such cases, that single department is automatically their primary department.
  - The code groups the records in the \`Employee\` table by \`employee_id\` using \`GROUP BY\`. For each employee ID, it then checks the count of associated rows (or departments).
  - The \`HAVING\` clause filters out groups where the count of rows (i.e., departments) for that employee is not equal to 1.
  - This way, only those employees who are associated with a single department are selected.

**Step 3 - Combining both results with UNION**:
\`\`\`sql
SELECT 
  employee_id, 
  department_id 
FROM 
  Employee 
WHERE 
  primary_flag = 'Y' 
UNION 
SELECT 
  employee_id, 
  department_id 
FROM 
  Employee 
GROUP BY 
  employee_id 
HAVING 
  COUNT(employee_id) = 1;
\`\`\`
  - \`UNION\` is an SQL operator that combines the results of two SELECT statements into a single set of rows. It automatically removes duplicates.
  - Here, it's used to merge the results from the two aforementioned logics: those with \`primary_flag = 'Y'\` and those appearing only once in the table.
  - The final output is a unified list containing the primary department for each employee.

In essence, the SQL code ensures that for every employee, either their explicitly marked primary department is selected, or if they belong to only one department, that department is picked as the primary.

#### Implementation

Based on the understanding above, the solution can be implemented as:

\`\`\`sql
-- Retrieving employees with primary_flag set to 'Y'
SELECT 
  employee_id, 
  department_id 
FROM 
  Employee 
WHERE 
  primary_flag = 'Y' 
UNION 
-- Retrieving employees that appear exactly once in the Employee table
SELECT 
  employee_id, 
  department_id 
FROM 
  Employee 
GROUP BY 
  employee_id 
HAVING 
  COUNT(employee_id) = 1;

\`\`\`

### Approach 2: Window Function (\`COUNT\`)

#### Intuition

This approach uses an *advanced* SQL feature called window functions, specifically \`COUNT() OVER()\`. Here's the intuition for each step:

**Step 1 - Inner Query with Window Function**:
\`\`\`sql
SELECT 
  *, 
  COUNT(employee_id) OVER(PARTITION BY employee_id) AS EmployeeCount 
FROM 
  Employee
\`\`\`
  - This query fetches all columns from the \`Employee\` table and adds a new computed column, \`EmployeeCount\`.
  - \`COUNT(employee_id) OVER(PARTITION BY employee_id)\` is a window function. Let's break down what it does:
      - \`PARTITION BY employee_id\`: This breaks down the data into 'windows' or 'partitions' of rows that have the same \`employee_id\`. Each window is essentially a subset of the data for a specific employee.
      - \`COUNT(employee_id) OVER(...)\`: This counts the number of rows (i.e., the number of departments) for each employee within their respective partition/window. The result is a new column, \`EmployeeCount\`, which tells us how many departments each employee is associated with. This count is repeated for every row of the same employee.

**Step 2 - Alias & Outer Query**:
\`\`\`sql
SELECT 
  employee_id, 
  department_id 
FROM 
  EmployeePartition 
\`\`\`
  - The inner query result is treated as a temporary table named \`EmployeePartition\`.
  - From this table, we select the desired columns: \`employee_id\` and \`department_id\`.

**Step 3 - Filtering with WHERE Clause**:
\`\`\`sql
WHERE 
  EmployeeCount = 1 
  OR primary_flag = 'Y'
\`\`\`
  - We have two conditions to filter out the primary department for each employee:
      1. \`EmployeeCount = 1\`: This captures those employees who belong to only one department. For them, that single department is automatically their primary department.
      2. \`primary_flag = 'Y'\`: This captures employees who belong to multiple departments but have one department explicitly marked as primary with a flag 'Y'.
  - The \`OR\` operator is used, so any row satisfying either of the above conditions is included in the result.

**Summary**:
The code first assigns an employee department count to each row using a window function. It then filters out the desired rows based on whether an employee is associated with just one department or has a department explicitly flagged as primary. The end result is a list of primary departments for each employee.

#### Implementation

Based on the understanding above, the solution can be implemented as:

\`\`\`sql
SELECT 
  employee_id, 
  department_id 
FROM 
  (
    SELECT 
      *, 
      COUNT(employee_id) OVER(PARTITION BY employee_id) AS EmployeeCount
    FROM 
      Employee
  ) EmployeePartition 
WHERE 
  EmployeeCount = 1 
  OR primary_flag = 'Y';

\`\`\``,
        "originalCategory": "advanced"
    },
    {
        "id": "1795",
        "title": "Rearrange Products Table",
        "difficulty": "easy",
        "description": "<p>Table: <code>Products</code></p>\n\n<pre>\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| product_id  | int     |\n| store1      | int     |\n| store2      | int     |\n| store3      | int     |\n+-------------+---------+\nproduct_id is the primary key (column with unique values) for this table.\nEach row in this table indicates the product&#39;s price in 3 different stores: store1, store2, and store3.\nIf the product is not available in a store, the price will be null in that store&#39;s column.\n</pre>\n\n<p>&nbsp;</p>\n\n<p>Write a solution to rearrange the <code>Products</code> table so that each row has <code>(product_id, store, price)</code>. If a product is not available in a store, do <strong>not</strong> include a row with that <code>product_id</code> and <code>store</code> combination in the result table.</p>\n\n<p>Return the result table in <strong>any order</strong>.</p>\n\n<p>The result format is in the following example.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> \nProducts table:\n+------------+--------+--------+--------+\n| product_id | store1 | store2 | store3 |\n+------------+--------+--------+--------+\n| 0          | 95     | 100    | 105    |\n| 1          | 70     | null   | 80     |\n+------------+--------+--------+--------+\n<strong>Output:</strong> \n+------------+--------+-------+\n| product_id | store  | price |\n+------------+--------+-------+\n| 0          | store1 | 95    |\n| 0          | store2 | 100   |\n| 0          | store3 | 105   |\n| 1          | store1 | 70    |\n| 1          | store3 | 80    |\n+------------+--------+-------+\n<strong>Explanation:</strong> \nProduct 0 is available in all three stores with prices 95, 100, and 105 respectively.\nProduct 1 is available in store1 with price 70 and store3 with price 80. The product is not available in store2.\n</pre>\n",
        "schema": "Create table If Not Exists Products (product_id int, store1 int, store2 int, store3 int)\nTruncate table Products\ninsert into Products (product_id, store1, store2, store3) values ('0', '95', '100', '105')\ninsert into Products (product_id, store1, store2, store3) values ('1', '70', NULL, '80')",
        "slug": "rearrange-products-table",
        "originalCategory": "advanced"
    },
    {
        "id": "1821",
        "title": "Find Customers With Positive Revenue this Year",
        "difficulty": "easy",
        "description": "<p>Table: <code>Customers</code></p>\\n\\n<pre>\\n+-------------+------------+------------+\\n| customer_id | year       | revenue    |\\n+-------------+------------+------------+\\n| int         | int        | int        |\\n+-------------+------------+------------+\\n</pre>\\n\\n<p>&nbsp;</p>\\n\\n<p>Write a solution to report the customers with <strong>positive revenue</strong> in the year <strong>2021</strong>. Return the result table in <strong>any order</strong>.</p>\\n\\n<p>The result format is in the following example.</p>\\n\\n<p>&nbsp;</p>\\n<p><strong class=\\\"example\\\">Example 1:</strong></p>\\n\\n<pre>\\n<strong>Input:</strong> \\nCustomers table:\\n+-------------+------+---------+\\n| customer_id | year | revenue |\\n+-------------+------+---------+\\n| 1           | 2018 | 50      |\\n| 1           | 2021 | 30      |\\n| 1           | 2020 | 70      |\\n| 2           | 2021 | -50     |\\n| 3           | 2018 | 10      |\\n| 3           | 2016 | 50      |\\n| 4           | 2021 | 20      |\\n+-------------+------+---------+\\n<strong>Output:</strong> \\n+-------------+\\n| customer_id |\\n+-------------+\\n| 1           |\\n| 4           |\\n+-------------+\\n<strong>Explanation:</strong> \\nCustomer 1 has revenue 30 in 2021. Customer 2 has revenue -50 in 2021 (not positive). Customer 3 has no entry for 2021. Customer 4 has revenue 20 in 2021.\\n</pre>\\n",
        "schema": "Create table If Not Exists Customers (customer_id int, year int, revenue int)\nTruncate table Customers\ninsert into Customers (customer_id, year, revenue) values ('1', '2018', '50')\ninsert into Customers (customer_id, year, revenue) values ('1', '2021', '30')\ninsert into Customers (customer_id, year, revenue) values ('1', '2020', '70')\ninsert into Customers (customer_id, year, revenue) values ('2', '2021', '-50')\ninsert into Customers (customer_id, year, revenue) values ('3', '2018', '10')\ninsert into Customers (customer_id, year, revenue) values ('3', '2016', '50')\ninsert into Customers (customer_id, year, revenue) values ('4', '2021', '20')",
        "slug": "find-customers-with-positive-revenue-this-year",
        "originalCategory": "advanced"
    },
    {
        "id": "1873",
        "title": "Calculate Special Bonus",
        "difficulty": "easy",
        "description": "<p>Table: <code>Employees</code></p>\n\n<pre>\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| employee_id | int     |\n| name        | varchar |\n| salary      | int     |\n+-------------+---------+\nemployee_id is the primary key (column with unique values) for this table.\nEach row of this table indicates the employee ID, employee name, and salary.\n</pre>\n\n<p>&nbsp;</p>\n\n<p>Write a solution to calculate the bonus of each employee. The bonus of an employee is <code>100%</code> of their salary if the ID of the employee is <strong>an odd number</strong> and <strong>the employee&#39;s name does not start with the character </strong><code>&#39;M&#39;</code>. The bonus of an employee is <code>0</code> otherwise.</p>\n\n<p>Return the result table ordered by <code>employee_id</code>.</p>\n\n<p>The&nbsp;result format is in the following example.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> \nEmployees table:\n+-------------+---------+--------+\n| employee_id | name    | salary |\n+-------------+---------+--------+\n| 2           | Meir    | 3000   |\n| 3           | Michael | 3800   |\n| 7           | Addilyn | 7400   |\n| 8           | Juan    | 6100   |\n| 9           | Kannon  | 7700   |\n+-------------+---------+--------+\n<strong>Output:</strong> \n+-------------+-------+\n| employee_id | bonus |\n+-------------+-------+\n| 2           | 0     |\n| 3           | 0     |\n| 7           | 7400  |\n| 8           | 0     |\n| 9           | 7700  |\n+-------------+-------+\n<strong>Explanation:</strong> \nThe employees with IDs 2 and 8 get 0 bonus because they have an even employee_id.\nThe employee with ID 3 gets 0 bonus because their name starts with &#39;M&#39;.\nThe rest of the employees get a 100% bonus.\n</pre>\n",
        "schema": "Create table If Not Exists Employees (employee_id int, name varchar(30), salary int)\nTruncate table Employees\ninsert into Employees (employee_id, name, salary) values ('2', 'Meir', '3000')\ninsert into Employees (employee_id, name, salary) values ('3', 'Michael', '3800')\ninsert into Employees (employee_id, name, salary) values ('7', 'Addilyn', '7400')\ninsert into Employees (employee_id, name, salary) values ('8', 'Juan', '6100')\ninsert into Employees (employee_id, name, salary) values ('9', 'Kannon', '7700')",
        "slug": "calculate-special-bonus",
        "originalCategory": "advanced"
    },
    {
        "id": "1965",
        "title": "Employees With Missing Information",
        "difficulty": "easy",
        "description": "<p>Table: <code>Employees</code></p>\n\n<pre>\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| employee_id | int     |\n| name        | varchar |\n+-------------+---------+\nemployee_id is the column with unique values for this table.\nEach row of this table indicates the name of the employee whose ID is employee_id.\n</pre>\n\n<p>&nbsp;</p>\n\n<p>Table: <code>Salaries</code></p>\n\n<pre>\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| employee_id | int     |\n| salary      | int     |\n+-------------+---------+\nemployee_id is the column with unique values for this table.\nEach row of this table indicates the salary of the employee whose ID is employee_id.\n</pre>\n\n<p>&nbsp;</p>\n\n<p>Write a solution to report the IDs of all the employees with <strong>missing information</strong>. The information of an employee is missing if:</p>\n\n<ul>\n\t<li>The employee&#39;s <strong>name</strong> is missing, or</li>\n\t<li>The employee&#39;s <strong>salary</strong> is missing.</li>\n</ul>\n\n<p>Return the result table ordered by <code>employee_id</code> <strong>in ascending order</strong>.</p>\n\n<p>The result format is in the following example.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> \nEmployees table:\n+-------------+----------+\n| employee_id | name     |\n+-------------+----------+\n| 2           | Crew     |\n| 4           | Haven    |\n| 5           | Kristian |\n+-------------+----------+\nSalaries table:\n+-------------+--------+\n| employee_id | salary |\n+-------------+--------+\n| 5           | 76071  |\n| 1           | 22517  |\n| 4           | 63539  |\n+-------------+--------+\n<strong>Output:</strong> \n+-------------+\n| employee_id |\n+-------------+\n| 1           |\n| 2           |\n+-------------+\n<strong>Explanation:</strong> \nEmployees 1, 2, 4, and 5 are working at this company.\nThe name of employee 1 is missing.\nThe salary of employee 2 is missing.\n</pre>\n",
        "schema": "Create table If Not Exists Employees (employee_id int, name varchar(30))\nCreate table If Not Exists Salaries (employee_id int, salary int)\nTruncate table Employees\ninsert into Employees (employee_id, name) values ('2', 'Crew')\ninsert into Employees (employee_id, name) values ('4', 'Haven')\ninsert into Employees (employee_id, name) values ('5', 'Kristian')\nTruncate table Salaries\ninsert into Salaries (employee_id, salary) values ('5', '76071')\ninsert into Salaries (employee_id, salary) values ('1', '22517')\ninsert into Salaries (employee_id, salary) values ('4', '63539')",
        "slug": "employees-with-missing-information",
        "editorial": `[TOC]

# Solution

---

## pandas

### Approach 1: Using \`XOR\` ("exclusive or")

The use of set operations significantly simplifies the logic needed to identify discrepancies between the two datasets. Instead of iterating over both tables and manually checking for the presence or absence of each \`employee_id\`, the solution elegantly leverages Python's built-in set functionalities.

#### Intuition

Here's the breakdown of the code's logic and intuition:

**Understanding the DataFrames**

- **\`employees\` DataFrame**: Contains employee records with at least two columns: \`employee_id\` and \`name\`.
- **\`salaries\` DataFrame**: Contains salary information with at least two columns: \`employee_id\` and \`salary\`.

  Both DataFrames are indexed by \`employee_id\`, which is unique across entries within each table but may not be consistently present across both tables.

**Key Steps and Their Intuition**

1. **Conversion to Sets**: The first step involves converting the \`employee_id\` column of each DataFrame into a set:
   - \`set(employees.employee_id)\`: Creates a set of employee IDs from the \`employees\` DataFrame.
   - \`set(salaries.employee_id)\`: Creates a set of employee IDs from the \`salaries\` DataFrame.

   This conversion is crucial for leveraging the properties of sets, which inherently remove duplicates and allow for efficient set operations like the symmetric difference.

2. **Symmetric Difference (\`^\`)**: The operation \`set(employees.employee_id) ^ set(salaries.employee_id)\` computes the symmetric difference between the two sets of IDs. The symmetric difference between two sets returns a set containing elements present in either set but not in both. In the context of this problem, it identifies:
   - Employee IDs present in the \`employees\` DataFrame but not in the \`salaries\` DataFrame (indicating missing salary information).
   - Employee IDs present in the \`salaries\` DataFrame but not in the \`employees\` DataFrame (indicating missing employee information, such as names).

3. **Sorting and Creating a DataFrame**: The sorted list of IDs from the symmetric difference operation ensures that the output is ordered by \`employee_id\` in ascending order, as required by the problem statement. This list is then used to create a new DataFrame:
   - \`pd.DataFrame({"employee_id": sorted(...)})\`: Constructs a new DataFrame with a single column, \`employee_id\`, containing the sorted IDs of employees with missing information.

#### Implementation

<iframe src="https://leetcode.com/playground/5pt9jfA2/shared" frameBorder="0" width="100%" height="174" name="5pt9jfA2"></iframe>

### Approach 2: Using Outer Join

The use of an outer join in the merge operation is a strategic choice that ensures no \`employee_id\` is overlooked, capturing the full scope of the dataset across both tables. Filtering for rows with any missing data is a direct and efficient method to highlight discrepancies, leveraging pandas' built-in functionality for handling missing values. By focusing on the \`employee_id\` column and ordering the results, the implementation provides a clear, concise output that directly addresses the problem statement. This method hinges on the \`merge\` function with an \`outer\` join and then filtering for rows where data is missing.


#### Intuition

Let's review the intuition behind each step given the following input DataFrames:

Employees DataFrame (\`employees\`):

| employee_id | name     |
| ----------- | -------- |
| 2           | Crew     |
| 4           | Haven    |
| 5           | Kristian |

<br>

Salaries DataFrame (\`salaries\`):

| employee_id | salary |
| ----------- | ------ |
| 5           | 76071  |
| 1           | 22517  |
| 4           | 63539  |

<br>

1. **Merging DataFrames on \`employee_id\` with an Outer Join**

- This step creates a complete view of the dataset, combining both employee names and salaries. The use of an outer join is crucial for identifying missing information because it retains all \`employee_id\`s, irrespective of whether the corresponding data is available in both tables.

   \`\`\`python
   merged_df = pd.merge(employees, salaries, on="employee_id", how="outer")
   \`\`\`
- The \`outer\` join ensures that the merged DataFrame includes all records from both \`employees\` and \`salaries\` DataFrames. If an \`employee_id\` exists in one DataFrame but not the other, the merged DataFrame will still include a row for this \`employee_id\`, with missing values (\`NaN\`) in the columns from the DataFrame where the \`employee_id\` was absent.

\`merged_df\`:

| employee_id | name     | salary |
| ----------- | -------- | ------ |
| 2           | Crew     | null   |
| 4           | Haven    | 63539  |
| 5           | Kristian | 76071  |
| 1           | null     | 22517  |

<br>


2. **Identifying Rows with Missing Values**

- This step pinpoints exactly which employees are missing information (either their name in the \`employees\` table or their salary in the \`salaries\` table). By focusing on rows with missing data, this effectively filters out all complete records, leaving only those with discrepancies.

   \`\`\`python
   missing_data_df = merged_df[merged_df.isna().any(axis=1)]
   \`\`\`
- The \`.isna()\` method identifies \`NaN\` values in the DataFrame, and \`.any(axis=1)\` checks each row to see if it contains any \`NaN\` values. Rows that return \`True\` for this condition have missing information in at least one column.

\`missing_data_df\`:

| employee_id | name  | salary |
| ----------- | ----- | ------ |
| 2           | Crew  | null   |
| 1           | null  | 22517  |

<br>


3. **Identifying Rows with Missing Values**

- This step isolates the \`employee_id\` column, which is the primary piece of information requested. By narrowing down to this column, the result is streamlined to only include the necessary data.

   \`\`\`python
   result_df = missing_data_df[["employee_id"]].sort_values(by="employee_id")
   \`\`\`
- Sorting the values by \`employee_id\` ensures that the output is organized in ascending order, as per the problem's requirements.

\`result_df\`:

| employee_id |
| ----------- |
| 1           |
| 2           |

<br>


#### Implementation

<iframe src="https://leetcode.com/playground/J2oidV8M/shared" frameBorder="0" width="100%" height="293" name="J2oidV8M"></iframe>

---

## Database

### Approach 1: Simulate Full Join via Unioning a Left and Right Join

The provided SQL solution adeptly addresses the problem of identifying employees with missing information across two tables, \`Employees\` and \`Salaries\`, without directly using a \`FULL JOIN\` operation, which might not be supported in all SQL environments. It ingeniously simulates a full outer join by combining the results of a \`LEFT JOIN\` and a \`RIGHT JOIN\` between the two tables, using the \`UNION\` operator to merge these results while removing duplicates. This method ensures that all employee records are considered, capturing instances where an employee's name or salary information is missing by including rows with \`NULL\` values in either the \`name\` or \`salary\` fields. The query then filters these merged results to isolate records with missing information, specifically targeting rows where either \`name\` or \`salary\` is \`NULL\`. Finally, it orders the remaining records by \`employee_id\` in ascending order, thereby producing a structured and clear output that lists all employees lacking complete information.  


#### Intuition

Let's break down the SQL query step by step and explain the intuition behind each part:

1. **Full Join Using Left and Right Joins**

   SQL's \`FULL JOIN\` operation combines the results of both \`LEFT JOIN\` and \`RIGHT JOIN\`, including all records from both tables, and fills in \`NULL\`s where there are no matches. Since not all database systems support \`FULL JOIN\` directly, this solution cleverly simulates it using a combination of \`LEFT JOIN\` and \`RIGHT JOIN\`, followed by a \`UNION\`.

   - **Left Join \`Employees\` and \`Salaries\`**: This part of the query retrieves all records from \`Employees\` and their matching records from \`Salaries\`. If there is no matching \`employee_id\` in \`Salaries\`, the salary columns for those records will be \`NULL\`.
   \`\`\`sql
   SELECT * FROM Employees LEFT JOIN Salaries USING(employee_id)
   \`\`\`
     

   - **Right Join \`Employees\` and \`Salaries\`**: Conversely, this retrieves all records from \`Salaries\` and their matching records from \`Employees\`. If there is no matching \`employee_id\` in \`Employees\`, the employee name columns for those records will be \`NULL\`.
   \`\`\`sql
   SELECT * FROM Employees RIGHT JOIN Salaries USING(employee_id)
   \`\`\`
   

   -  **Union of Left and Right Joins**:
   The \`UNION\` operator is used to combine the results of the left and right joins. \`UNION\` automatically removes duplicate rows that might occur in the case where an \`employee_id\` exists in both tables. This effectively simulates a full outer join by ensuring all unique \`employee_id\`s from both tables are included in the result, with \`NULL\` values where information is missing.



2. **Filtering for Missing Information**
   - After simulating the full join, the query filters the results to include only those rows where either \`salary\` or \`name\` is \`NULL\`. This directly targets employees with missing information, aligning with the query's goal.

   \`\`\`sql
   WHERE T.salary IS NULL OR T.name IS NULL
   \`\`\`


3. **Ordering the Results**

   - Finally, the query orders the results by \`employee_id\` in ascending order, as per the problem's requirements.

   \`\`\`sql
   ORDER BY employee_id;
   \`\`\`


#### Implementation


\`\`\`mysql []
SELECT 
  T.employee_id 
FROM 
  (
    SELECT 
      * 
    FROM 
      Employees 
      LEFT JOIN Salaries USING(employee_id) 
    UNION 
    SELECT 
      * 
    FROM 
      Employees 
      RIGHT JOIN Salaries USING(employee_id)
  ) AS T 
WHERE 
  T.salary IS NULL 
  OR T.name IS NULL 
ORDER BY 
  employee_id;
\`\`\`

### Approach 2: \`UNION\` with \`WHERE ... NOT IN\`

This SQL solution methodically addresses the problem of identifying missing employee information by checking each table for the presence of \`employee_id\`s that are not found in the other. It utilizes \`WHERE ... NOT IN\` clauses to filter for these discrepancies and then merges and sorts the results. This approach is particularly effective for databases where direct comparison operations between two tables are needed to find mismatches, offering a clear and systematic method to highlight missing data points.

#### Intuition

Let's break down the SQL query step by step and explain the intuition behind each part:


1. **First Query: Finding Employees Missing Salary Information**

 - **Subquery**: The inner query \`(SELECT employee_id FROM Salaries)\` generates a list of all employee IDs present in the \`Salaries\` table.
 - **Main Query**: The main query selects \`employee_id\` from the \`Employees\` table where the \`employee_id\` is not found in the list produced by the subquery. 
 - This effectively identifies employees who have a record in the \`Employees\` table (i.e., they are known to the company by name) but do not have corresponding salary information in the \`Salaries\` table. The use of \`NOT IN\` is crucial here as it filters out employees whose IDs are present in the \`Salaries\` table, leaving only those missing salary data.

   \`\`\`sql
   SELECT employee_id FROM Employees WHERE employee_id NOT IN (SELECT employee_id FROM Salaries)
   \`\`\`

2. **Second Query: Finding Employees Missing in Employees Table**

 - **Subquery**: Similar to the first query, but this time it generates a list of all employee IDs present in the \`Employees\` table.
 - **Main Query**: Selects \`employee_id\` from the \`Salaries\` table where the \`employee_id\` is not found in the list from the \`Employees\` table.
 - This identifies the opposite situation from the first query; it finds employees who have salary information recorded in the \`Salaries\` table but do not have a corresponding entry in the \`Employees\` table (i.e., their name or other details might be missing).

   \`\`\`sql
   SELECT employee_id FROM Salaries WHERE employee_id NOT IN (SELECT employee_id FROM Employees)
   \`\`\`

3. **Combining Results with UNION**

- The \`UNION\` operator is used to combine the results of the two queries above. It ensures that each \`employee_id\` is listed only once, even if it might meet the criteria of both queries (though logically, an ID should only meet one of the criteria if the data integrity is maintained).
- By using \`UNION\`, the solution aggregates all unique instances of missing information across both tables into a single list of \`employee_id\`s, irrespective of the type of missing information (name or salary).

### Ordering the Results

- The final instruction orders the combined results by \`employee_id\` in ascending order, as per the problem's requirements.

   \`\`\`sql
   ORDER BY employee_id ASC
   \`\`\`


#### Implementation


\`\`\`mysql []
SELECT 
  employee_id 
FROM 
  Employees 
WHERE 
  employee_id NOT IN (
    SELECT 
      employee_id 
    FROM 
      Salaries
  ) 
UNION 
SELECT 
  employee_id 
FROM 
  Salaries 
WHERE 
  employee_id NOT IN (
    SELECT 
      employee_id 
    FROM 
      Employees
  ) 
ORDER BY 
  employee_id ASC
\`\`\``,
        "originalCategory": "advanced"
    },
    {
        "id": "180",
        "title": "Consecutive Numbers",
        "difficulty": "medium",
        "description": "<p>Table: <code>Logs</code></p>\n\n<pre>\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| num         | varchar |\n+-------------+---------+\nIn SQL, id is the primary key for this table.\nid is an autoincrement column starting from 1.\n</pre>\n\n<p>&nbsp;</p>\n\n<p>Find all numbers that appear at least three times consecutively.</p>\n\n<p>Return the result table in <strong>any order</strong>.</p>\n\n<p>The&nbsp;result format is in the following example.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> \nLogs table:\n+----+-----+\n| id | num |\n+----+-----+\n| 1  | 1   |\n| 2  | 1   |\n| 3  | 1   |\n| 4  | 2   |\n| 5  | 1   |\n| 6  | 2   |\n| 7  | 2   |\n+----+-----+\n<strong>Output:</strong> \n+-----------------+\n| ConsecutiveNums |\n+-----------------+\n| 1               |\n+-----------------+\n<strong>Explanation:</strong> 1 is the only number that appears consecutively for at least three times.\n</pre>\n",
        "schema": "Create table If Not Exists Logs (id int, num int)\nTruncate table Logs\ninsert into Logs (id, num) values ('1', '1')\ninsert into Logs (id, num) values ('2', '1')\ninsert into Logs (id, num) values ('3', '1')\ninsert into Logs (id, num) values ('4', '2')\ninsert into Logs (id, num) values ('5', '1')\ninsert into Logs (id, num) values ('6', '2')\ninsert into Logs (id, num) values ('7', '2')",
        "slug": "consecutive-numbers",
        "editorial": `[TOC]

## Solution
---
### Approach: Using \`DISTINCT\` and \`WHERE\` clause [Accepted]

**Algorithm**

Consecutive appearing means the Id of the Num are next to each others. Since this problem asks for numbers appearing at least three times consecutively, we can use 3 aliases for this table **Logs**, and then check whether 3 consecutive numbers are all the same.

\`\`\`sql
SELECT *
FROM
    Logs l1,
    Logs l2,
    Logs l3
WHERE
    l1.Id = l2.Id - 1
    AND l2.Id = l3.Id - 1
    AND l1.Num = l2.Num
    AND l2.Num = l3.Num
;
\`\`\`
| Id | Num | Id | Num | Id | Num |
|----|-----|----|-----|----|-----|
| 1  | 1   | 2  | 1   | 3  | 1   |
>Note: The first two columns are from l1, then the next two are from l2, and the last two are from l3.

Then we can select any *Num* column from the above table to get the target data. However, we need to add a keyword \`DISTINCT\` because it will display a duplicated number if one number appears more than 3 times consecutively.

**MySQL**

\`\`\`sql
SELECT DISTINCT
    l1.Num AS ConsecutiveNums
FROM
    Logs l1,
    Logs l2,
    Logs l3
WHERE
    l1.Id = l2.Id - 1
    AND l2.Id = l3.Id - 1
    AND l1.Num = l2.Num
    AND l2.Num = l3.Num
;
\`\`\``,
        "originalCategory": "advanced"
    },
    {
        "id": "184",
        "title": "Department Highest Salary",
        "difficulty": "medium",
        "description": "<p>Table: <code>Employee</code></p>\n\n<pre>\n+--------------+---------+\n| Column Name  | Type    |\n+--------------+---------+\n| id           | int     |\n| name         | varchar |\n| salary       | int     |\n| departmentId | int     |\n+--------------+---------+\nid is the primary key (column with unique values) for this table.\ndepartmentId is a foreign key (reference columns) of the ID from the <code>Department </code>table.\nEach row of this table indicates the ID, name, and salary of an employee. It also contains the ID of their department.\n</pre>\n\n<p>&nbsp;</p>\n\n<p>Table: <code>Department</code></p>\n\n<pre>\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| name        | varchar |\n+-------------+---------+\nid is the primary key (column with unique values) for this table. It is guaranteed that department name is not <code>NULL.</code>\nEach row of this table indicates the ID of a department and its name.\n</pre>\n\n<p>&nbsp;</p>\n\n<p>Write a solution to find employees who have the highest salary in each of the departments.</p>\n\n<p>Return the result table in <strong>any order</strong>.</p>\n\n<p>The result format is in the following example.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> \nEmployee table:\n+----+-------+--------+--------------+\n| id | name  | salary | departmentId |\n+----+-------+--------+--------------+\n| 1  | Joe   | 70000  | 1            |\n| 2  | Jim   | 90000  | 1            |\n| 3  | Henry | 80000  | 2            |\n| 4  | Sam   | 60000  | 2            |\n| 5  | Max   | 90000  | 1            |\n+----+-------+--------+--------------+\nDepartment table:\n+----+-------+\n| id | name  |\n+----+-------+\n| 1  | IT    |\n| 2  | Sales |\n+----+-------+\n<strong>Output:</strong> \n+------------+----------+--------+\n| Department | Employee | Salary |\n+------------+----------+--------+\n| IT         | Jim      | 90000  |\n| Sales      | Henry    | 80000  |\n| IT         | Max      | 90000  |\n+------------+----------+--------+\n<strong>Explanation:</strong> Max and Jim both have the highest salary in the IT department and Henry has the highest salary in the Sales department.\n</pre>\n",
        "schema": "Create table If Not Exists Employee (id int, name varchar(255), salary int, departmentId int)\nCreate table If Not Exists Department (id int, name varchar(255))\nTruncate table Employee\ninsert into Employee (id, name, salary, departmentId) values ('1', 'Joe', '70000', '1')\ninsert into Employee (id, name, salary, departmentId) values ('2', 'Jim', '90000', '1')\ninsert into Employee (id, name, salary, departmentId) values ('3', 'Henry', '80000', '2')\ninsert into Employee (id, name, salary, departmentId) values ('4', 'Sam', '60000', '2')\ninsert into Employee (id, name, salary, departmentId) values ('5', 'Max', '90000', '1')\nTruncate table Department\ninsert into Department (id, name) values ('1', 'IT')\ninsert into Department (id, name) values ('2', 'Sales')",
        "slug": "department-highest-salary",
        "originalCategory": "advanced"
    },
    {
        "id": "608",
        "title": "Tree Node",
        "difficulty": "medium",
        "description": "<p>Table: <code>Tree</code></p>\n\n<pre>\n+-------------+------+\n| Column Name | Type |\n+-------------+------+\n| id          | int  |\n| p_id        | int  |\n+-------------+------+\nid is the column with unique values for this table.\nEach row of this table contains information about the id of a node and the id of its parent node in a tree.\nThe given structure is always a valid tree.\n</pre>\n\n<p>&nbsp;</p>\n\n<p>Each node in the tree can be one of three types:</p>\n\n<ul>\n\t<li><strong>&quot;Leaf&quot;</strong>: if the node is a leaf node.</li>\n\t<li><strong>&quot;Root&quot;</strong>: if the node is the root of the tree.</li>\n\t<li><strong>&quot;Inner&quot;</strong>: If the node is neither a leaf node nor a root node.</li>\n</ul>\n\n<p>Write a solution to report the type of each node in the tree.</p>\n\n<p>Return the result table in <strong>any order</strong>.</p>\n\n<p>The result format is in the following example.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2021/10/22/tree1.jpg\" style=\"width: 304px; height: 224px;\" />\n<pre>\n<strong>Input:</strong> \nTree table:\n+----+------+\n| id | p_id |\n+----+------+\n| 1  | null |\n| 2  | 1    |\n| 3  | 1    |\n| 4  | 2    |\n| 5  | 2    |\n+----+------+\n<strong>Output:</strong> \n+----+-------+\n| id | type  |\n+----+-------+\n| 1  | Root  |\n| 2  | Inner |\n| 3  | Leaf  |\n| 4  | Leaf  |\n| 5  | Leaf  |\n+----+-------+\n<strong>Explanation:</strong> \nNode 1 is the root node because its parent node is null and it has child nodes 2 and 3.\nNode 2 is an inner node because it has parent node 1 and child node 4 and 5.\nNodes 3, 4, and 5 are leaf nodes because they have parent nodes and they do not have child nodes.\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2021/10/22/tree2.jpg\" style=\"width: 64px; height: 65px;\" />\n<pre>\n<strong>Input:</strong> \nTree table:\n+----+------+\n| id | p_id |\n+----+------+\n| 1  | null |\n+----+------+\n<strong>Output:</strong> \n+----+-------+\n| id | type  |\n+----+-------+\n| 1  | Root  |\n+----+-------+\n<strong>Explanation:</strong> If there is only one node on the tree, you only need to output its root attributes.\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Note:</strong> This question is the same as <a href=\"https://leetcode.com/problems/binary-tree-nodes/description/\" target=\"_blank\"> 3054: Binary Tree Nodes.</a></p>\n",
        "schema": "Create table If Not Exists Tree (id int, p_id int)\nTruncate table Tree\ninsert into Tree (id, p_id) values ('1', NULL)\ninsert into Tree (id, p_id) values ('2', '1')\ninsert into Tree (id, p_id) values ('3', '1')\ninsert into Tree (id, p_id) values ('4', '2')\ninsert into Tree (id, p_id) values ('5', '2')",
        "slug": "tree-node",
        "originalCategory": "advanced"
    },
    {
        "id": "1077",
        "title": "Project Employees III",
        "difficulty": "medium",
        "description": "<p>Table: <code>Project</code></p>\\n\\n<pre>\\n+------------+-------------+\\n| project_id | employee_id |\\n+------------+-------------+\\n| int        | int         |\\n+------------+-------------+\\n</pre>\\n\\n<p>Table: <code>Employee</code></p>\\n\\n<pre>\\n+-------------+-------------+------------------+\\n| employee_id | name        | experience_years |\\n+-------------+-------------+------------------+\\n| int         | varchar(10) | int              |\\n+-------------+-------------+------------------+\\n</pre>\\n\\n<p>&nbsp;</p>\\n\\n<p>Report the <strong>most experienced</strong> employees in each project. If a project has multiple employees with the maximum number of experience years, report all of them. Return the result table in <strong>any order</strong>.</p>\\n\\n<p>The result format is in the following example.</p>\\n\\n<p>&nbsp;</p>\\n<p><strong class=\\\"example\\\">Example 1:</strong></p>\\n\\n<pre>\\n<strong>Input:</strong> \\nProject table:\\n+------------+-------------+\\n| project_id | employee_id |\\n+------------+-------------+\\n| 1          | 1           |\\n| 1          | 2           |\\n| 1          | 3           |\\n| 2          | 1           |\\n| 2          | 4           |\\n+------------+-------------+\\nEmployee table:\\n+-------------+--------+------------------+\\n| employee_id | name   | experience_years |\\n+-------------+--------+------------------+\\n| 1           | Khaled | 3                |\\n| 2           | Ali    | 2                |\\n| 3           | John   | 3                |\\n| 4           | Doe    | 2                |\\n+-------------+--------+------------------+\\n<strong>Output:</strong> \\n+------------+-------------+\\n| project_id | employee_id |\\n+------------+-------------+\\n| 1          | 1           |\\n| 1          | 3           |\\n| 2          | 1           |\\n+------------+-------------+\\n<strong>Explanation:</strong> \\nBoth employee 1 and 3 have 3 years of experience in project 1. Employee 1 has the most experience in project 2.\\n</pre>\\n",
        "schema": "Create table If Not Exists Project (project_id int, employee_id int)\nCreate table If Not Exists Employee (employee_id int, name varchar(10), experience_years int)\nTruncate table Project\ninsert into Project (project_id, employee_id) values ('1', '1')\ninsert into Project (project_id, employee_id) values ('1', '2')\ninsert into Project (project_id, employee_id) values ('1', '3')\ninsert into Project (project_id, employee_id) values ('2', '1')\ninsert into Project (project_id, employee_id) values ('2', '4')\nTruncate table Employee\ninsert into Employee (employee_id, name, experience_years) values ('1', 'Khaled', '3')\ninsert into Employee (employee_id, name, experience_years) values ('2', 'Ali', '2')\ninsert into Employee (employee_id, name, experience_years) values ('3', 'John', '3')\ninsert into Employee (employee_id, name, experience_years) values ('4', 'Doe', '2')",
        "slug": "project-employees-iii",
        "originalCategory": "advanced"
    },
    {
        "id": "1164",
        "title": "Product Price at a Given Date",
        "difficulty": "medium",
        "description": "<p>Table: <code>Products</code></p>\n\n<pre>\n+---------------+---------+\n| Column Name   | Type    |\n+---------------+---------+\n| product_id    | int     |\n| new_price     | int     |\n| change_date   | date    |\n+---------------+---------+\n(product_id, change_date) is the primary key (combination of columns with unique values) of this table.\nEach row of this table indicates that the price of some product was changed to a new price at some date.</pre>\n\n<p>Initially, all products have price 10.</p>\n\n<p>Write a solution to find the prices of all products on the date <code>2019-08-16</code>.</p>\n\n<p>Return the result table in <strong>any order</strong>.</p>\n\n<p>The result format is in the following example.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> \nProducts table:\n+------------+-----------+-------------+\n| product_id | new_price | change_date |\n+------------+-----------+-------------+\n| 1          | 20        | 2019-08-14  |\n| 2          | 50        | 2019-08-14  |\n| 1          | 30        | 2019-08-15  |\n| 1          | 35        | 2019-08-16  |\n| 2          | 65        | 2019-08-17  |\n| 3          | 20        | 2019-08-18  |\n+------------+-----------+-------------+\n<strong>Output:</strong> \n+------------+-------+\n| product_id | price |\n+------------+-------+\n| 2          | 50    |\n| 1          | 35    |\n| 3          | 10    |\n+------------+-------+\n</pre>\n",
        "schema": "Create table If Not Exists Products (product_id int, new_price int, change_date date)\nTruncate table Products\ninsert into Products (product_id, new_price, change_date) values ('1', '20', '2019-08-14')\ninsert into Products (product_id, new_price, change_date) values ('2', '50', '2019-08-14')\ninsert into Products (product_id, new_price, change_date) values ('1', '30', '2019-08-15')\ninsert into Products (product_id, new_price, change_date) values ('1', '35', '2019-08-16')\ninsert into Products (product_id, new_price, change_date) values ('2', '65', '2019-08-17')\ninsert into Products (product_id, new_price, change_date) values ('3', '20', '2019-08-18')",
        "slug": "product-price-at-a-given-date",
        "editorial": `[TOC]

## Solution

---

### Overview

> **Problem reference:** Find the price of all products on the given date(\`2019-08-16\`). Assume the price before any change is \`10\`. Return the result table in any order.

We need to find the last changed price for each product until the given date (\`2019-08-16\`). If a product does not have an update before this date, the result for that product will be \`NULL\`. We need to handle \`NULL\` values so that the price is \`10\`.

---

### Approach 1: Divide cases by using \`UNION ALL\`

#### Intuition

We can separate the cases by using the \`UNION ALL\` keyword. If the first changed date (\`change_date\`) is over the given date (\`2019-08-16\`), the price wasn't changed in time, so the \`new_price\` field is the old value \`10\`. Otherwise, we need to find the last changed date for the other rows by grouping to get the last changed price (\`new_price\`).

We know there are no duplicated tuples when we union the two separated tables because we get one field using \`GROUP BY\` for each query. Thus, it would be better to use \`UNION ALL\` instead of \`UNION\` for performance.

Also, we should be careful with grouping the table to get the last changed price because we cannot get the price directly by using a single \`GROUP BY\` clause. For example, if we group the example case where the \`change_date\` field is under \`'2019-08-16\` inclusive, it looks like the one below.

\`\`\`
+------------+-----------+------------------+
| product_id | new_price | last_change_date |
+------------+-----------+------------------+
| 1          | 20        | 2019-08-16       |
| 1          | 30        | 2019-08-16       |
| 1          | 35        | 2019-08-16       |
| 2          | 50        | 2019-08-14       |
| 2          | 65        | 2019-08-14       |
+------------+-----------+------------------+
\`\`\`

We could try getting the last changed date by using the aggregate function and the \`product_id\`, which is the primary key and the grouping target. However, DBMS (Database Management System) does not know what to choose for the \`new_price\` field after grouping because there are multiple rows to choose from, so we cannot use the aggregate function. The reason why we cannot use the aggregate function is that we need to only get the \`new_price\` field by the last change date which we can do by comparing the set of the \`product_id\` and \`change_date\` fields.

#### Algorithm

1. Group the table with the \`product_id\` field and find the first changed date over \`2019-08-16\` by using \`MIN\` aggregation function on \`HAVING\` clause.
2. Set the \`price\` table as \`10\`.
3. Group the table with the \`product_id\` again, and find the \`product_id\` field and the last changed date until \`2019-08-16\`.
4. Find the last changed \`new_price\` field with the last changed date.
5. Union the two tables by using \`UNION ALL\`.

#### Implementation

##### MySQL

\`\`\`sql
SELECT
  product_id,
  10 AS price
FROM
  Products
GROUP BY
  product_id
HAVING
  MIN(change_date) > '2019-08-16'
UNION ALL
SELECT
  product_id,
  new_price AS price
FROM
  Products
WHERE
  (product_id, change_date) IN (
    SELECT
      product_id,
      MAX(change_date)
    FROM
      Products
    WHERE
      change_date <= '2019-08-16'
    GROUP BY
      product_id
  )
\`\`\`

### Approach 2: Divide cases by using \`LEFT JOIN\`

#### Intuition

We can also handle the \`NULL\` value using the \`LEFT JOIN\` clause. For example, if there are no changes before the given date, the result field of \`LEFT JOIN\` is \`NULL\`. Thus, after we get the last changed date before the given date, we could join that table with the table with a unique \`product_id\` field and handle the \`NULL\` value using a condition statement.

We need to use two kinds of join, the \`INNER JOIN\` and the \`LEFT JOIN\`. We use the \`INNER JOIN\` to get the last changed price until the given date and the \`LEFT JOIN\` to handle the \`NULL\` value.

!?!../Documents/1164/01_Slideshow.json:960,540!?!

#### Algorithm

1. Group the table with the \`product_id\`, and find the \`product_id\` field and the last changed date until \`2019-08-16\` using the aggregate function.
2. Use \`INNER JOIN\` to join the tables where the set of \`product_id\` and \`change_date\` fields is the same.
3. Get the last changed price and the \`product_id\` fields from the joined table.
4. Join by using \`LEFT JOIN\` where the \`product_id\` field is the same.
5. Handle the \`NULL\` value, which means there are no changes before the given date, using the \`IFNULL\` function.

#### Implementation

##### MySQL

\`\`\`sql
SELECT
  UniqueProductId.product_id,
  IFNULL (LastChangedPrice.new_price, 10) AS price
FROM
  (
    SELECT DISTINCT
      product_id
    FROM
      Products
  ) AS UniqueProductIds
  LEFT JOIN (
    SELECT
      Products.product_id,
      new_price
    FROM
      Products
      JOIN (
        SELECT
          product_id,
          MAX(change_date) AS change_date
        FROM
          Products
        WHERE
          change_date <= "2019-08-16"
        GROUP BY
          product_id
      ) AS LastChangedDate USING (product_id, change_date)
    GROUP BY
      product_id
  ) AS LastChangedPrice USING (product_id)
\`\`\`

### Approach 3: Use the window function

#### Intuition

We can get the last changed price by using the window function, \`FIRST_VALUE\`.

#### Window function

In [MySQL](https://dev.mysql.com/doc/refman/8.0/en/window-functions-usage.html), they say the window function _performs an aggregate-like operation on a set of query rows._ Even though they work almost the same, the aggregate function returns a single row for each target field, but the window function produces a result for each row.

There are two window function types: the aggregate function and the non-aggregate function. The aggregate function could be the window function with the \`OVER\` clause, such as \`MAX\`, \`MIN\`, and \`SUM\`. Thus, if we use these aggregate functions **without** the \`OVER\` clause, it works as the aggregate function; if we use these **with** the \`OVER\` clause, it works as the window function. However, some window functions, such as \`LEAD\`, \`LAG\`, \`RANK\`, and \`FIRST_VALUE\` are non-aggregate functions, which means they should be used with the \`OVER\` clause.

We define the target field to group or order on the \`OVER\` clause. Hence, if we use the \`FIRST_VALUE\` window function, the syntax looks like the image below. (You can get more details if you want to know the specification of the window function in [MySQL reference](https://dev.mysql.com/doc/refman/8.0/en/window-functions-usage.html).)

![Window Function](../Documents/1164/02_Window_Function.png)

The \`PARTITION BY\` works the same as \`GROUP BY\`. The only difference with \`GROUP BY\` is that it produces the result for each row. Now, we can get the last changed price by this \`FIRST_VALUE\` instead of using \`GROUP BY\` and \`JOIN\`. We can order the \`change_date\` fields in descending order and get each last changed price by \`PARTITION BY\` to group the table. You should be careful that we use the window function on the \`SELECT\` clause. Thus, it executes after the \`JOIN\`, \`WHERE\`, and \`GROUP BY\` clauses.

#### Algorithm

1. Filter the table where the value of the \`change_date\` field is under the given date (\`2019-08-16\`).
2. Get the last changed price using \`FIRST_VALUE\` for each \`product_id\`.
3. The rest of the process is the same as [Approach 2](#approach-2-divide-cases-by-using-the-left-join)

#### Implementation

##### MySQL

\`\`\`sql
SELECT
  product_id,
  IFNULL (price, 10) AS price
FROM
  (
    SELECT DISTINCT
      product_id
    FROM
      Products
  ) AS UniqueProducts
  LEFT JOIN (
    SELECT DISTINCT
      product_id,
      FIRST_VALUE (new_price) OVER (
        PARTITION BY
          product_id
        ORDER BY
          change_date DESC
      ) AS price
    FROM
      Products
    WHERE
      change_date <= '2019-08-16'
  ) AS LastChangedPrice USING (product_id);
\`\`\`

---

### Conclusion

We recommend [Approach 1](#approach-1-divide-cases-by-using-the-union-all) due to its simplicity and performance. Usually, it takes much more time when we use the \`UNION\` clause because it orders the table to remove the duplicated fields. However, the \`UNION ALL\` **does not** order the table because it **does not** remove the duplicated fields. We ensure that there are no duplicated fields because we use \`GROUP BY\` to get the last changed price for each \`product_id\`.`,
        "originalCategory": "advanced"
    },
    {
        "id": "1204",
        "title": "Last Person to Fit in the Bus",
        "difficulty": "medium",
        "description": "<p>Table: <code>Queue</code></p>\n\n<pre>\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| person_id   | int     |\n| person_name | varchar |\n| weight      | int     |\n| turn        | int     |\n+-------------+---------+\nperson_id column contains unique values.\nThis table has the information about all people waiting for a bus.\nThe person_id and turn columns will contain all numbers from 1 to n, where n is the number of rows in the table.\nturn determines the order of which the people will board the bus, where turn=1 denotes the first person to board and turn=n denotes the last person to board.\nweight is the weight of the person in kilograms.\n</pre>\n\n<p>&nbsp;</p>\n\n<p>There is a queue of people waiting to board a bus. However, the bus has a weight limit of <code>1000</code><strong> kilograms</strong>, so there may be some people who cannot board.</p>\n\n<p>Write a solution to find the <code>person_name</code> of the <strong>last person</strong> that can fit on the bus without exceeding the weight limit. The test cases are generated such that the first person does not exceed the weight limit.</p>\n\n<p><strong>Note</strong> that <em>only one</em> person can board the bus at any given turn.</p>\n\n<p>The&nbsp;result format is in the following example.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> \nQueue table:\n+-----------+-------------+--------+------+\n| person_id | person_name | weight | turn |\n+-----------+-------------+--------+------+\n| 5         | Alice       | 250    | 1    |\n| 4         | Bob         | 175    | 5    |\n| 3         | Alex        | 350    | 2    |\n| 6         | John Cena   | 400    | 3    |\n| 1         | Winston     | 500    | 6    |\n| 2         | Marie       | 200    | 4    |\n+-----------+-------------+--------+------+\n<strong>Output:</strong> \n+-------------+\n| person_name |\n+-------------+\n| John Cena   |\n+-------------+\n<strong>Explanation:</strong> The folowing table is ordered by the turn for simplicity.\n+------+----+-----------+--------+--------------+\n| Turn | ID | Name      | Weight | Total Weight |\n+------+----+-----------+--------+--------------+\n| 1    | 5  | Alice     | 250    | 250          |\n| 2    | 3  | Alex      | 350    | 600          |\n| 3    | 6  | John Cena | 400    | 1000         | (last person to board)\n| 4    | 2  | Marie     | 200    | 1200         | (cannot board)\n| 5    | 4  | Bob       | 175    | ___          |\n| 6    | 1  | Winston   | 500    | ___          |\n+------+----+-----------+--------+--------------+\n</pre>\n",
        "schema": "Create table If Not Exists Queue (person_id int, person_name varchar(30), weight int, turn int)\nTruncate table Queue\ninsert into Queue (person_id, person_name, weight, turn) values ('5', 'Alice', '250', '1')\ninsert into Queue (person_id, person_name, weight, turn) values ('4', 'Bob', '175', '5')\ninsert into Queue (person_id, person_name, weight, turn) values ('3', 'Alex', '350', '2')\ninsert into Queue (person_id, person_name, weight, turn) values ('6', 'John Cena', '400', '3')\ninsert into Queue (person_id, person_name, weight, turn) values ('1', 'Winston', '500', '6')\ninsert into Queue (person_id, person_name, weight, turn) values ('2', 'Marie', '200', '4')",
        "slug": "last-person-to-fit-in-the-bus",
        "originalCategory": "advanced"
    },
    {
        "id": "1212",
        "title": "Team Scores in Football Tournament",
        "difficulty": "medium",
        "description": "<p>Table: <code>Teams</code></p>\\n\\n<pre>\\n+------------+-------------+\\n| team_id    | team_name   |\\n+------------+-------------+\\n| int        | varchar(30) |\\n+------------+-------------+\\n</pre>\\n\\n<p>Table: <code>Matches</code></p>\\n\\n<pre>\\n+------------+------------+------------+------------+-------------+\\n| match_id   | host_team  | guest_team | host_goals | guest_goals |\\n+------------+------------+------------+------------+-------------+\\n| int        | int        | int        | int        | int         |\\n+------------+------------+------------+------------+-------------+\\n</pre>\\n\\n<p>&nbsp;</p>\\n\\n<p>Write a solution to compute the scores of all teams after all matches. A team gets <strong>3 points</strong> for a win, <strong>1 point</strong> for a draw, and <strong>0 points</strong> for a loss. Return the result table ordered by <code>num_points</code> in <strong>descending order</strong>, in case of a tie, order by <code>team_id</code> in ascending order.</p>\\n\\n<p>The result format is in the following example.</p>\\n\\n<p>&nbsp;</p>\\n<p><strong class=\\\"example\\\">Example 1:</strong></p>\\n\\n<pre>\\n<strong>Input:</strong> \\nTeams table:\\n+---------+-------------+\\n| team_id | team_name   |\\n+---------+-------------+\\n| 10      | Leetcode FC |\\n| 20      | NewYork FC  |\\n| 30      | Atlanta FC  |\\n| 40      | Chicago FC  |\\n| 50      | Toronto FC  |\\n+---------+-------------+\\nMatches table:\\n+----------+-----------+------------+------------+-------------+\\n| match_id | host_team | guest_team | host_goals | guest_goals |\\n+----------+-----------+------------+------------+-------------+\\n| 1        | 10        | 20         | 3          | 0           |\\n| 2        | 30        | 10         | 2          | 2           |\\n| 3        | 10        | 50         | 5          | 1           |\\n| 4        | 20        | 30         | 1          | 0           |\\n| 5        | 50        | 30         | 1          | 0           |\\n+----------+-----------+------------+------------+-------------+\\n<strong>Output:</strong> \\n+---------+-------------+------------+\\n| team_id | team_name   | num_points |\\n+---------+-------------+------------+\\n| 10      | Leetcode FC | 7          |\\n| 20      | NewYork FC  | 3          |\\n| 50      | Toronto FC  | 3          |\\n| 30      | Atlanta FC  | 1          |\\n| 40      | Chicago FC  | 0          |\\n+---------+-------------+------------+\\n</pre>\\n",
        "schema": "Create table If Not Exists Teams (team_id int, team_name varchar(30))\nCreate table If Not Exists Matches (match_id int, host_team int, guest_team int, host_goals int, guest_goals int)\nTruncate table Teams\ninsert into Teams (team_id, team_name) values ('10', 'Leetcode FC')\ninsert into Teams (team_id, team_name) values ('20', 'NewYork FC')\ninsert into Teams (team_id, team_name) values ('30', 'Atlanta FC')\ninsert into Teams (team_id, team_name) values ('40', 'Chicago FC')\ninsert into Teams (team_id, team_name) values ('50', 'Toronto FC')\nTruncate table Matches\ninsert into Matches (match_id, host_team, guest_team, host_goals, guest_goals) values ('1', '10', '20', '3', '0')\ninsert into Matches (match_id, host_team, guest_team, host_goals, guest_goals) values ('2', '30', '10', '2', '2')\ninsert into Matches (match_id, host_team, guest_team, host_goals, guest_goals) values ('3', '10', '50', '5', '1')\ninsert into Matches (match_id, host_team, guest_team, host_goals, guest_goals) values ('4', '20', '30', '1', '0')\ninsert into Matches (match_id, host_team, guest_team, host_goals, guest_goals) values ('5', '50', '30', '1', '0')",
        "slug": "team-scores-in-football-tournament",
        "originalCategory": "advanced"
    },
    {
        "id": "1264",
        "title": "Page Recommendations",
        "difficulty": "medium",
        "description": "<p>Table: <code>Friendship</code></p>\\n\\n<pre>\\n+------------+------------+\\n| user1_id   | user2_id   |\\n+------------+------------+\\n| int        | int        |\\n+------------+------------+\\n</pre>\\n\\n<p>Table: <code>Likes</code></p>\\n\\n<pre>\\n+------------+------------+\\n| user_id    | page_id    |\\n+------------+------------+\\n| int        | int        |\\n+------------+------------+\\n</pre>\\n\\n<p>&nbsp;</p>\\n\\n<p>Write a solution to recommend pages to user id = 1 using the pages that their friends liked. It should not recommend pages that user 1 already liked. Return the result table in <strong>any order</strong>.</p>\\n\\n<p>The result format is in the following example.</p>\\n\\n<p>&nbsp;</p>\\n<p><strong class=\\\"example\\\">Example 1:</strong></p>\\n\\n<pre>\\n<strong>Input:</strong> \\nFriendship table:\\n+----------+----------+\\n| user1_id | user2_id |\\n+----------+----------+\\n| 1        | 2        |\\n| 1        | 3        |\\n| 1        | 4        |\\n| 2        | 3        |\\n| 2        | 4        |\\n| 2        | 5        |\\n| 6        | 1        |\\n+----------+----------+\\nLikes table:\\n+---------+---------+\\n| user_id | page_id |\\n+---------+---------+\\n| 1       | 88      |\\n| 2       | 23      |\\n| 3       | 24      |\\n| 4       | 56      |\\n| 5       | 11      |\\n| 6       | 33      |\\n| 2       | 77      |\\n| 3       | 77      |\\n| 6       | 88      |\\n+---------+---------+\\n<strong>Output:</strong> \\n+------------------+\\n| recommended_page |\\n+------------------+\\n| 23               |\\n| 24               |\\n| 56               |\\n| 33               |\\n| 77               |\\n+------------------+\\n<strong>Explanation:</strong> \\nUser 1 is friends with users 2, 3, 4 and 6. The suggested pages are 23, 24, 56, 33 and 77 (pages liked by friends, excluding page 88 already liked by user 1).\\n</pre>\\n",
        "schema": "Create table If Not Exists Friendship (user1_id int, user2_id int)\nCreate table If Not Exists Likes (user_id int, page_id int)\nTruncate table Friendship\ninsert into Friendship (user1_id, user2_id) values ('1', '2')\ninsert into Friendship (user1_id, user2_id) values ('1', '3')\ninsert into Friendship (user1_id, user2_id) values ('1', '4')\ninsert into Friendship (user1_id, user2_id) values ('2', '3')\ninsert into Friendship (user1_id, user2_id) values ('2', '4')\ninsert into Friendship (user1_id, user2_id) values ('2', '5')\ninsert into Friendship (user1_id, user2_id) values ('6', '1')\nTruncate table Likes\ninsert into Likes (user_id, page_id) values ('1', '88')\ninsert into Likes (user_id, page_id) values ('2', '23')\ninsert into Likes (user_id, page_id) values ('3', '24')\ninsert into Likes (user_id, page_id) values ('4', '56')\ninsert into Likes (user_id, page_id) values ('5', '11')\ninsert into Likes (user_id, page_id) values ('6', '33')\ninsert into Likes (user_id, page_id) values ('2', '77')\ninsert into Likes (user_id, page_id) values ('3', '77')\ninsert into Likes (user_id, page_id) values ('6', '88')",
        "slug": "page-recommendations",
        "originalCategory": "advanced"
    },
    {
        "id": "1270",
        "title": "All People Report to the Given Manager",
        "difficulty": "medium",
        "description": "<p>Table: <code>Employees</code></p>\\n\\n<pre>\\n+-------------+---------------+------------+\\n| employee_id | employee_name | manager_id |\\n+-------------+---------------+------------+\\n| int         | varchar(30)   | int        |\\n+-------------+---------------+------------+\\n</pre>\\n\\n<p>&nbsp;</p>\\n\\n<p>Write a solution to find <code>employee_id</code> of all employees that directly or indirectly report to the head of the company. The head of the company is the employee with <code>employee_id = 1</code>. The indirect relation between a manager and an employee is defined as: the employee reports to a manager who reports to the head (at any level). Return the result table in <strong>any order</strong>.</p>\\n\\n<p>The result format is in the following example.</p>\\n\\n<p>&nbsp;</p>\\n<p><strong class=\\\"example\\\">Example 1:</strong></p>\\n\\n<pre>\\n<strong>Input:</strong> \\nEmployees table:\\n+-------------+---------------+------------+\\n| employee_id | employee_name | manager_id |\\n+-------------+---------------+------------+\\n| 1           | Boss          | 1          |\\n| 3           | Alice         | 3          |\\n| 2           | Bob           | 1          |\\n| 4           | Daniel        | 2          |\\n| 7           | Luis          | 4          |\\n| 8           | John          | 3          |\\n| 9           | Angela        | 8          |\\n| 77          | Robert        | 1          |\\n+-------------+---------------+------------+\\n<strong>Output:</strong> \\n+-------------+\\n| employee_id |\\n+-------------+\\n| 2           |\\n| 77          |\\n| 4           |\\n| 7           |\\n+-------------+\\n<strong>Explanation:</strong> \\nThe head is employee 1. Employee 2 and 77 report directly to 1. Employee 4 reports to 2. Employee 7 reports to 4.\\n</pre>\\n",
        "schema": "Create table If Not Exists Employees (employee_id int, employee_name varchar(30), manager_id int)\nTruncate table Employees\ninsert into Employees (employee_id, employee_name, manager_id) values ('1', 'Boss', '1')\ninsert into Employees (employee_id, employee_name, manager_id) values ('3', 'Alice', '3')\ninsert into Employees (employee_id, employee_name, manager_id) values ('2', 'Bob', '1')\ninsert into Employees (employee_id, employee_name, manager_id) values ('4', 'Daniel', '2')\ninsert into Employees (employee_id, employee_name, manager_id) values ('7', 'Luis', '4')\ninsert into Employees (employee_id, employee_name, manager_id) values ('8', 'John', '3')\ninsert into Employees (employee_id, employee_name, manager_id) values ('9', 'Angela', '8')\ninsert into Employees (employee_id, employee_name, manager_id) values ('77', 'Robert', '1')",
        "slug": "all-people-report-to-the-given-manager",
        "originalCategory": "advanced"
    },
    {
        "id": "1445",
        "title": "Apples & Oranges",
        "difficulty": "medium",
        "description": "<p>Table: <code>Sales</code></p>\\n\\n<pre>\\n+------------+---------------+------------+\\n| sale_date  | fruit         | sold_num   |\\n+------------+---------------+------------+\\n| date       | ENUM('apples' | int        |\\n+------------+---------------+------------+\\n</pre>\\n\\n<p>&nbsp;</p>\\n\\n<p>Write a solution to report the difference of apples and oranges sold each day. Return the result table ordered by <code>sale_date</code>.</p>\\n\\n<p>The result format is in the following example.</p>\\n\\n<p>&nbsp;</p>\\n<p><strong class=\\\"example\\\">Example 1:</strong></p>\\n\\n<pre>\\n<strong>Input:</strong> \\nSales table:\\n+------------+---------+----------+\\n| sale_date  | fruit   | sold_num |\\n+------------+---------+----------+\\n| 2020-05-01 | apples  | 10       |\\n| 2020-05-01 | oranges | 8        |\\n| 2020-05-02 | apples  | 15       |\\n| 2020-05-02 | oranges | 15       |\\n| 2020-05-03 | apples  | 20       |\\n| 2020-05-03 | oranges | 0        |\\n| 2020-05-04 | apples  | 15       |\\n| 2020-05-04 | oranges | 16       |\\n+------------+---------+----------+\\n<strong>Output:</strong> \\n+------------+------+\\n| sale_date  | diff |\\n+------------+------+\\n| 2020-05-01 | 2    |\\n| 2020-05-02 | 0    |\\n| 2020-05-03 | 20   |\\n| 2020-05-04 | -1   |\\n+------------+------+\\n<strong>Explanation:</strong> \\nDay 2020-05-01: 10 apples - 8 oranges = 2. And so on.\\n</pre>\\n",
        "schema": "Create table If Not Exists Sales (sale_date date, fruit ENUM('apples', 'oranges'), sold_num int)\nTruncate table Sales\ninsert into Sales (sale_date, fruit, sold_num) values ('2020-05-01', 'apples', '10')\ninsert into Sales (sale_date, fruit, sold_num) values ('2020-05-01', 'oranges', '8')\ninsert into Sales (sale_date, fruit, sold_num) values ('2020-05-02', 'apples', '15')\ninsert into Sales (sale_date, fruit, sold_num) values ('2020-05-02', 'oranges', '15')\ninsert into Sales (sale_date, fruit, sold_num) values ('2020-05-03', 'apples', '20')\ninsert into Sales (sale_date, fruit, sold_num) values ('2020-05-03', 'oranges', '0')\ninsert into Sales (sale_date, fruit, sold_num) values ('2020-05-04', 'apples', '15')\ninsert into Sales (sale_date, fruit, sold_num) values ('2020-05-04', 'oranges', '16')",
        "slug": "apples-oranges",
        "originalCategory": "advanced"
    },
    {
        "id": "1501",
        "title": "Countries You Can Safely Invest In",
        "difficulty": "medium",
        "description": "<p>Table: <code>Person</code></p>\\n\\n<pre>\\n+------------+-------------+--------------+\\n| id         | name        | phone_number |\\n+------------+-------------+--------------+\\n| int        | varchar(15) | varchar(11)  |\\n+------------+-------------+--------------+\\n</pre>\\n\\n<p>Table: <code>Country</code></p>\\n\\n<pre>\\n+-------------+--------------+\\n| name        | country_code |\\n+-------------+--------------+\\n| varchar(15) | varchar(3)   |\\n+-------------+--------------+\\n</pre>\\n\\n<p>Table: <code>Calls</code></p>\\n\\n<pre>\\n+------------+------------+------------+\\n| caller_id  | callee_id  | duration   |\\n+------------+------------+------------+\\n| int        | int        | int        |\\n+------------+------------+------------+\\n</pre>\\n\\n<p>&nbsp;</p>\\n\\n<p>A telecommunications company wants to invest in new countries. The company intends to invest in the countries where the average call duration of the calls in this country is <strong>strictly greater</strong> than the global average call duration. Write a solution to find the countries where the company can invest. Return the result table in <strong>any order</strong>.</p>\\n\\n<p>The result format is in the following example.</p>\\n\\n<p>&nbsp;</p>\\n<p><strong class=\\\"example\\\">Example 1:</strong></p>\\n\\n<pre>\\n<strong>Input:</strong> \\nPerson table:\\n+------+----------+--------------+\\n| id   | name     | phone_number |\\n+------+----------+--------------+\\n| 3    | Jonathan | 051-1234567  |\\n| 12   | Elvis    | 051-7654321  |\\n| 1    | Moncef   | 212-1234567  |\\n| 2    | Maroua   | 212-6523651  |\\n| 7    | Meir     | 972-1234567  |\\n| 9    | Rachel   | 972-0011100  |\\n+------+----------+--------------+\\nCountry table:\\n+----------+--------------+\\n| name     | country_code |\\n+----------+--------------+\\n| Peru     | 051          |\\n| Israel   | 972          |\\n| Morocco  | 212          |\\n| Germany  | 049          |\\n| Ethiopia | 251          |\\n+----------+--------------+\\nCalls table:\\n+-----------+-----------+----------+\\n| caller_id | callee_id | duration |\\n+-----------+-----------+----------+\\n| 1         | 9         | 33       |\\n| 2         | 9         | 4        |\\n| 1         | 2         | 59       |\\n| 3         | 12        | 102      |\\n| 3         | 12        | 330      |\\n| 12        | 3         | 5        |\\n| 7         | 9         | 13       |\\n| 7         | 1         | 3        |\\n| 9         | 7         | 1        |\\n| 1         | 7         | 7        |\\n+-----------+-----------+----------+\\n<strong>Output:</strong> \\n+---------+\\n| country |\\n+---------+\\n| Peru    |\\n+---------+\\n<strong>Explanation:</strong> \\nThe average call duration for Peru is (102 + 330 + 5) / 3 = 145.67. The global average is (33 + 4 + 59 + 102 + 330 + 5 + 13 + 3 + 1 + 7) / 10 = 55.70. Peru > global average.\\n</pre>\\n",
        "schema": "Create table If Not Exists Person (id int, name varchar(15), phone_number varchar(11))\nCreate table If Not Exists Country (name varchar(15), country_code varchar(3))\nCreate table If Not Exists Calls (caller_id int, callee_id int, duration int)\nTruncate table Person\ninsert into Person (id, name, phone_number) values ('3', 'Jonathan', '051-1234567')\ninsert into Person (id, name, phone_number) values ('12', 'Elvis', '051-7654321')\ninsert into Person (id, name, phone_number) values ('1', 'Moncef', '212-1234567')\ninsert into Person (id, name, phone_number) values ('2', 'Maroua', '212-6523651')\ninsert into Person (id, name, phone_number) values ('7', 'Meir', '972-1234567')\ninsert into Person (id, name, phone_number) values ('9', 'Rachel', '972-0011100')\nTruncate table Country\ninsert into Country (name, country_code) values ('Peru', '051')\ninsert into Country (name, country_code) values ('Israel', '972')\ninsert into Country (name, country_code) values ('Morocco', '212')\ninsert into Country (name, country_code) values ('Germany', '049')\ninsert into Country (name, country_code) values ('Ethiopia', '251')\nTruncate table Calls\ninsert into Calls (caller_id, callee_id, duration) values ('1', '9', '33')\ninsert into Calls (caller_id, callee_id, duration) values ('2', '9', '4')\ninsert into Calls (caller_id, callee_id, duration) values ('1', '2', '59')\ninsert into Calls (caller_id, callee_id, duration) values ('3', '12', '102')\ninsert into Calls (caller_id, callee_id, duration) values ('3', '12', '330')\ninsert into Calls (caller_id, callee_id, duration) values ('12', '3', '5')\ninsert into Calls (caller_id, callee_id, duration) values ('7', '9', '13')\ninsert into Calls (caller_id, callee_id, duration) values ('7', '1', '3')\ninsert into Calls (caller_id, callee_id, duration) values ('9', '7', '1')\ninsert into Calls (caller_id, callee_id, duration) values ('1', '7', '7')",
        "slug": "countries-you-can-safely-invest-in",
        "originalCategory": "advanced"
    },
    {
        "id": "1532",
        "title": "The Most Recent Three Orders",
        "difficulty": "medium",
        "description": "<p>Table: <code>Customers</code></p>\\n\\n<pre>\\n+-------------+-------------+\\n| customer_id | name        |\\n+-------------+-------------+\\n| int         | varchar(10) |\\n+-------------+-------------+\\n</pre>\\n\\n<p>Table: <code>Orders</code></p>\\n\\n<pre>\\n+------------+------------+-------------+------------+\\n| order_id   | order_date | customer_id | cost       |\\n+------------+------------+-------------+------------+\\n| int        | date       | int         | int        |\\n+------------+------------+-------------+------------+\\n</pre>\\n\\n<p>&nbsp;</p>\\n\\n<p>Write a solution to find the most recent three orders of each user. If a user has less than three orders, return all of their orders. Return the result table ordered by <code>customer_name</code> in ascending order, and in case of a tie, by <code>customer_id</code> in ascending order. If there is still a tie, order by <code>order_date</code> in descending order.</p>\\n\\n<p>The result format is in the following example.</p>\\n\\n<p>&nbsp;</p>\\n<p><strong class=\\\"example\\\">Example 1:</strong></p>\\n\\n<pre>\\n<strong>Input:</strong> \\nCustomers table:\\n+-------------+-----------+\\n| customer_id | name      |\\n+-------------+-----------+\\n| 1           | Winston   |\\n| 2           | Jonathan  |\\n| 3           | Annabelle |\\n| 4           | Marwan    |\\n| 5           | Khaled    |\\n+-------------+-----------+\\nOrders table:\\n+----------+------------+-------------+------+\\n| order_id | order_date | customer_id | cost |\\n+----------+------------+-------------+------+\\n| 1        | 2020-07-31 | 1           | 30   |\\n| 2        | 2020-7-30  | 2           | 40   |\\n| 3        | 2020-07-31 | 3           | 70   |\\n| 4        | 2020-07-29 | 4           | 100  |\\n| 5        | 2020-06-10 | 1           | 1010 |\\n| 6        | 2020-08-01 | 2           | 102  |\\n| 7        | 2020-08-01 | 3           | 111  |\\n| 8        | 2020-08-03 | 1           | 99   |\\n| 9        | 2020-08-07 | 2           | 32   |\\n| 10       | 2020-07-15 | 1           | 2    |\\n+----------+------------+-------------+------+\\n<strong>Output:</strong> \\n+---------------+-------------+----------+------------+\\n| customer_name | customer_id | order_id | order_date |\\n+---------------+-------------+----------+------------+\\n| Annabelle     | 3           | 7        | 2020-08-01 |\\n| Annabelle     | 3           | 3        | 2020-07-31 |\\n| Jonathan      | 2           | 9        | 2020-08-07 |\\n| Jonathan      | 2           | 6        | 2020-08-01 |\\n| Jonathan      | 2           | 2        | 2020-07-30 |\\n| Marwan        | 4           | 4        | 2020-07-29 |\\n| Winston       | 1           | 8        | 2020-08-03 |\\n| Winston       | 1           | 1        | 2020-07-31 |\\n| Winston       | 1           | 10       | 2020-07-15 |\\n+---------------+-------------+----------+------------+\\n</pre>\\n",
        "schema": "Create table If Not Exists Customers (customer_id int, name varchar(10))\nCreate table If Not Exists Orders (order_id int, order_date date, customer_id int, cost int)\nTruncate table Customers\ninsert into Customers (customer_id, name) values ('1', 'Winston')\ninsert into Customers (customer_id, name) values ('2', 'Jonathan')\ninsert into Customers (customer_id, name) values ('3', 'Annabelle')\ninsert into Customers (customer_id, name) values ('4', 'Marwan')\ninsert into Customers (customer_id, name) values ('5', 'Khaled')\nTruncate table Orders\ninsert into Orders (order_id, order_date, customer_id, cost) values ('1', '2020-07-31', '1', '30')\ninsert into Orders (order_id, order_date, customer_id, cost) values ('2', '2020-7-30', '2', '40')\ninsert into Orders (order_id, order_date, customer_id, cost) values ('3', '2020-07-31', '3', '70')\ninsert into Orders (order_id, order_date, customer_id, cost) values ('4', '2020-07-29', '4', '100')\ninsert into Orders (order_id, order_date, customer_id, cost) values ('5', '2020-06-10', '1', '1010')\ninsert into Orders (order_id, order_date, customer_id, cost) values ('6', '2020-08-01', '2', '102')\ninsert into Orders (order_id, order_date, customer_id, cost) values ('7', '2020-08-01', '3', '111')\ninsert into Orders (order_id, order_date, customer_id, cost) values ('8', '2020-08-03', '1', '99')\ninsert into Orders (order_id, order_date, customer_id, cost) values ('9', '2020-08-07', '2', '32')\ninsert into Orders (order_id, order_date, customer_id, cost) values ('10', '2020-07-15', '1', '2')",
        "slug": "the-most-recent-three-orders",
        "originalCategory": "advanced"
    },
    {
        "id": "1549",
        "title": "The Most Recent Orders for Each Product",
        "difficulty": "medium",
        "description": "<p>Table: <code>Customers</code></p>\\n\\n<pre>\\n+-------------+-------------+\\n| customer_id | name        |\\n+-------------+-------------+\\n| int         | varchar(10) |\\n+-------------+-------------+\\n</pre>\\n\\n<p>Table: <code>Orders</code></p>\\n\\n<pre>\\n+------------+------------+-------------+------------+\\n| order_id   | order_date | customer_id | product_id |\\n+------------+------------+-------------+------------+\\n| int        | date       | int         | int        |\\n+------------+------------+-------------+------------+\\n</pre>\\n\\n<p>Table: <code>Products</code></p>\\n\\n<pre>\\n+------------+--------------+------------+\\n| product_id | product_name | price      |\\n+------------+--------------+------------+\\n| int        | varchar(20)  | int        |\\n+------------+--------------+------------+\\n</pre>\\n\\n<p>&nbsp;</p>\\n\\n<p>Write a solution to find the most recent order(s) for each product. Return the result table ordered by <code>product_name</code> in ascending order and in case of a tie by <code>product_id</code> in ascending order. If there is still a tie, order by <code>order_id</code> in ascending order.</p>\\n\\n<p>The result format is in the following example.</p>\\n\\n<p>&nbsp;</p>\\n<p><strong class=\\\"example\\\">Example 1:</strong></p>\\n\\n<pre>\\n<strong>Input:</strong> \\nCustomers table:\\n+-------------+-----------+\\n| customer_id | name      |\\n+-------------+-----------+\\n| 1           | Winston   |\\n| 2           | Jonathan  |\\n| 3           | Annabelle |\\n| 4           | Marwan    |\\n| 5           | Khaled    |\\n+-------------+-----------+\\nOrders table:\\n+----------+------------+-------------+------------+\\n| order_id | order_date | customer_id | product_id |\\n+----------+------------+-------------+------------+\\n| 1        | 2020-07-31 | 1           | 1          |\\n| 2        | 2020-7-30  | 2           | 2          |\\n| 3        | 2020-08-29 | 3           | 3          |\\n| 4        | 2020-07-29 | 4           | 1          |\\n| 5        | 2020-06-10 | 1           | 2          |\\n| 6        | 2020-08-01 | 2           | 1          |\\n| 7        | 2020-08-01 | 3           | 1          |\\n| 8        | 2020-08-03 | 1           | 2          |\\n| 9        | 2020-08-07 | 2           | 3          |\\n| 10       | 2020-07-15 | 1           | 2          |\\n+----------+------------+-------------+------------+\\nProducts table:\\n+------------+--------------+-------+\\n| product_id | product_name | price |\\n+------------+--------------+-------+\\n| 1          | keyboard     | 120   |\\n| 2          | mouse        | 80    |\\n| 3          | screen       | 600   |\\n| 4          | hard disk    | 450   |\\n+------------+--------------+-------+\\n<strong>Output:</strong> \\n+--------------+------------+----------+------------+\\n| product_name | product_id | order_id | order_date |\\n+--------------+------------+----------+------------+\\n| keyboard     | 1          | 6        | 2020-08-01 |\\n| keyboard     | 1          | 7        | 2020-08-01 |\\n| mouse        | 2          | 8        | 2020-08-03 |\\n| screen       | 3          | 3        | 2020-08-29 |\\n+--------------+------------+----------+------------+\\n</pre>\\n",
        "schema": "Create table If Not Exists Customers (customer_id int, name varchar(10))\nCreate table If Not Exists Orders (order_id int, order_date date, customer_id int, product_id int)\nCreate table If Not Exists Products (product_id int, product_name varchar(20), price int)\nTruncate table Customers\ninsert into Customers (customer_id, name) values ('1', 'Winston')\ninsert into Customers (customer_id, name) values ('2', 'Jonathan')\ninsert into Customers (customer_id, name) values ('3', 'Annabelle')\ninsert into Customers (customer_id, name) values ('4', 'Marwan')\ninsert into Customers (customer_id, name) values ('5', 'Khaled')\nTruncate table Orders\ninsert into Orders (order_id, order_date, customer_id, product_id) values ('1', '2020-07-31', '1', '1')\ninsert into Orders (order_id, order_date, customer_id, product_id) values ('2', '2020-7-30', '2', '2')\ninsert into Orders (order_id, order_date, customer_id, product_id) values ('3', '2020-08-29', '3', '3')\ninsert into Orders (order_id, order_date, customer_id, product_id) values ('4', '2020-07-29', '4', '1')\ninsert into Orders (order_id, order_date, customer_id, product_id) values ('5', '2020-06-10', '1', '2')\ninsert into Orders (order_id, order_date, customer_id, product_id) values ('6', '2020-08-01', '2', '1')\ninsert into Orders (order_id, order_date, customer_id, product_id) values ('7', '2020-08-01', '3', '1')\ninsert into Orders (order_id, order_date, customer_id, product_id) values ('8', '2020-08-03', '1', '2')\ninsert into Orders (order_id, order_date, customer_id, product_id) values ('9', '2020-08-07', '2', '3')\ninsert into Orders (order_id, order_date, customer_id, product_id) values ('10', '2020-07-15', '1', '2')\nTruncate table Products\ninsert into Products (product_id, product_name, price) values ('1', 'keyboard', '120')\ninsert into Products (product_id, product_name, price) values ('2', 'mouse', '80')\ninsert into Products (product_id, product_name, price) values ('3', 'screen', '600')\ninsert into Products (product_id, product_name, price) values ('4', 'hard disk', '450')",
        "slug": "the-most-recent-orders-for-each-product",
        "originalCategory": "advanced"
    },
    {
        "id": "1596",
        "title": "The Most Frequently Ordered Products for Each Customer",
        "difficulty": "medium",
        "description": "<p>Table: <code>Customers</code></p>\\n\\n<pre>\\n+-------------+-------------+\\n| customer_id | name        |\\n+-------------+-------------+\\n| int         | varchar(10) |\\n+-------------+-------------+\\n</pre>\\n\\n<p>Table: <code>Orders</code></p>\\n\\n<pre>\\n+------------+------------+-------------+------------+\\n| order_id   | order_date | customer_id | product_id |\\n+------------+------------+-------------+------------+\\n| int        | date       | int         | int        |\\n+------------+------------+-------------+------------+\\n</pre>\\n\\n<p>Table: <code>Products</code></p>\\n\\n<pre>\\n+------------+--------------+------------+\\n| product_id | product_name | price      |\\n+------------+--------------+------------+\\n| int        | varchar(20)  | int        |\\n+------------+--------------+------------+\\n</pre>\\n\\n<p>&nbsp;</p>\\n\\n<p>Write a solution to find the most frequently ordered product(s) for each customer. Return the result table in <strong>any order</strong>.</p>\\n\\n<p>The result format is in the following example.</p>\\n\\n<p>&nbsp;</p>\\n<p><strong class=\\\"example\\\">Example 1:</strong></p>\\n\\n<pre>\\n<strong>Input:</strong> \\nCustomers table:\\n+-------------+-------+\\n| customer_id | name  |\\n+-------------+-------+\\n| 1           | Alice |\\n| 2           | Bob   |\\n| 3           | Tom   |\\n| 4           | Jerry |\\n| 5           | John  |\\n+-------------+-------+\\nOrders table:\\n+----------+------------+-------------+------------+\\n| order_id | order_date | customer_id | product_id |\\n+----------+------------+-------------+------------+\\n| 1        | 2020-07-31 | 1           | 1          |\\n| 2        | 2020-7-30  | 2           | 2          |\\n| 3        | 2020-08-29 | 3           | 3          |\\n| 4        | 2020-07-29 | 4           | 1          |\\n| 5        | 2020-06-10 | 1           | 2          |\\n| 6        | 2020-08-01 | 2           | 1          |\\n| 7        | 2020-08-01 | 3           | 3          |\\n| 8        | 2020-08-03 | 1           | 2          |\\n| 9        | 2020-08-07 | 2           | 3          |\\n| 10       | 2020-07-15 | 1           | 2          |\\n+----------+------------+-------------+------------+\\nProducts table:\\n+------------+--------------+-------+\\n| product_id | product_name | price |\\n+------------+--------------+-------+\\n| 1          | keyboard     | 120   |\\n| 2          | mouse        | 80    |\\n| 3          | screen       | 600   |\\n| 4          | hard disk    | 450   |\\n+------------+--------------+-------+\\n<strong>Output:</strong> \\n+-------------+------------+--------------+\\n| customer_id | product_id | product_name |\\n+-------------+------------+--------------+\\n| 1           | 2          | mouse        |\\n| 2           | 1          | keyboard     |\\n| 2           | 2          | mouse        |\\n| 2           | 3          | screen       |\\n| 3           | 3          | screen       |\\n| 4           | 1          | keyboard     |\\n+-------------+------------+--------------+\\n</pre>\\n",
        "schema": "Create table If Not Exists Customers (customer_id int, name varchar(10))\nCreate table If Not Exists Orders (order_id int, order_date date, customer_id int, product_id int)\nCreate table If Not Exists Products (product_id int, product_name varchar(20), price int)\nTruncate table Customers\ninsert into Customers (customer_id, name) values ('1', 'Alice')\ninsert into Customers (customer_id, name) values ('2', 'Bob')\ninsert into Customers (customer_id, name) values ('3', 'Tom')\ninsert into Customers (customer_id, name) values ('4', 'Jerry')\ninsert into Customers (customer_id, name) values ('5', 'John')\nTruncate table Orders\ninsert into Orders (order_id, order_date, customer_id, product_id) values ('1', '2020-07-31', '1', '1')\ninsert into Orders (order_id, order_date, customer_id, product_id) values ('2', '2020-7-30', '2', '2')\ninsert into Orders (order_id, order_date, customer_id, product_id) values ('3', '2020-08-29', '3', '3')\ninsert into Orders (order_id, order_date, customer_id, product_id) values ('4', '2020-07-29', '4', '1')\ninsert into Orders (order_id, order_date, customer_id, product_id) values ('5', '2020-06-10', '1', '2')\ninsert into Orders (order_id, order_date, customer_id, product_id) values ('6', '2020-08-01', '2', '1')\ninsert into Orders (order_id, order_date, customer_id, product_id) values ('7', '2020-08-01', '3', '3')\ninsert into Orders (order_id, order_date, customer_id, product_id) values ('8', '2020-08-03', '1', '2')\ninsert into Orders (order_id, order_date, customer_id, product_id) values ('9', '2020-08-07', '2', '3')\ninsert into Orders (order_id, order_date, customer_id, product_id) values ('10', '2020-07-15', '1', '2')\nTruncate table Products\ninsert into Products (product_id, product_name, price) values ('1', 'keyboard', '120')\ninsert into Products (product_id, product_name, price) values ('2', 'mouse', '80')\ninsert into Products (product_id, product_name, price) values ('3', 'screen', '600')\ninsert into Products (product_id, product_name, price) values ('4', 'hard disk', '450')",
        "slug": "the-most-frequently-ordered-products-for-each-customer",
        "originalCategory": "advanced"
    },
    {
        "id": "1709",
        "title": "Biggest Window Between Visits",
        "difficulty": "medium",
        "description": "<p>Table: <code>UserVisits</code></p>\\n\\n<pre>\\n+------------+------------+\\n| user_id    | visit_date |\\n+------------+------------+\\n| int        | date       |\\n+------------+------------+\\n</pre>\\n\\n<p>&nbsp;</p>\\n\\n<p>Assume today's date is <code>2021-1-1</code>. Write a solution to find the biggest window of days between each visit and the next. Return the result table ordered by <code>user_id</code>.</p>\\n\\n<p>The result format is in the following example.</p>\\n\\n<p>&nbsp;</p>\\n<p><strong class=\\\"example\\\">Example 1:</strong></p>\\n\\n<pre>\\n<strong>Input:</strong> \\nUserVisits table:\\n+---------+------------+\\n| user_id | visit_date |\\n+---------+------------+\\n| 1       | 2020-11-28 |\\n| 1       | 2020-10-20 |\\n| 1       | 2020-12-3  |\\n| 2       | 2020-10-5  |\\n| 2       | 2020-12-9  |\\n| 3       | 2020-11-11 |\\n+---------+------------+\\n<strong>Output:</strong> \\n+---------+----------------+\\n| user_id | biggest_window |\\n+---------+----------------+\\n| 1       | 39             |\\n| 2       | 65             |\\n| 3       | 51             |\\n+---------+----------------+\\n</pre>\\n",
        "schema": "Create table If Not Exists UserVisits(user_id int, visit_date date)\nTruncate table UserVisits\ninsert into UserVisits (user_id, visit_date) values ('1', '2020-11-28')\ninsert into UserVisits (user_id, visit_date) values ('1', '2020-10-20')\ninsert into UserVisits (user_id, visit_date) values ('1', '2020-12-3')\ninsert into UserVisits (user_id, visit_date) values ('2', '2020-10-5')\ninsert into UserVisits (user_id, visit_date) values ('2', '2020-12-9')\ninsert into UserVisits (user_id, visit_date) values ('3', '2020-11-11')",
        "slug": "biggest-window-between-visits",
        "editorial": `​
<!-- Don't delete this -->
[TOC]
​
# Solution
​
---
​
## pandas
​
To find out the largest window of days between each visit and the one right after it, there are several things need to be done: 

- for each \`user_id\`, we need to sort the \`visit_date\` in an ascending order to later identify the next \`visit_date\`
- today's date needs to be added as the last \`visit_date\` for each \`user_id\` 
- for each \`user_id\`, we need to calculate the differences between the current \`visit_date\` and the next \`visit_date\`, which is the window of days between each visit 
- from all windows of days, we need to identify the maximum window for each \`user_id\`

<!-- h3 for approaches -->
### Approach 1: Using shift() to put two consecutive visits together.

<!-- h4 for sections -->
#### Algorithm
​<!-- Describe your approach to solving the problem. -->
This approach strictly follows the bullets above. We start by sorting the \`visit_date\` for each \`user_id\`.

\`\`\`python
user_visits.sort_values(by=['user_id', 'visit_date'], inplace=True)
\`\`\`

Once the \`visit_date\` is sorted in ascending order for each \`user_id\`, we can create another column to append the next \`visit_date\` for each \`user_id\` and its current \`visit_date\` using \`shift()\`. The parameter \`periods=1\` is passed to the function so all \`visit_date\` move up by one cell in this column; this way, we have the current \`visit_date\` and the next \`visit_date\` for each \`user_id\` in one row. Since there is no value after the last \`visit_date\`, we replace the \`NULL\` with today's date using the parameter \`fill_value\`.

\`\`\`python
ser_visits['next_visit'] = user_visits.groupby(['user_id']).shift(periods=-1, fill_value='2021-01-01')
\`\`\`

We now achieved the first two bullet points from the list. 

| user_id | visit_date | next_visit |
| ------- | ---------- | ---------- |
| 1       | 2020-10-20 | 2020-11-28 |
| 1       | 2020-11-28 | 2020-12-03 |
| 1       | 2020-12-03 | 2021-01-01 |
| 2       | 2020-10-05 | 2020-12-09 |
| 2       | 2020-12-09 | 2021-01-01 |
| 3       | 2020-11-11 | 2021-01-01 |

Now we can calculate the window of days between the current \`visit_date\` and the next \`visit_date\` for each visit. The calculation is saved in a new column called \`window\`.

\`\`\`python
user_visits['window'] = (user_visits.next_visit - user_visits.visit_date).dt.days
\`\`\`

With all the windows of days for each \`user_id\`, we can identify the maximum window for each \`user_id\` using \`groupby\`. 

\`\`\`python
biggest_window = user_visits.groupby(['user_id'], as_index=False).window.max()
\`\`\`

| user_id | window |
| ------- | ------ |
| 1       | 39     |
| 2       | 65     |
| 3       | 51     |

To get the final output, we also need to rename the column. 
​
<!-- h4 for sections -->
#### Implementation
​<iframe src="https://leetcode.com/playground/eUT5u2gu/shared" frameBorder="0" width="100%" height="276" name="eUT5u2gu"></iframe>
<!-- an empty line to separate approaches -->

<!-- h3 for approaches -->
### Approach 2: Using diff() on sorted visit dates

<!-- h4 for sections -->
#### Algorithm

<!-- Describe your approach to solving the problem. -->
Unlike the previous approach, we don't need to create a separate column using \`shift\` to compare adjacent visits. Here, we use the \`diff\` method directly on the column \`visit_date\` to calculate the date intervals between each two adjacent visits.

Note that, to calculate the interval from the last day to the current day, we need to add a record of the current day for each user. Therefore, we first append today's date for each \`user_id\` manually, and then sort all values by \`user_id\` and \`visit_date\` in ascending order.

To do this, we first create a new DataFrame with all unique \`user_id\` from the DataFrame \`user_visits\` and append today's date to a new column called \`visit_date\` for all \`user_id\`s.

\`\`\`python
#getting unique user_ids from user_visits
today = user_visits[['user_id']].drop_duplicates()
#append today's date to all user_ids
today['visit_date'] = pd.to_datetime('2021-01-01')
\`\`\`

We then combine this new DataFrame with the original DataFrame into a new DataFrame \`df\` and sort the values by \`user_id\` and \`visit_date\`. Now, each user has an additional record for the current day, and their visit dates are sorted so that we can calculate the date interval between neighboring visits in the next step.

\`\`\`python
df = pd.concat([user_visits, today]).sort_values(by=['user_id', 'visit_date'])
\`\`\`

We now achieved the first two bullets in the list, and get a new DataFrame with all original \`visit_date\` and today's date sorted by each \`user_id\` in an ascending order. 

| user_id | visit_date |
| ------- | ---------- |
| 1       | 2020-10-20 |
| 1       | 2020-11-28 |
| 1       | 2020-12-03 |
| 1       | 2021-01-01 |
| 2       | 2020-10-05 |
| 2       | 2020-12-09 |
| 2       | 2021-01-01 |
| 3       | 2020-11-11 |
| 3       | 2021-01-01 |

Since we have all the \`visit_date\`s in one column (the first approach puts the current \`visit_date\` and next \`visit_date\` in two separate columns), we can use the function \`diff()\` to calculate the difference in days between the \`visit_date\` and the last \`visit_date\`. Notice we also need \`groupby\` for this step, so we won't compare two \`visit_date\`s from two different users.

\`\`\`python
df['window'] = df.groupby('user_id').visit_date.diff().dt.days
\`\`\`

Below is the output from this step. We now have the window of days between each \`visit_date\` and the one right after it for all \`user_id\`s. 

| user_id | visit_date | window |
| ------- | ---------- | ------ |
| 1       | 2020-10-20 | null   |
| 1       | 2020-11-28 | 39     |
| 1       | 2020-12-03 | 5      |
| 1       | 2021-01-01 | 29     |
| 2       | 2020-10-05 | null   |
| 2       | 2020-12-09 | 65     |
| 2       | 2021-01-01 | 23     |
| 3       | 2020-11-11 | null   |
| 3       | 2021-01-01 | 51     |

Lastly, we can identify the maximum window for each \`user_id\` using \`groupby\`. To get the final output, we also need to rename the column. 

\`\`\`python
biggest_window = df.groupby(['user_id'], as_index=False).window.max()
\`\`\`

<!-- h4 for sections -->
#### Implementation
​<iframe src="https://leetcode.com/playground/frmRGCZT/shared" frameBorder="0" width="100%" height="310" name="frmRGCZT"></iframe>
---
​
## Database
​
To find out the largest window of days between each visit and the one right after it, there are several things need to be done: 

- for each \`user_id\`, we need to sort the \`visit_date\` in an ascending order to later identify the next \`visit_date\`
- today's date needs to be added as the last \`visit_date\` for each \`user_id\` 
- for each \`user_id\`, we need to calculate the differences between the current \`visit_date\` and the next \`visit_date\`, which is the window of days between each visit 
- from all windows of days, we need to identify the maximum window for each \`user_id\`

<!-- h3 for approaches -->
### Approach 1: Find Next Using LEAD() + Append Value Using IFNULL()

<!-- h4 for sections -->
#### Algorithm

<!-- Describe your approach to solving the problem. -->

In this approach, the first three bullet points can be achieved together using: 
- \`LEAD(visit_date, 1) OVER (PARTITION BY user_id ORDER BY visit_date)\` This \`LEAD\` function is used to retrieve the next value of a specified column. Here, it fetches the next date in the sorted order of the \`visit_date\` column since we use \`ORDER BY visited_date\`, partitioned by \`user_id\` so that we will handle each user separately. This means that for each user, it finds the next visit date.
- \`IFNULL(..., '2021-01-01')\` This \`IFNULL\` function will check whether the first expression is NULL and return the value of the second expression if it is. Here, it checks the result of the previous \`LEAD\` function. If the result is NULL, meaning there is no next visit date, it will return the default value '2021-01-01'. This step ensures that we always have a default date value for further calculations.
- \`DATEDIFF(..., visit_date)\` This \`DATEDIFF\` function calculates the difference in days between two dates from the result of the previous step. Here, it computes the number of days between two dates, where the first date is the result of the preceding \`IFNULL\` step (either the next visit date or our default date '2021-01-01'), and the second date is the current visit_date. This will determine the number of days between the current visit date and the next visit date.

\`\`\`sql
SELECT user_id, visit_date,
       DATEDIFF(IFNULL(LEAD(visit_date, 1)OVER(PARTITION BY user_id ORDER BY visit_date), '2021-01-01'), visit_date) AS w
FROM UserVisits
\`\`\`

We now have the window of days between each visit and the one right after it for each \`user_id\`.

| user_id | visit_date | w  |
| ------- | ---------- | -- |
| 1       | 2020-10-20 | 39 |
| 1       | 2020-11-28 | 5  |
| 1       | 2020-12-03 | 29 |
| 2       | 2020-10-05 | 65 |
| 2       | 2020-12-09 | 23 |
| 3       | 2020-11-11 | 51 |

To get the final output, we only need to identify the maximum window for each \`user_id\` and rename the column in the main query, the above step can be placed in either a subquery or CTE. 

<!-- h4 for sections -->
#### Implementation
\`\`\`mysql []
SELECT user_id, MAX(w) AS biggest_window
  FROM(
SELECT user_id, visit_date,
    DATEDIFF(IFNULL(LEAD(visit_date, 1) OVER(PARTITION BY user_id ORDER BY visit_date), '2021-01-01'), visit_date) AS w
FROM UserVisits) AS a
GROUP BY user_id
\`\`\`


### Approach 2: Find the Next Visit Using RANK()

<!-- h4 for sections -->
#### Algorithm

<!-- Describe your approach to solving the problem. -->

In this approach, to calculate the interval from the last day to the current day, we need to add a record of the current day for each user. We first manually append today's date for each \`user_id\`, which is the second bullet point from the list. 

\`\`\`sql
WITH all_dates AS (
    SELECT user_id, visit_date
    FROM UserVisits
    UNION
    SELECT user_id, '2021-01-01' AS visit_date
    FROM UserVisits)
\`\`\`
​
We then sort all the \`visit_dates\`s for each \`user_id\` in an ascending order. Since all \`visit_date\`s are stored in the same column, we can add a rank for each \`visit_date\` per \`user_id\` for later calculation. Both goals can be achieved by the function \`RANK()\`.

\`\`\`sql
SELECT *, 
    RANK()OVER(PARTITION BY user_id ORDER BY visit_date) AS date_rnk
FROM all_dates
\`\`\`

After these two steps, we now have today's date added to the column \`visit_date\` and a rank column for the \`visit_date\`s by each \`user_id\`.

| user_id | visit_date | date_rnk |
| ------- | ---------- | -------- |
| 1       | 2020-10-20 | 1        |
| 1       | 2020-11-28 | 2        |
| 1       | 2020-12-03 | 3        |
| 1       | 2021-01-01 | 4        |
| 2       | 2020-10-05 | 1        |
| 2       | 2020-12-09 | 2        |
| 2       | 2021-01-01 | 3        |
| 3       | 2020-11-11 | 1        |
| 3       | 2021-01-01 | 2        |

Now we can calculate and identify the biggest window between two dates in the main query. For this approach, we compare the current \`visit_date\` and the next \`visit_date\` using table alias as all \`visit_date\` are stored in the same column: we define one table alias as the table that stores the current \`visit_date\` (\`date_rnk\`) and the other as the table that stores the next \`visit_date\` (\`date_rnk\`+1). We also added the filter to make sure the two table alias are comparing the \`visit_date\` for the same \`user_id\`. We use the function \`DATEDIFF()\` to compare the difference in days between two dates, and identify the biggest window of days using \`MAX()\`. The result is grouped at the \`user_id\` level.

\`\`\`sql
SELECT a.user_id, MAX(DATEDIFF(b.visit_date, a.visit_date)) AS biggest_window
FROM rnk a, rnk b
WHERE a.user_id = b.user_id
AND b.date_rnk = a.date_rnk + 1
GROUP BY a.user_id
\`\`\`

<!-- h4 for sections -->

#### Implementation
\`\`\`mysql []
WITH all_dates AS(
    SELECT user_id, visit_date
    FROM UserVisits
    UNION
    SELECT user_id, '2021-01-01' AS 'visit_date'
    FROM UserVisits)
, rnk AS(
    SELECT *, 
        RANK()OVER(PARTITION BY user_id ORDER BY visit_date) AS date_rnk
    FROM all_dates
)
SELECT a.user_id, MAX(DATEDIFF(b.visit_date, a.visit_date)) AS biggest_window
FROM rnk a, rnk b
WHERE a.user_id = b.user_id
AND b.date_rnk = a.date_rnk + 1
GROUP BY a.user_id
\`\`\`
<!-- an empty line to separate approaches -->

----`,
        "originalCategory": "advanced"
    },
    {
        "id": "1747",
        "title": "Leetflex Banned Accounts",
        "difficulty": "medium",
        "description": "<p>Table: <code>LogInfo</code></p>\\n\\n<pre>\\n+------------+------------+------------+------------+\\n| account_id | ip_address | login      | logout     |\\n+------------+------------+------------+------------+\\n| int        | int        | datetime   | datetime   |\\n+------------+------------+------------+------------+\\n</pre>\\n\\n<p>&nbsp;</p>\\n\\n<p>Write a solution to find the account_id of the accounts that should be banned from Leetflex. An account should be banned if it was logged in at some moment from <strong>two different IP addresses</strong>. Return the result table in <strong>any order</strong>.</p>\\n\\n<p>The result format is in the following example.</p>\\n\\n<p>&nbsp;</p>\\n<p><strong class=\\\"example\\\">Example 1:</strong></p>\\n\\n<pre>\\n<strong>Input:</strong> \\nLogInfo table:\\n+------------+------------+---------------------+---------------------+\\n| account_id | ip_address | login               | logout              |\\n+------------+------------+---------------------+---------------------+\\n| 1          | 1          | 2021-02-01 09:00:00 | 2021-02-01 09:30:00 |\\n| 1          | 2          | 2021-02-01 08:00:00 | 2021-02-01 11:30:00 |\\n| 2          | 6          | 2021-02-01 20:30:00 | 2021-02-01 22:00:00 |\\n| 2          | 7          | 2021-02-02 20:30:00 | 2021-02-02 22:00:00 |\\n| 3          | 9          | 2021-02-01 16:00:00 | 2021-02-01 16:59:59 |\\n| 3          | 13         | 2021-02-01 17:00:00 | 2021-02-01 17:59:59 |\\n| 4          | 10         | 2021-02-01 16:00:00 | 2021-02-01 17:00:00 |\\n| 4          | 11         | 2021-02-01 17:00:00 | 2021-02-01 17:59:59 |\\n+------------+------------+---------------------+---------------------+\\n<strong>Output:</strong> \\n+------------+\\n| account_id |\\n+------------+\\n| 1          |\\n| 4          |\\n+------------+\\n<strong>Explanation:</strong> \\nAccount 1 logged in from two different IPs (1 and 2) with overlapping sessions. Same for account 4.\\n</pre>\\n",
        "schema": "Create table If Not Exists LogInfo (account_id int, ip_address int, login datetime, logout datetime)\nTruncate table LogInfo\ninsert into LogInfo (account_id, ip_address, login, logout) values ('1', '1', '2021-02-01 09:00:00', '2021-02-01 09:30:00')\ninsert into LogInfo (account_id, ip_address, login, logout) values ('1', '2', '2021-02-01 08:00:00', '2021-02-01 11:30:00')\ninsert into LogInfo (account_id, ip_address, login, logout) values ('2', '6', '2021-02-01 20:30:00', '2021-02-01 22:00:00')\ninsert into LogInfo (account_id, ip_address, login, logout) values ('2', '7', '2021-02-02 20:30:00', '2021-02-02 22:00:00')\ninsert into LogInfo (account_id, ip_address, login, logout) values ('3', '9', '2021-02-01 16:00:00', '2021-02-01 16:59:59')\ninsert into LogInfo (account_id, ip_address, login, logout) values ('3', '13', '2021-02-01 17:00:00', '2021-02-01 17:59:59')\ninsert into LogInfo (account_id, ip_address, login, logout) values ('4', '10', '2021-02-01 16:00:00', '2021-02-01 17:00:00')\ninsert into LogInfo (account_id, ip_address, login, logout) values ('4', '11', '2021-02-01 17:00:00', '2021-02-01 17:59:59')",
        "slug": "leetflex-banned-accounts",
        "originalCategory": "advanced"
    },
    {
        "id": "1783",
        "title": "Grand Slam Titles",
        "difficulty": "medium",
        "description": "<p>Table: <code>Players</code></p>\\n\\n<pre>\\n+------------+-------------+\\n| player_id  | player_name |\\n+------------+-------------+\\n| int        | varchar(20) |\\n+------------+-------------+\\n</pre>\\n\\n<p>Table: <code>Championships</code></p>\\n\\n<pre>\\n+------------+------------+------------+------------+------------+\\n| year       | Wimbledon  | Fr_open    | US_open    | Au_open    |\\n+------------+------------+------------+------------+------------+\\n| int        | int        | int        | int        | int        |\\n+------------+------------+------------+------------+------------+\\n</pre>\\n\\n<p>&nbsp;</p>\\n\\n<p>Write a solution to report the number of grand slam tournaments won by each player. Do not include the players who did not win any tournament. Return the result table in <strong>any order</strong>.</p>\\n\\n<p>The result format is in the following example.</p>\\n\\n<p>&nbsp;</p>\\n<p><strong class=\\\"example\\\">Example 1:</strong></p>\\n\\n<pre>\\n<strong>Input:</strong> \\nPlayers table:\\n+-----------+-------------+\\n| player_id | player_name |\\n+-----------+-------------+\\n| 1         | Nadal       |\\n| 2         | Federer     |\\n| 3         | Novak       |\\n+-----------+-------------+\\nChampionships table:\\n+------+-----------+---------+---------+---------+\\n| year | Wimbledon | Fr_open | US_open | Au_open |\\n+------+-----------+---------+---------+---------+\\n| 2018 | 1         | 1       | 1       | 1       |\\n| 2019 | 1         | 1       | 2       | 2       |\\n| 2020 | 2         | 1       | 2       | 2       |\\n+------+-----------+---------+---------+---------+\\n<strong>Output:</strong> \\n+-----------+-------------+-------------------+\\n| player_id | player_name | grand_slams_count |\\n+-----------+-------------+-------------------+\\n| 2         | Federer     | 5                 |\\n| 1         | Nadal       | 7                 |\\n+-----------+-------------+-------------------+\\n<strong>Explanation:</strong> \\nNadal won 7 across all years. Federer won 5.\\n</pre>\\n",
        "schema": "Create table If Not Exists Players (player_id int, player_name varchar(20))\nCreate table If Not Exists Championships (year int, Wimbledon int, Fr_open int, US_open int, Au_open int)\nTruncate table Players\ninsert into Players (player_id, player_name) values ('1', 'Nadal')\ninsert into Players (player_id, player_name) values ('2', 'Federer')\ninsert into Players (player_id, player_name) values ('3', 'Novak')\nTruncate table Championships\ninsert into Championships (year, Wimbledon, Fr_open, US_open, Au_open) values ('2018', '1', '1', '1', '1')\ninsert into Championships (year, Wimbledon, Fr_open, US_open, Au_open) values ('2019', '1', '1', '2', '2')\ninsert into Championships (year, Wimbledon, Fr_open, US_open, Au_open) values ('2020', '2', '1', '2', '2')",
        "slug": "grand-slam-titles",
        "originalCategory": "advanced"
    },
    {
        "id": "1831",
        "title": "Maximum Transaction Each Day",
        "difficulty": "medium",
        "description": "<p>Table: <code>Transactions</code></p>\\n\\n<pre>\\n+----------------+------------+------------+\\n| transaction_id | day        | amount     |\\n+----------------+------------+------------+\\n| int            | date       | int        |\\n+----------------+------------+------------+\\n</pre>\\n\\n<p>&nbsp;</p>\\n\\n<p>Write a solution to report the IDs of the transactions with the maximum <code>amount</code> on their respective day. If in one day there are multiple such transactions, return all of them. Return the result table ordered by <code>transaction_id</code> in ascending order.</p>\\n\\n<p>The result format is in the following example.</p>\\n\\n<p>&nbsp;</p>\\n<p><strong class=\\\"example\\\">Example 1:</strong></p>\\n\\n<pre>\\n<strong>Input:</strong> \\nTransactions table:\\n+----------------+--------------------+--------+\\n| transaction_id | day                | amount |\\n+----------------+--------------------+--------+\\n| 8              | 2021-4-3 15:57:28  | 57     |\\n| 9              | 2021-4-28 08:47:25 | 21     |\\n| 1              | 2021-4-29 13:28:30 | 58     |\\n| 5              | 2021-4-28 16:39:59 | 40     |\\n| 6              | 2021-4-29 23:39:28 | 58     |\\n+----------------+--------------------+--------+\\n<strong>Output:</strong> \\n+----------------+\\n| transaction_id |\\n+----------------+\\n| 1              |\\n| 5              |\\n| 6              |\\n| 8              |\\n+----------------+\\n</pre>\\n",
        "schema": "Create table If Not Exists Transactions (transaction_id int, day date, amount int)\nTruncate table Transactions\ninsert into Transactions (transaction_id, day, amount) values ('8', '2021-4-3 15:57:28', '57')\ninsert into Transactions (transaction_id, day, amount) values ('9', '2021-4-28 08:47:25', '21')\ninsert into Transactions (transaction_id, day, amount) values ('1', '2021-4-29 13:28:30', '58')\ninsert into Transactions (transaction_id, day, amount) values ('5', '2021-4-28 16:39:59', '40')\ninsert into Transactions (transaction_id, day, amount) values ('6', '2021-4-29 23:39:28', '58')",
        "slug": "maximum-transaction-each-day",
        "originalCategory": "advanced"
    },
    {
        "id": "1907",
        "title": "Count Salary Categories",
        "difficulty": "medium",
        "description": "<p>Table: <code>Accounts</code></p>\n\n<pre>\n+-------------+------+\n| Column Name | Type |\n+-------------+------+\n| account_id  | int  |\n| income      | int  |\n+-------------+------+\naccount_id is the primary key (column with unique values) for this table.\nEach row contains information about the monthly income for one bank account.\n</pre>\n\n<p>&nbsp;</p>\n\n<p>Write a solution&nbsp;to calculate the number of bank accounts for each salary category. The salary categories are:</p>\n\n<ul>\n\t<li><code>&quot;Low Salary&quot;</code>: All the salaries <strong>strictly less</strong> than <code>$20000</code>.</li>\n\t<li><code>&quot;Average Salary&quot;</code>: All the salaries in the <strong>inclusive</strong> range <code>[$20000, $50000]</code>.</li>\n\t<li><code>&quot;High Salary&quot;</code>: All the salaries <strong>strictly greater</strong> than <code>$50000</code>.</li>\n</ul>\n\n<p>The result table <strong>must</strong> contain all three categories. If there are no accounts in a category,&nbsp;return&nbsp;<code>0</code>.</p>\n\n<p>Return the result table in <strong>any order</strong>.</p>\n\n<p>The&nbsp;result format is in the following example.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> \nAccounts table:\n+------------+--------+\n| account_id | income |\n+------------+--------+\n| 3          | 108939 |\n| 2          | 12747  |\n| 8          | 87709  |\n| 6          | 91796  |\n+------------+--------+\n<strong>Output:</strong> \n+----------------+----------------+\n| category       | accounts_count |\n+----------------+----------------+\n| Low Salary     | 1              |\n| Average Salary | 0              |\n| High Salary    | 3              |\n+----------------+----------------+\n<strong>Explanation:</strong> \nLow Salary: Account 2.\nAverage Salary: No accounts.\nHigh Salary: Accounts 3, 6, and 8.\n</pre>\n",
        "schema": "Create table If Not Exists Accounts (account_id int, income int)\nTruncate table Accounts\ninsert into Accounts (account_id, income) values ('3', '108939')\ninsert into Accounts (account_id, income) values ('2', '12747')\ninsert into Accounts (account_id, income) values ('8', '87709')\ninsert into Accounts (account_id, income) values ('6', '91796')",
        "slug": "count-salary-categories",
        "originalCategory": "advanced"
    },
    {
        "id": "1412",
        "title": "Find the Quiet Students in All Exams",
        "difficulty": "hard",
        "description": "<p>Table: <code>Student</code></p>\\n\\n<pre>\\n+------------+--------------+\\n| student_id | student_name |\\n+------------+--------------+\\n| int        | varchar(30)  |\\n+------------+--------------+\\n</pre>\\n\\n<p>Table: <code>Exam</code></p>\\n\\n<pre>\\n+------------+------------+------------+\\n| exam_id    | student_id | score      |\\n+------------+------------+------------+\\n| int        | int        | int        |\\n+------------+------------+------------+\\n</pre>\\n\\n<p>&nbsp;</p>\\n\\n<p>A <strong>quiet student</strong> is the one who took at least one exam and did not score the highest or the lowest mark in any of the exams. Write a solution to report the students (<code>student_id, student_name</code>) being quiet in all exams. Do not return the student who has never taken any exam. Return the result table ordered by <code>student_id</code>.</p>\\n\\n<p>The result format is in the following example.</p>\\n\\n<p>&nbsp;</p>\\n<p><strong class=\\\"example\\\">Example 1:</strong></p>\\n\\n<pre>\\n<strong>Input:</strong> \\nStudent table:\\n+------------+--------------+\\n| student_id | student_name |\\n+------------+--------------+\\n| 1          | Daniel       |\\n| 2          | Jade         |\\n| 3          | Stella       |\\n| 4          | Jonathan     |\\n| 5          | Will         |\\n+------------+--------------+\\nExam table:\\n+---------+------------+-------+\\n| exam_id | student_id | score |\\n+---------+------------+-------+\\n| 10      | 1          | 70    |\\n| 10      | 2          | 80    |\\n| 10      | 3          | 90    |\\n| 20      | 1          | 80    |\\n| 30      | 1          | 70    |\\n| 30      | 3          | 80    |\\n| 30      | 4          | 90    |\\n| 40      | 1          | 60    |\\n| 40      | 2          | 70    |\\n| 40      | 4          | 80    |\\n+---------+------------+-------+\\n<strong>Output:</strong> \\n+------------+--------------+\\n| student_id | student_name |\\n+------------+--------------+\\n| 2          | Jade         |\\n+------------+--------------+\\n<strong>Explanation:</strong> \\nStudent 1 scored highest/lowest in some exams. Student 2 (Jade) never scored highest or lowest in any exam she took. Students 3, 4 scored highest or lowest at some point. Student 5 never took an exam.\\n</pre>\\n",
        "schema": "Create table If Not Exists Student (student_id int, student_name varchar(30))\nCreate table If Not Exists Exam (exam_id int, student_id int, score int)\nTruncate table Student\ninsert into Student (student_id, student_name) values ('1', 'Daniel')\ninsert into Student (student_id, student_name) values ('2', 'Jade')\ninsert into Student (student_id, student_name) values ('3', 'Stella')\ninsert into Student (student_id, student_name) values ('4', 'Jonathan')\ninsert into Student (student_id, student_name) values ('5', 'Will')\nTruncate table Exam\ninsert into Exam (exam_id, student_id, score) values ('10', '1', '70')\ninsert into Exam (exam_id, student_id, score) values ('10', '2', '80')\ninsert into Exam (exam_id, student_id, score) values ('10', '3', '90')\ninsert into Exam (exam_id, student_id, score) values ('20', '1', '80')\ninsert into Exam (exam_id, student_id, score) values ('30', '1', '70')\ninsert into Exam (exam_id, student_id, score) values ('30', '3', '80')\ninsert into Exam (exam_id, student_id, score) values ('30', '4', '90')\ninsert into Exam (exam_id, student_id, score) values ('40', '1', '60')\ninsert into Exam (exam_id, student_id, score) values ('40', '2', '70')\ninsert into Exam (exam_id, student_id, score) values ('40', '4', '80')",
        "slug": "find-the-quiet-students-in-all-exams",
        "originalCategory": "advanced"
    }
];
