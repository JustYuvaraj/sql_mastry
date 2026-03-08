// LeetCode SQL Patterns - subqueries.js
export const subqueries = [
    {
        "id": "183",
        "title": "Customers Who Never Order",
        "difficulty": "easy",
        "description": "<p>Table: <code>Customers</code></p>\n\n<pre>\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| name        | varchar |\n+-------------+---------+\nid is the primary key (column with unique values) for this table.\nEach row of this table indicates the ID and name of a customer.\n</pre>\n\n<p>&nbsp;</p>\n\n<p>Table: <code>Orders</code></p>\n\n<pre>\n+-------------+------+\n| Column Name | Type |\n+-------------+------+\n| id          | int  |\n| customerId  | int  |\n+-------------+------+\nid is the primary key (column with unique values) for this table.\ncustomerId is a foreign key (reference columns) of the ID from the Customers table.\nEach row of this table indicates the ID of an order and the ID of the customer who ordered it.\n</pre>\n\n<p>&nbsp;</p>\n\n<p>Write a solution to find all customers who never order anything.</p>\n\n<p>Return the result table in <strong>any order</strong>.</p>\n\n<p>The result format is in the following example.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> \nCustomers table:\n+----+-------+\n| id | name  |\n+----+-------+\n| 1  | Joe   |\n| 2  | Henry |\n| 3  | Sam   |\n| 4  | Max   |\n+----+-------+\nOrders table:\n+----+------------+\n| id | customerId |\n+----+------------+\n| 1  | 3          |\n| 2  | 1          |\n+----+------------+\n<strong>Output:</strong> \n+-----------+\n| Customers |\n+-----------+\n| Henry     |\n| Max       |\n+-----------+\n</pre>\n",
        "schema": "Create table If Not Exists Customers (id int, name varchar(255))\nCreate table If Not Exists Orders (id int, customerId int)\nTruncate table Customers\ninsert into Customers (id, name) values ('1', 'Joe')\ninsert into Customers (id, name) values ('2', 'Henry')\ninsert into Customers (id, name) values ('3', 'Sam')\ninsert into Customers (id, name) values ('4', 'Max')\nTruncate table Orders\ninsert into Orders (id, customerId) values ('1', '3')\ninsert into Orders (id, customerId) values ('2', '1')",
        "slug": "customers-who-never-order",
        "originalCategory": "subqueries"
    },
    {
        "id": "1978",
        "title": "Employees Whose Manager Left the Company",
        "difficulty": "easy",
        "description": "<p>Table: <code>Employees</code></p>\n\n<pre>\n+-------------+----------+\n| Column Name | Type     |\n+-------------+----------+\n| employee_id | int      |\n| name        | varchar  |\n| manager_id  | int      |\n| salary      | int      |\n+-------------+----------+\nIn SQL, employee_id is the primary key for this table.\nThis table contains information about the employees, their salary, and the ID of their manager. Some employees do not have a manager (manager_id is null). \n</pre>\n\n<p>&nbsp;</p>\n\n<p>Find the IDs of the employees whose salary is strictly less than <code>$30000</code> and whose manager left the company. When a manager leaves the company, their information is deleted from the <code>Employees</code> table, but the reports still have their <code>manager_id</code> set to the manager that left.</p>\n\n<p>Return the result table ordered by <code>employee_id</code>.</p>\n\n<p>The result format is in the following example.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input: </strong> \nEmployees table:\n+-------------+-----------+------------+--------+\n| employee_id | name      | manager_id | salary |\n+-------------+-----------+------------+--------+\n| 3           | Mila      | 9          | 60301  |\n| 12          | Antonella | null       | 31000  |\n| 13          | Emery     | null       | 67084  |\n| 1           | Kalel     | 11         | 21241  |\n| 9           | Mikaela   | null       | 50937  |\n| 11          | Joziah    | 6          | 28485  |\n+-------------+-----------+------------+--------+\n<strong>Output:</strong> \n+-------------+\n| employee_id |\n+-------------+\n| 11          |\n+-------------+\n\n<strong>Explanation:</strong> \nThe employees with a salary less than $30000 are 1 (Kalel) and 11 (Joziah).\nKalel&#39;s manager is employee 11, who is still in the company (Joziah).\nJoziah&#39;s manager is employee 6, who left the company because there is no row for employee 6 as it was deleted.\n</pre>\n",
        "schema": "Create table If Not Exists Employees (employee_id int, name varchar(20), manager_id int, salary int)\nTruncate table Employees\ninsert into Employees (employee_id, name, manager_id, salary) values ('3', 'Mila', '9', '60301')\ninsert into Employees (employee_id, name, manager_id, salary) values ('12', 'Antonella', NULL, '31000')\ninsert into Employees (employee_id, name, manager_id, salary) values ('13', 'Emery', NULL, '67084')\ninsert into Employees (employee_id, name, manager_id, salary) values ('1', 'Kalel', '11', '21241')\ninsert into Employees (employee_id, name, manager_id, salary) values ('9', 'Mikaela', NULL, '50937')\ninsert into Employees (employee_id, name, manager_id, salary) values ('11', 'Joziah', '6', '28485')",
        "slug": "employees-whose-manager-left-the-company",
        "originalCategory": "subqueries"
    },
    {
        "id": "585",
        "title": "Investments in 2016",
        "difficulty": "medium",
        "description": "<p>Table: <code>Insurance</code></p>\n\n<pre>\n+-------------+-------+\n| Column Name | Type  |\n+-------------+-------+\n| pid         | int   |\n| tiv_2015    | float |\n| tiv_2016    | float |\n| lat         | float |\n| lon         | float |\n+-------------+-------+\npid is the primary key (column with unique values) for this table.\nEach row of this table contains information about one policy where:\npid is the policyholder&#39;s policy ID.\ntiv_2015 is the total investment value in 2015 and tiv_2016 is the total investment value in 2016.\nlat is the latitude of the policy holder&#39;s city. It&#39;s guaranteed that lat is not NULL.\nlon is the longitude of the policy holder&#39;s city. It&#39;s guaranteed that lon is not NULL.\n</pre>\n\n<p>&nbsp;</p>\n\n<p>Write a solution to report the sum of all total investment values in 2016 <code>tiv_2016</code>, for all policyholders who:</p>\n\n<ul>\n\t<li>have the same <code>tiv_2015</code> value as one or more other policyholders, and</li>\n\t<li>are not located in the same city as any other policyholder (i.e., the (<code>lat, lon</code>) attribute pairs must be unique).</li>\n</ul>\n\n<p>Round <code>tiv_2016</code> to <strong>two decimal places</strong>.</p>\n\n<p>The&nbsp;result format is in the following example.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> \nInsurance table:\n+-----+----------+----------+-----+-----+\n| pid | tiv_2015 | tiv_2016 | lat | lon |\n+-----+----------+----------+-----+-----+\n| 1   | 10       | 5        | 10  | 10  |\n| 2   | 20       | 20       | 20  | 20  |\n| 3   | 10       | 30       | 20  | 20  |\n| 4   | 10       | 40       | 40  | 40  |\n+-----+----------+----------+-----+-----+\n<strong>Output:</strong> \n+----------+\n| tiv_2016 |\n+----------+\n| 45.00    |\n+----------+\n<strong>Explanation:</strong> \nThe first record in the table, like the last record, meets both of the two criteria.\nThe tiv_2015 value 10 is the same as the third and fourth records, and its location is unique.\n\nThe second record does not meet any of the two criteria. Its tiv_2015 is not like any other policyholders and its location is the same as the third record, which makes the third record fail, too.\nSo, the result is the sum of tiv_2016 of the first and last record, which is 45.\n</pre>\n",
        "schema": "Create Table If Not Exists Insurance (pid int, tiv_2015 float, tiv_2016 float, lat float, lon float)\nTruncate table Insurance\ninsert into Insurance (pid, tiv_2015, tiv_2016, lat, lon) values ('1', '10', '5', '10', '10')\ninsert into Insurance (pid, tiv_2015, tiv_2016, lat, lon) values ('2', '20', '20', '20', '20')\ninsert into Insurance (pid, tiv_2015, tiv_2016, lat, lon) values ('3', '10', '30', '20', '20')\ninsert into Insurance (pid, tiv_2015, tiv_2016, lat, lon) values ('4', '10', '40', '40', '40')",
        "slug": "investments-in-2016",
        "originalCategory": "subqueries"
    },
    {
        "id": "602",
        "title": "Friend Requests II: Who Has the Most Friends",
        "difficulty": "medium",
        "description": "<p>Table: <code>RequestAccepted</code></p>\n\n<pre>\n+----------------+---------+\n| Column Name    | Type    |\n+----------------+---------+\n| requester_id   | int     |\n| accepter_id    | int     |\n| accept_date    | date    |\n+----------------+---------+\n(requester_id, accepter_id) is the primary key (combination of columns with unique values) for this table.\nThis table contains the ID of the user who sent the request, the ID of the user who received the request, and the date when the request was accepted.\n</pre>\n\n<p>&nbsp;</p>\n\n<p>Write a solution to find the people who have the most friends and the most friends number.</p>\n\n<p>The test cases are generated so that only one person has the most friends.</p>\n\n<p>The result format is in the following example.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> \nRequestAccepted table:\n+--------------+-------------+-------------+\n| requester_id | accepter_id | accept_date |\n+--------------+-------------+-------------+\n| 1            | 2           | 2016/06/03  |\n| 1            | 3           | 2016/06/08  |\n| 2            | 3           | 2016/06/08  |\n| 3            | 4           | 2016/06/09  |\n+--------------+-------------+-------------+\n<strong>Output:</strong> \n+----+-----+\n| id | num |\n+----+-----+\n| 3  | 3   |\n+----+-----+\n<strong>Explanation:</strong> \nThe person with id 3 is a friend of people 1, 2, and 4, so he has three friends in total, which is the most number than any others.\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Follow up:</strong> In the real world, multiple people could have the same most number of friends. Could you find all these people in this case?</p>\n",
        "schema": "Create table If Not Exists RequestAccepted (requester_id int not null, accepter_id int null, accept_date date null)\nTruncate table RequestAccepted\ninsert into RequestAccepted (requester_id, accepter_id, accept_date) values ('1', '2', '2016/06/03')\ninsert into RequestAccepted (requester_id, accepter_id, accept_date) values ('1', '3', '2016/06/08')\ninsert into RequestAccepted (requester_id, accepter_id, accept_date) values ('2', '3', '2016/06/08')\ninsert into RequestAccepted (requester_id, accepter_id, accept_date) values ('3', '4', '2016/06/09')",
        "slug": "friend-requests-ii-who-has-the-most-friends",
        "editorial": `​
<!-- Don't delete this -->
[TOC]
​
# Solution
​
---
​
## pandas

<!-- h3 for approaches -->
### Approach: Combining DataFrames Using concat() and Finding the Top Values Using sort_values() and head()


<!-- h4 for sections -->
#### Algorithm

<!-- Describe your approach to solving the problem. -->
Since one person can acquire a friend by either requesting or accepting a friend request, to get how many friends each person has, we can count how many times their id appeared in either the column \`requester_id\` or the column \`accepter_id\`. It's generally a good idea to combine the two columns into one for easier calculation. 

Let's start by combining the two columns. We can leverage the function \`concat()\` to combine DataFrames just like using \`UNION/UNION ALL\` in MySQL, or, in this case, combine only the columns. We add the function \`to_frame()\` to convert the result from a Series to a DataFrame. For later calculation, we also renamed the newly created column as \`id\`.

\`\`\`python
values = pd.concat([request_accepted["requester_id"], request_accepted["accepter_id"]]).to_frame('id')
\`\`\`

We now have the two columns \`requester_id\` and \`accepter_id\` combined into one. 

| id |
| -- |
| 1  |
| 1  |
| 2  |
| 3  |
| 2  |
| 3  |
| 3  |
| 4  |

Now we only need to count how many times each \`id\` appeared in the list and identify the \`id\` with the maximum count. To do this, we can apply \`count()\` to \`id\` and group the result at the \`id\` level. We can leverage the function \`agg()\` to get the aggregate value and rename the result at the same time. To look for the maximum count, we sort the list by the count (the newly created column \`num\`) in descending order using the function \`sort_values()\` and passing the parameter \`ascending=False\` to the function. The \`id\` that has the most friends is now listed at the top, and we can select this record using the function \`head()\`.  

\`\`\`python
df = values.groupby('id', as_index=False).agg(num=('id', 'count')).sort_values('num', ascending=False).head(1)
\`\`\`

<!-- h4 for sections -->
#### Implementation
​<iframe src="https://leetcode.com/playground/mLCXWMTb/shared" frameBorder="0" width="100%" height="191" name="mLCXWMTb"></iframe>
<!-- an empty line to separate approaches -->

----
​
​
## Database


<!-- h3 for approaches -->
### Approach 1: Combining Tables Using UNION ALL and Finding the Top Values Using ORDER BY + LIMIT

<!-- h4 for sections -->
#### Algorithm

<!-- Describe your approach to solving the problem. -->

Since one person can acquire a friend by either requesting or accepting a friend request, to get how many friends each person has, we can count how many times their id appeared in either the column \`requester_id\` or the column \`accepter_id\`. It's generally a good idea to combine the two columns into one for easier calculation. 

Let's start by combining the two columns. For this problem, it's important to use \`UNION ALL\` so all duplicate values are kept. Both columns are renamed as \`id\`, and we can put this step in a CTE for later usage. 

\`\`\`sql
WITH all_ids AS (
   SELECT requester_id AS id 
   FROM RequestAccepted
   UNION ALL
   SELECT accepter_id AS id
   FROM RequestAccepted)
\`\`\`

Next, we can count how many times each \`id\` appeared in the list and identify the \`id\` with the maximum count. To do this, we can group the aggregate value \`COUNT(id)\` at the \`id\` level. To retain only the \`id\` that has the maximum counts, we can sort the result by the \`COUNT(id)\` in descending order and take only the first record using \`LIMIT\`. Last but not least, we rename the aggregate count to \`num\` for the final output. All of these steps can be achieved in the main query without creating any subqueries. 


\`\`\`sql
SELECT id, 
   COUNT(id) AS num
FROM all_ids
GROUP BY id
ORDER BY COUNT(id) DESC
LIMIT 1
\`\`\`

<!-- h4 for sections -->
#### Implementation

\`\`\`mysql []
WITH all_ids AS (
   SELECT requester_id AS id 
   FROM RequestAccepted
   UNION ALL
   SELECT accepter_id AS id
   FROM RequestAccepted)
SELECT id, 
   COUNT(id) AS num
FROM all_ids
GROUP BY id
ORDER BY COUNT(id) DESC
LIMIT 1
\`\`\`
​
<!-- an empty line to separate approaches -->


### Approach 2: Combining Tables Using UNION ALL and Finding Top Values Using RANK()

<!-- h4 for sections -->
#### Algorithm

<!-- Describe your approach to solving the problem. -->
The main difference between this approach and the first one is that this approach can include multiple \`id\`s if there is more than one person who has the most number of friends. Also, it's never a bad idea to use the window function.  

Similarly, we can start by combining the two columns into one. For this problem, it's important to use \`UNION ALL\` so all duplicate values are kept. Both columns are renamed as \`id\`, and we can put this step in a CTE for later usage. 


\`\`\`sql
WITH all_ids AS (
   SELECT requester_id AS id 
   FROM RequestAccepted
   UNION ALL
   SELECT accepter_id AS id
   FROM RequestAccepted)
\`\`\`

In the subquery, we can count how many times each \`id\` appeared in the list using \`COUNT()\` and \`GROUP\` the result at the \`id\` level. The calculated result is renamed to \`num\` as requested by the final output. Additionally, we can append a rank to the records per the aggregate count in descending order. 

\`\`\`sql
   (
   SELECT id, 
      COUNT(id) AS num, 
      RANK () OVER(ORDER BY COUNT(id) DESC) AS rnk
   FROM all_ids
   GROUP BY id
   )t0
\`\`\`

Now we can select the top record, which is the \`id\` that has the maximum count (number of friends), in the main query. 

\`\`\`sql
SELECT id, num
FROM 
   (
   SELECT id, 
      COUNT(id) AS num, 
      RANK () OVER(ORDER BY COUNT(id) DESC) AS rnk
   FROM all_ids
   GROUP BY id
   )t0
WHERE rnk=1
\`\`\`

<!-- h4 for sections -->
#### Implementation

\`\`\`mysql []
WITH all_ids AS (
   SELECT requester_id AS id 
   FROM RequestAccepted
   UNION ALL
   SELECT accepter_id AS id
   FROM RequestAccepted)
SELECT id, num
FROM 
   (
   SELECT id, 
      COUNT(id) AS num, 
      RANK () OVER(ORDER BY COUNT(id) DESC) AS rnk
   FROM all_ids
   GROUP BY id
   )t0
WHERE rnk=1
\`\`\`
----`,
        "originalCategory": "subqueries"
    },
    {
        "id": "626",
        "title": "Exchange Seats",
        "difficulty": "medium",
        "description": "<p>Table: <code>Seat</code></p>\n\n<pre>\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| student     | varchar |\n+-------------+---------+\nid is the primary key (unique value) column for this table.\nEach row of this table indicates the name and the ID of a student.\nThe ID sequence always starts from 1 and increments continuously.\n</pre>\n\n<p>&nbsp;</p>\n\n<p>Write a solution to swap the seat id of every two consecutive students. If the number of students is odd, the id of the last student is not swapped.</p>\n\n<p>Return the result table ordered by <code>id</code> <strong>in ascending order</strong>.</p>\n\n<p>The result format is in the following example.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> \nSeat table:\n+----+---------+\n| id | student |\n+----+---------+\n| 1  | Abbot   |\n| 2  | Doris   |\n| 3  | Emerson |\n| 4  | Green   |\n| 5  | Jeames  |\n+----+---------+\n<strong>Output:</strong> \n+----+---------+\n| id | student |\n+----+---------+\n| 1  | Doris   |\n| 2  | Abbot   |\n| 3  | Green   |\n| 4  | Emerson |\n| 5  | Jeames  |\n+----+---------+\n<strong>Explanation:</strong> \nNote that if the number of students is odd, there is no need to change the last one&#39;s seat.\n</pre>\n",
        "schema": "Create table If Not Exists Seat (id int, student varchar(255))\nTruncate table Seat\ninsert into Seat (id, student) values ('1', 'Abbot')\ninsert into Seat (id, student) values ('2', 'Doris')\ninsert into Seat (id, student) values ('3', 'Emerson')\ninsert into Seat (id, student) values ('4', 'Green')\ninsert into Seat (id, student) values ('5', 'Jeames')",
        "slug": "exchange-seats",
        "originalCategory": "subqueries"
    },
    {
        "id": "1045",
        "title": "Customers Who Bought All Products",
        "difficulty": "medium",
        "description": "<p>Table: <code>Customer</code></p>\n\n<pre>\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| customer_id | int     |\n| product_key | int     |\n+-------------+---------+\nThis table may contain duplicates rows. \n<code>customer_id</code> is not NULL<code>.</code>\nproduct_key is a foreign key (reference column) to <code>Product</code> table.\n</pre>\n\n<p>&nbsp;</p>\n\n<p>Table: <code>Product</code></p>\n\n<pre>\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| product_key | int     |\n+-------------+---------+\nproduct_key is the primary key (column with unique values) for this table.\n</pre>\n\n<p>&nbsp;</p>\n\n<p>Write a solution to report the customer ids from the <code>Customer</code> table that bought all the products in the <code>Product</code> table.</p>\n\n<p>Return the result table in <strong>any order</strong>.</p>\n\n<p>The&nbsp;result format is in the following example.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> \nCustomer table:\n+-------------+-------------+\n| customer_id | product_key |\n+-------------+-------------+\n| 1           | 5           |\n| 2           | 6           |\n| 3           | 5           |\n| 3           | 6           |\n| 1           | 6           |\n+-------------+-------------+\nProduct table:\n+-------------+\n| product_key |\n+-------------+\n| 5           |\n| 6           |\n+-------------+\n<strong>Output:</strong> \n+-------------+\n| customer_id |\n+-------------+\n| 1           |\n| 3           |\n+-------------+\n<strong>Explanation:</strong> \nThe customers who bought all the products (5 and 6) are customers with IDs 1 and 3.\n</pre>\n",
        "schema": "Create table If Not Exists Customer (customer_id int, product_key int)\nCreate table Product (product_key int)\nTruncate table Customer\ninsert into Customer (customer_id, product_key) values ('1', '5')\ninsert into Customer (customer_id, product_key) values ('2', '6')\ninsert into Customer (customer_id, product_key) values ('3', '5')\ninsert into Customer (customer_id, product_key) values ('3', '6')\ninsert into Customer (customer_id, product_key) values ('1', '6')\nTruncate table Product\ninsert into Product (product_key) values ('5')\ninsert into Product (product_key) values ('6')",
        "slug": "customers-who-bought-all-products",
        "originalCategory": "subqueries"
    },
    {
        "id": "1321",
        "title": "Restaurant Growth",
        "difficulty": "medium",
        "description": "<p>Table: <code>Customer</code></p>\n\n<pre>\n+---------------+---------+\n| Column Name   | Type    |\n+---------------+---------+\n| customer_id   | int     |\n| name          | varchar |\n| visited_on    | date    |\n| amount        | int     |\n+---------------+---------+\nIn SQL,(customer_id, visited_on) is the primary key for this table.\nThis table contains data about customer transactions in a restaurant.\nvisited_on is the date on which the customer with ID (customer_id) has visited the restaurant.\namount is the total paid by a customer.\n</pre>\n\n<p>&nbsp;</p>\n\n<p>You are the restaurant owner and you want to analyze a possible expansion (there will be at least one customer every day).</p>\n\n<p>Compute the moving average of how much the customer paid in a seven days window (i.e., current day + 6 days before). <code>average_amount</code> should be <strong>rounded to two decimal places</strong>.</p>\n\n<p>Return the result table ordered by <code>visited_on</code> <strong>in ascending order</strong>.</p>\n\n<p>The result format is in the following example.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> \nCustomer table:\n+-------------+--------------+--------------+-------------+\n| customer_id | name         | visited_on   | amount      |\n+-------------+--------------+--------------+-------------+\n| 1           | Jhon         | 2019-01-01   | 100         |\n| 2           | Daniel       | 2019-01-02   | 110         |\n| 3           | Jade         | 2019-01-03   | 120         |\n| 4           | Khaled       | 2019-01-04   | 130         |\n| 5           | Winston      | 2019-01-05   | 110         | \n| 6           | Elvis        | 2019-01-06   | 140         | \n| 7           | Anna         | 2019-01-07   | 150         |\n| 8           | Maria        | 2019-01-08   | 80          |\n| 9           | Jaze         | 2019-01-09   | 110         | \n| 1           | Jhon         | 2019-01-10   | 130         | \n| 3           | Jade         | 2019-01-10   | 150         | \n+-------------+--------------+--------------+-------------+\n<strong>Output:</strong> \n+--------------+--------------+----------------+\n| visited_on   | amount       | average_amount |\n+--------------+--------------+----------------+\n| 2019-01-07   | 860          | 122.86         |\n| 2019-01-08   | 840          | 120            |\n| 2019-01-09   | 840          | 120            |\n| 2019-01-10   | 1000         | 142.86         |\n+--------------+--------------+----------------+\n<strong>Explanation:</strong> \n1st moving average from 2019-01-01 to 2019-01-07 has an average_amount of (100 + 110 + 120 + 130 + 110 + 140 + 150)/7 = 122.86\n2nd moving average from 2019-01-02 to 2019-01-08 has an average_amount of (110 + 120 + 130 + 110 + 140 + 150 + 80)/7 = 120\n3rd moving average from 2019-01-03 to 2019-01-09 has an average_amount of (120 + 130 + 110 + 140 + 150 + 80 + 110)/7 = 120\n4th moving average from 2019-01-04 to 2019-01-10 has an average_amount of (130 + 110 + 140 + 150 + 80 + 110 + 130 + 150)/7 = 142.86\n</pre>\n",
        "schema": "Create table If Not Exists Customer (customer_id int, name varchar(20), visited_on date, amount int)\nTruncate table Customer\ninsert into Customer (customer_id, name, visited_on, amount) values ('1', 'Jhon', '2019-01-01', '100')\ninsert into Customer (customer_id, name, visited_on, amount) values ('2', 'Daniel', '2019-01-02', '110')\ninsert into Customer (customer_id, name, visited_on, amount) values ('3', 'Jade', '2019-01-03', '120')\ninsert into Customer (customer_id, name, visited_on, amount) values ('4', 'Khaled', '2019-01-04', '130')\ninsert into Customer (customer_id, name, visited_on, amount) values ('5', 'Winston', '2019-01-05', '110')\ninsert into Customer (customer_id, name, visited_on, amount) values ('6', 'Elvis', '2019-01-06', '140')\ninsert into Customer (customer_id, name, visited_on, amount) values ('7', 'Anna', '2019-01-07', '150')\ninsert into Customer (customer_id, name, visited_on, amount) values ('8', 'Maria', '2019-01-08', '80')\ninsert into Customer (customer_id, name, visited_on, amount) values ('9', 'Jaze', '2019-01-09', '110')\ninsert into Customer (customer_id, name, visited_on, amount) values ('1', 'Jhon', '2019-01-10', '130')\ninsert into Customer (customer_id, name, visited_on, amount) values ('3', 'Jade', '2019-01-10', '150')",
        "slug": "restaurant-growth",
        "originalCategory": "subqueries"
    },
    {
        "id": "1341",
        "title": "Movie Rating",
        "difficulty": "medium",
        "description": "<p>Table: <code>Movies</code></p>\n\n<pre>\n+---------------+---------+\n| Column Name   | Type    |\n+---------------+---------+\n| movie_id      | int     |\n| title         | varchar |\n+---------------+---------+\nmovie_id is the primary key (column with unique values) for this table.\ntitle is the name of the movie.\nEach movie has a unique title.</pre>\n\n<p>Table: <code>Users</code></p>\n\n<pre>\n+---------------+---------+\n| Column Name   | Type    |\n+---------------+---------+\n| user_id       | int     |\n| name          | varchar |\n+---------------+---------+\nuser_id is the primary key (column with unique values) for this table.\nThe column &#39;name&#39; has unique values.\n</pre>\n\n<p>Table: <code>MovieRating</code></p>\n\n<pre>\n+---------------+---------+\n| Column Name   | Type    |\n+---------------+---------+\n| movie_id      | int     |\n| user_id       | int     |\n| rating        | int     |\n| created_at    | date    |\n+---------------+---------+\n(movie_id, user_id) is the primary key (column with unique values) for this table.\nThis table contains the rating of a movie by a user in their review.\ncreated_at is the user&#39;s review date. \n</pre>\n\n<p>&nbsp;</p>\n\n<p>Write a solution to:</p>\n\n<ul>\n\t<li>Find the name of the user who has rated the greatest number of movies. In case of a tie, return the lexicographically smaller user name.</li>\n\t<li>Find the movie name with the <strong>highest average</strong> rating in <code>February 2020</code>. In case of a tie, return the lexicographically smaller movie name.</li>\n</ul>\n\n<p>The&nbsp;result format is in the following example.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> \nMovies table:\n+-------------+--------------+\n| movie_id    |  title       |\n+-------------+--------------+\n| 1           | Avengers     |\n| 2           | Frozen 2     |\n| 3           | Joker        |\n+-------------+--------------+\nUsers table:\n+-------------+--------------+\n| user_id     |  name        |\n+-------------+--------------+\n| 1           | Daniel       |\n| 2           | Monica       |\n| 3           | Maria        |\n| 4           | James        |\n+-------------+--------------+\nMovieRating table:\n+-------------+--------------+--------------+-------------+\n| movie_id    | user_id      | rating       | created_at  |\n+-------------+--------------+--------------+-------------+\n| 1           | 1            | 3            | 2020-01-12  |\n| 1           | 2            | 4            | 2020-02-11  |\n| 1           | 3            | 2            | 2020-02-12  |\n| 1           | 4            | 1            | 2020-01-01  |\n| 2           | 1            | 5            | 2020-02-17  | \n| 2           | 2            | 2            | 2020-02-01  | \n| 2           | 3            | 2            | 2020-03-01  |\n| 3           | 1            | 3            | 2020-02-22  | \n| 3           | 2            | 4            | 2020-02-25  | \n+-------------+--------------+--------------+-------------+\n<strong>Output:</strong> \n+--------------+\n| results      |\n+--------------+\n| Daniel       |\n| Frozen 2     |\n+--------------+\n<strong>Explanation:</strong> \nDaniel and Monica have rated 3 movies (&quot;Avengers&quot;, &quot;Frozen 2&quot; and &quot;Joker&quot;) but Daniel is smaller lexicographically.\nFrozen 2 and Joker have a rating average of 3.5 in February but Frozen 2 is smaller lexicographically.\n</pre>\n",
        "schema": "Create table If Not Exists Movies (movie_id int, title varchar(30))\nCreate table If Not Exists Users (user_id int, name varchar(30))\nCreate table If Not Exists MovieRating (movie_id int, user_id int, rating int, created_at date)\nTruncate table Movies\ninsert into Movies (movie_id, title) values ('1', 'Avengers')\ninsert into Movies (movie_id, title) values ('2', 'Frozen 2')\ninsert into Movies (movie_id, title) values ('3', 'Joker')\nTruncate table Users\ninsert into Users (user_id, name) values ('1', 'Daniel')\ninsert into Users (user_id, name) values ('2', 'Monica')\ninsert into Users (user_id, name) values ('3', 'Maria')\ninsert into Users (user_id, name) values ('4', 'James')\nTruncate table MovieRating\ninsert into MovieRating (movie_id, user_id, rating, created_at) values ('1', '1', '3', '2020-01-12')\ninsert into MovieRating (movie_id, user_id, rating, created_at) values ('1', '2', '4', '2020-02-11')\ninsert into MovieRating (movie_id, user_id, rating, created_at) values ('1', '3', '2', '2020-02-12')\ninsert into MovieRating (movie_id, user_id, rating, created_at) values ('1', '4', '1', '2020-01-01')\ninsert into MovieRating (movie_id, user_id, rating, created_at) values ('2', '1', '5', '2020-02-17')\ninsert into MovieRating (movie_id, user_id, rating, created_at) values ('2', '2', '2', '2020-02-01')\ninsert into MovieRating (movie_id, user_id, rating, created_at) values ('2', '3', '2', '2020-03-01')\ninsert into MovieRating (movie_id, user_id, rating, created_at) values ('3', '1', '3', '2020-02-22')\ninsert into MovieRating (movie_id, user_id, rating, created_at) values ('3', '2', '4', '2020-02-25')",
        "slug": "movie-rating",
        "originalCategory": "subqueries"
    },
    {
        "id": "1398",
        "title": "Customers Who Bought Products A and B but Not C",
        "difficulty": "medium",
        "description": "<p>Table: <code>Customers</code></p>\\n\\n<pre>\\n+-------------+---------------+\\n| customer_id | customer_name |\\n+-------------+---------------+\\n| int         | varchar(30)   |\\n+-------------+---------------+\\n</pre>\\n\\n<p>Table: <code>Orders</code></p>\\n\\n<pre>\\n+------------+-------------+--------------+\\n| order_id   | customer_id | product_name |\\n+------------+-------------+--------------+\\n| int        | int         | varchar(30)  |\\n+------------+-------------+--------------+\\n</pre>\\n\\n<p>&nbsp;</p>\\n\\n<p>Write a solution to report the customer_id and customer_name of customers who bought products <strong>\"A\"</strong> and <strong>\"B\"</strong> but did not buy the product <strong>\"C\"</strong>. Return the result table ordered by <code>customer_id</code>.</p>\\n\\n<p>The result format is in the following example.</p>\\n\\n<p>&nbsp;</p>\\n<p><strong class=\\\"example\\\">Example 1:</strong></p>\\n\\n<pre>\\n<strong>Input:</strong> \\nCustomers table:\\n+-------------+---------------+\\n| customer_id | customer_name |\\n+-------------+---------------+\\n| 1           | Daniel        |\\n| 2           | Diana         |\\n| 3           | Elizabeth     |\\n| 4           | Jhon          |\\n+-------------+---------------+\\nOrders table:\\n+----------+-------------+--------------+\\n| order_id | customer_id | product_name |\\n+----------+-------------+--------------+\\n| 10       | 1           | A            |\\n| 20       | 1           | B            |\\n| 30       | 1           | D            |\\n| 40       | 1           | C            |\\n| 50       | 2           | A            |\\n| 60       | 3           | A            |\\n| 70       | 3           | B            |\\n| 80       | 3           | D            |\\n| 90       | 4           | C            |\\n+----------+-------------+--------------+\\n<strong>Output:</strong> \\n+-------------+---------------+\\n| customer_id | customer_name |\\n+-------------+---------------+\\n| 3           | Elizabeth     |\\n+-------------+---------------+\\n<strong>Explanation:</strong> \\nCustomer 1 bought A, B, and C so excluded. Customer 2 only bought A. Customer 3 bought A and B but not C. Customer 4 only bought C.\\n</pre>\\n",
        "schema": "Create table If Not Exists Customers (customer_id int, customer_name varchar(30))\nCreate table If Not Exists Orders (order_id int, customer_id int, product_name varchar(30))\nTruncate table Customers\ninsert into Customers (customer_id, customer_name) values ('1', 'Daniel')\ninsert into Customers (customer_id, customer_name) values ('2', 'Diana')\ninsert into Customers (customer_id, customer_name) values ('3', 'Elizabeth')\ninsert into Customers (customer_id, customer_name) values ('4', 'Jhon')\nTruncate table Orders\ninsert into Orders (order_id, customer_id, product_name) values ('10', '1', 'A')\ninsert into Orders (order_id, customer_id, product_name) values ('20', '1', 'B')\ninsert into Orders (order_id, customer_id, product_name) values ('30', '1', 'D')\ninsert into Orders (order_id, customer_id, product_name) values ('40', '1', 'C')\ninsert into Orders (order_id, customer_id, product_name) values ('50', '2', 'A')\ninsert into Orders (order_id, customer_id, product_name) values ('60', '3', 'A')\ninsert into Orders (order_id, customer_id, product_name) values ('70', '3', 'B')\ninsert into Orders (order_id, customer_id, product_name) values ('80', '3', 'D')\ninsert into Orders (order_id, customer_id, product_name) values ('90', '4', 'C')",
        "slug": "customers-who-bought-products-a-and-b-but-not-c",
        "originalCategory": "subqueries"
    },
    {
        "id": "185",
        "title": "Department Top Three Salaries",
        "difficulty": "hard",
        "description": "<p>Table: <code>Employee</code></p>\n\n<pre>\n+--------------+---------+\n| Column Name  | Type    |\n+--------------+---------+\n| id           | int     |\n| name         | varchar |\n| salary       | int     |\n| departmentId | int     |\n+--------------+---------+\nid is the primary key (column with unique values) for this table.\ndepartmentId is a foreign key (reference column) of the ID from the <code>Department </code>table.\nEach row of this table indicates the ID, name, and salary of an employee. It also contains the ID of their department.\n</pre>\n\n<p>&nbsp;</p>\n\n<p>Table: <code>Department</code></p>\n\n<pre>\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| name        | varchar |\n+-------------+---------+\nid is the primary key (column with unique values) for this table.\nEach row of this table indicates the ID of a department and its name.\n</pre>\n\n<p>&nbsp;</p>\n\n<p>A company&#39;s executives are interested in seeing who earns the most money in each of the company&#39;s departments. A <strong>high earner</strong> in a department is an employee who has a salary in the <strong>top three unique</strong> salaries for that department.</p>\n\n<p>Write a solution to find the employees who are <strong>high earners</strong> in each of the departments.</p>\n\n<p>Return the result table <strong>in any order</strong>.</p>\n\n<p>The&nbsp;result format is in the following example.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> \nEmployee table:\n+----+-------+--------+--------------+\n| id | name  | salary | departmentId |\n+----+-------+--------+--------------+\n| 1  | Joe   | 85000  | 1            |\n| 2  | Henry | 80000  | 2            |\n| 3  | Sam   | 60000  | 2            |\n| 4  | Max   | 90000  | 1            |\n| 5  | Janet | 69000  | 1            |\n| 6  | Randy | 85000  | 1            |\n| 7  | Will  | 70000  | 1            |\n+----+-------+--------+--------------+\nDepartment table:\n+----+-------+\n| id | name  |\n+----+-------+\n| 1  | IT    |\n| 2  | Sales |\n+----+-------+\n<strong>Output:</strong> \n+------------+----------+--------+\n| Department | Employee | Salary |\n+------------+----------+--------+\n| IT         | Max      | 90000  |\n| IT         | Joe      | 85000  |\n| IT         | Randy    | 85000  |\n| IT         | Will     | 70000  |\n| Sales      | Henry    | 80000  |\n| Sales      | Sam      | 60000  |\n+------------+----------+--------+\n<strong>Explanation:</strong> \nIn the IT department:\n- Max earns the highest unique salary\n- Both Randy and Joe earn the second-highest unique salary\n- Will earns the third-highest unique salary\n\nIn the Sales department:\n- Henry earns the highest salary\n- Sam earns the second-highest salary\n- There is no third-highest salary as there are only two employees\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li>There are no employees with the <strong>exact</strong> same name, salary <em>and</em> department.</li>\n</ul>\n",
        "schema": "Create table If Not Exists Employee (id int, name varchar(255), salary int, departmentId int)\nCreate table If Not Exists Department (id int, name varchar(255))\nTruncate table Employee\ninsert into Employee (id, name, salary, departmentId) values ('1', 'Joe', '85000', '1')\ninsert into Employee (id, name, salary, departmentId) values ('2', 'Henry', '80000', '2')\ninsert into Employee (id, name, salary, departmentId) values ('3', 'Sam', '60000', '2')\ninsert into Employee (id, name, salary, departmentId) values ('4', 'Max', '90000', '1')\ninsert into Employee (id, name, salary, departmentId) values ('5', 'Janet', '69000', '1')\ninsert into Employee (id, name, salary, departmentId) values ('6', 'Randy', '85000', '1')\ninsert into Employee (id, name, salary, departmentId) values ('7', 'Will', '70000', '1')\nTruncate table Department\ninsert into Department (id, name) values ('1', 'IT')\ninsert into Department (id, name) values ('2', 'Sales')",
        "slug": "department-top-three-salaries",
        "editorial": `​
<!-- Don't delete this -->
[TOC]
​
# Solution
​
---
​
## pandas

<!-- h3 for approaches -->
### Approach 1: Return the First n Rows Using nlargest()

<!-- h4 for sections -->
#### Algorithm

<!-- Describe your approach to solving the problem. -->
For this problem, we can either identify the top earners first using DataFrame \`employee\` and then join the DataFrame \`department\` to get the department name, or join the DataFrame \`department\` first to get the department name before identifying the top earners. In this approach, we use the latter logic. 

In this step, we can also update the column name in the DataFrame \`department\` from \`name\` to \`Department\` as requested by the final output.

\`\`\`python
Employee_Department = employee.merge(department, left_on='departmentId', right_on='id').rename(columns = {'name_y': 'Department'})
\`\`\`

Now we have the employee and department information stored in the same DataFrame: 

| id_x | name_x | salary | departmentId | id_y | Department |
| ---- | ------ | ------ | ------------ | ---- | ---------- |
| 1    | Joe    | 85000  | 1            | 1    | IT         |
| 4    | Max    | 90000  | 1            | 1    | IT         |
| 5    | Janet  | 69000  | 1            | 1    | IT         |
| 6    | Randy  | 85000  | 1            | 1    | IT         |
| 7    | Will   | 70000  | 1            | 1    | IT         |
| 2    | Henry  | 80000  | 2            | 2    | Sales      |
| 3    | Sam    | 60000  | 2            | 2    | Sales      |

Since the definition of a **high earner** is an employee who has a salary in the top three **unique** salaries for the department, we want to make sure the salary is unique at the department level for later calculation. To do this, we select only the department and salary from the DataFrame created in the last step and drop any duplicated records if existed. 

\`\`\`python
Employee_Department = Employee_Department[['Department', 'departmentId', 'salary']].drop_duplicates()
\`\`\`

Here's the output after this step:

| Department | departmentId | salary |
| ---------- | ------------ | ------ |
| IT         | 1            | 85000  |
| IT         | 1            | 90000  |
| IT         | 1            | 69000  |
| IT         | 1            | 70000  |
| Sales      | 2            | 80000  |
| Sales      | 2            | 60000  |

Now we can identify the top 3 unique salaries for each department. We use the function [\`nlargest()\`](https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.nlargest.html) to get this value. The parameter '3' is passed to the function as it defines the number of rows to return. 

\`\`\`python
top_salary = Employee_Department.groupby(['Department', 'departmentId']).salary.nlargest(3).reset_index()
\`\`\`

| Department | departmentId | level_2 | salary |
| ---------- | ------------ | ------- | ------ |
| IT         | 1            | 1       | 90000  |
| IT         | 1            | 0       | 85000  |
| IT         | 1            | 4       | 70000  |
| Sales      | 2            | 5       | 80000  |
| Sales      | 2            | 6       | 60000  |


Now we only need to identify the employees are in these departments and making the same amount of salary. To do this, we can merge the DataFrame \`top_salary\`, which contains the top three unique salary for each department, to the DataFrame \`employee\` on \`departmentId\` and \`salary\`, so only the employees that match both criteria will be retained. 

\`\`\`python
df = top_salary.merge(employee, on=['departmentId', 'salary'])
\`\`\`

| Department | departmentId | level_2 | salary | id | name  |
| ---------- | ------------ | ------- | ------ | -- | ----- |
| IT         | 1            | 1       | 90000  | 4  | Max   |
| IT         | 1            | 0       | 85000  | 1  | Joe   |
| IT         | 1            | 0       | 85000  | 6  | Randy |
| IT         | 1            | 4       | 70000  | 7  | Will  |
| Sales      | 2            | 5       | 80000  | 2  | Henry |
| Sales      | 2            | 6       | 60000  | 3  | Sam   |

Lastly, we clean the DataFrame as per requested by the final output. We keep only the columns needed and rename the columns accordingly.

\`\`\`python
df[['Department', 'name', 'salary']].rename(columns = {'name': 'Employee', 'salary': 'Salary'})
\`\`\`

<!-- h4 for sections -->
#### Implementation
​<iframe src="https://leetcode.com/playground/5nLUgFZZ/shared" frameBorder="0" width="100%" height="276" name="5nLUgFZZ"></iframe>
<!-- an empty line to separate approaches -->


<!-- h3 for approaches -->
### Approach 2: Return the First n Rows Using rank()

<!-- h4 for sections -->
#### Algorithm

<!-- Describe your approach to solving the problem. -->
For this approach, we first identify the top earners from the DataFrame \`employee\` and then join the DataFrame \`department\` to get the department name. 

To identify the high earners for each department, we use the function [\`rank()\`](https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.rank.html) to apply dense rank on the column \`salary\` so we can get the top three **unique** salaries. The parameter \`ascending=False\` is passed so the salary is sorted from the maximum to the minimum. Within the same step, we can also add the filter to keep only the records with a rank smaller than or equal to 3. 

\`\`\`python
top_salary = employee[employee.groupby('departmentId').salary.rank(method='dense', ascending=False) <= 3]
\`\`\`

Only employees who are \`high earners\` retained in the new DataFrame:

| id | name  | salary | departmentId |
| -- | ----- | ------ | ------------ |
| 1  | Joe   | 85000  | 1            |
| 2  | Henry | 80000  | 2            |
| 3  | Sam   | 60000  | 2            |
| 4  | Max   | 90000  | 1            |
| 6  | Randy | 85000  | 1            |
| 7  | Will  | 70000  | 1            |

Now we want to \`merge\` to the DataFrame \`department\` to get the \`name\` of the department. In the same step, we can also select only the columns needed for the final output. 

\`\`\`python
employee_department = top_salary.merge(department, left_on='departmentId', right_on='id')[['name_y', 'name_x', 'salary']]
\`\`\`
| name_y | name_x | salary |
| ------ | ------ | ------ |
| IT     | Joe    | 85000  |
| IT     | Max    | 90000  |
| IT     | Randy  | 85000  |
| IT     | Will   | 70000  |
| Sales  | Henry  | 80000  |
| Sales  | Sam    | 60000  |


We are almost there! To get the final output, we need to update the column name as per requested.

\`\`\`python
return employee_department.rename(columns = {'name_y': 'Department', 'name_x': 'Employee', 'salary': 'Salary'})
\`\`\`

<!-- h4 for sections -->
#### Implementation
<iframe src="https://leetcode.com/playground/WbvUZqck/shared" frameBorder="0" width="100%" height="208" name="WbvUZqck"></iframe>
---

## Database

### Approach 1: Return the First n Rows Using Correlated Subquery

<!-- h4 for sections -->
#### Algorithm
​<!-- Describe your approach to solving the problem. -->
We can build a [correlated subquery](https://dev.mysql.com/doc/refman/8.0/en/correlated-subqueries.html) to identify the top N records from more than one category. Since the correlated subquery is dependent on the main query, the idea behind this approach is to compare the values between the main query and the subquery, so that in the subquery, at most N-1 salaries can be greater than each selected salary from the main query.

To do this, we first build the main query. In the main query, we can also join the table \`Employee\` to the table \`Department\` on \`departmentId\` to get the \`name\` of the departments and rename the columns as requested by the final output. 

\`\`\`sql
SELECT d.name AS 'Department', 
       e1.name AS 'Employee', 
       e1.salary AS 'Salary' 
FROM Employee e1
JOIN Department d
ON e1.departmentId = d.id 
\`\`\`

In the correlated subquery, we select the number of salaries from the same table \`Employee\`. To compare the salaries between the main query and the subquery, we make sure the department is the same from both queries, but the salary from the subquery is always bigger than the salary from the main query. 

\`\`\`sql
(
    SELECT COUNT(DISTINCT e2.salary)
    FROM Employee e2
    WHERE e2.salary > e1.salary AND e1.departmentId = e2.departmentId
)
\`\`\`

Since we need to identify the top three high earners in the main query, and the subquery always has larger salaries than the salaries from the main query, the maximum count of the larger salaries in the subquery is two. We add this criteria as a filter to the main query.

<!-- h4 for sections -->
#### Implementation

\`\`\`sql
SELECT d.name AS 'Department', 
       e1.name AS 'Employee', 
       e1.salary AS 'Salary' 
FROM Employee e1
JOIN Department d
ON e1.departmentId = d.id 
WHERE
    3 > (SELECT COUNT(DISTINCT e2.salary)
        FROM Employee e2
        WHERE e2.salary > e1.salary AND e1.departmentId = e2.departmentId);
\`\`\`
​
<!-- an empty line to separate approaches -->

<!-- h3 for approaches -->
### Approach 2: Return the First n Rows Using DENSE_RANK()

<!-- h4 for sections -->
#### Algorithm
​<!-- Describe your approach to solving the problem. -->
Unlike the previous approach that utilized a correlated subquery, in this approach, we sorted the salaries in descending order, ranked employees based on their salaries within the department, and selected only the first 3 employees for the final output.

We first create a subquery or CTE to rank the employees. Since the definition of a high earner is the employee who has a salary in the top three **unique** salaries for the department, we can use the function \`DENSE_RANK()\` to avoid the scenario that employees from the same department make the same amount of salary. In this step, we can also join the table \`Department\` on \`departmentId\` to get the \`name\` of the departments and rename the columns for the final output. 

\`\`\`sql
WITH employee_department AS
    (
    SELECT d.id, 
        d.name AS Department, 
        salary AS Salary, 
        e.name AS Employee, 
        DENSE_RANK()OVER(PARTITION BY d.id ORDER BY salary DESC) AS rnk
    FROM Department d
    JOIN Employee e
    ON d.id = e.departmentId
    )
\`\`\`

Now, each employee has a rank based on the \`salary\` in a descending order for each department. 

| id | Department | Salary | Employee | rnk |
| -- | ---------- | ------ | -------- | --- |
| 1  | IT         | 90000  | Max      | 1   |
| 1  | IT         | 85000  | Joe      | 2   |
| 1  | IT         | 85000  | Randy    | 2   |
| 1  | IT         | 70000  | Will     | 3   |
| 1  | IT         | 69000  | Janet    | 4   |
| 2  | Sales      | 80000  | Henry    | 1   |
| 2  | Sales      | 60000  | Sam      | 2   |

With the rank, we can select the high earners. We can add the filter to select employees that have a rank smaller than or equal to 3 in the main query. 

\`\`\`sql
SELECT Department, Employee, Salary
FROM employee_department
WHERE rnk <= 3
\`\`\`
<!-- h4 for sections -->
#### Implementation

\`\`\`mysql []
WITH employee_department AS
    (
    SELECT d.id, 
        d.name AS Department, 
        salary AS Salary, 
        e.name AS Employee, 
        DENSE_RANK()OVER(PARTITION BY d.id ORDER BY salary DESC) AS rnk
    FROM Department d
    JOIN Employee e
    ON d.id = e.departmentId
    )
SELECT Department, Employee, Salary
FROM employee_department
WHERE rnk <= 3
\`\`\`
​
----
<!-- an empty line to separate approaches -->`,
        "originalCategory": "subqueries"
    }
];
