// LeetCode SQL Patterns - string-date.js
export const stringdate = [
    {
        "id": "196",
        "title": "Delete Duplicate Emails",
        "difficulty": "easy",
        "description": "<p>Table: <code>Person</code></p>\n\n<pre>\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| email       | varchar |\n+-------------+---------+\nid is the primary key (column with unique values) for this table.\nEach row of this table contains an email. The emails will not contain uppercase letters.\n</pre>\n\n<p>&nbsp;</p>\n\n<p>Write a solution to<strong> delete</strong> all duplicate emails, keeping only one unique email with the smallest <code>id</code>.</p>\n\n<p>For SQL users, please note that you are supposed to write a <code>DELETE</code> statement and not a <code>SELECT</code> one.</p>\n\n<p>For Pandas users, please note that you are supposed to modify <code>Person</code> in place.</p>\n\n<p>After running your script, the answer shown is the <code>Person</code> table. The driver will first compile and run your piece of code and then show the <code>Person</code> table. The final order of the <code>Person</code> table <strong>does not matter</strong>.</p>\n\n<p>The result format is in the following example.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> \nPerson table:\n+----+------------------+\n| id | email            |\n+----+------------------+\n| 1  | john@example.com |\n| 2  | bob@example.com  |\n| 3  | john@example.com |\n+----+------------------+\n<strong>Output:</strong> \n+----+------------------+\n| id | email            |\n+----+------------------+\n| 1  | john@example.com |\n| 2  | bob@example.com  |\n+----+------------------+\n<strong>Explanation:</strong> john@example.com is repeated two times. We keep the row with the smallest Id = 1.\n</pre>\n",
        "schema": "Create table If Not Exists Person (Id int, Email varchar(255))\nTruncate table Person\ninsert into Person (id, email) values ('1', 'john@example.com')\ninsert into Person (id, email) values ('2', 'bob@example.com')\ninsert into Person (id, email) values ('3', 'john@example.com')",
        "slug": "delete-duplicate-emails",
        "originalCategory": "string-date"
    },
    {
        "id": "1327",
        "title": "List the Products Ordered in a Period",
        "difficulty": "easy",
        "description": "<p>Table: <code>Products</code></p>\n\n<pre>\n+------------------+---------+\n| Column Name      | Type    |\n+------------------+---------+\n| product_id       | int     |\n| product_name     | varchar |\n| product_category | varchar |\n+------------------+---------+\nproduct_id is the primary key (column with unique values) for this table.\nThis table contains data about the company&#39;s products.\n</pre>\n\n<p>&nbsp;</p>\n\n<p>Table: <code>Orders</code></p>\n\n<pre>\n+---------------+---------+\n| Column Name   | Type    |\n+---------------+---------+\n| product_id    | int     |\n| order_date    | date    |\n| unit          | int     |\n+---------------+---------+\nThis table may have duplicate rows.\nproduct_id is a foreign key (reference column) to the Products table.\nunit is the number of products ordered in order_date.\n</pre>\n\n<p>&nbsp;</p>\n\n<p>Write a solution to get the names of products that have at least <code>100</code> units ordered in <strong>February 2020</strong> and their amount.</p>\n\n<p>Return the result table in <strong>any order</strong>.</p>\n\n<p>The&nbsp;result format is in the following example.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> \nProducts table:\n+-------------+-----------------------+------------------+\n| product_id  | product_name          | product_category |\n+-------------+-----------------------+------------------+\n| 1           | Leetcode Solutions    | Book             |\n| 2           | Jewels of Stringology | Book             |\n| 3           | HP                    | Laptop           |\n| 4           | Lenovo                | Laptop           |\n| 5           | Leetcode Kit          | T-shirt          |\n+-------------+-----------------------+------------------+\nOrders table:\n+--------------+--------------+----------+\n| product_id   | order_date   | unit     |\n+--------------+--------------+----------+\n| 1            | 2020-02-05   | 60       |\n| 1            | 2020-02-10   | 70       |\n| 2            | 2020-01-18   | 30       |\n| 2            | 2020-02-11   | 80       |\n| 3            | 2020-02-17   | 2        |\n| 3            | 2020-02-24   | 3        |\n| 4            | 2020-03-01   | 20       |\n| 4            | 2020-03-04   | 30       |\n| 4            | 2020-03-04   | 60       |\n| 5            | 2020-02-25   | 50       |\n| 5            | 2020-02-27   | 50       |\n| 5            | 2020-03-01   | 50       |\n+--------------+--------------+----------+\n<strong>Output:</strong> \n+--------------------+---------+\n| product_name       | unit    |\n+--------------------+---------+\n| Leetcode Solutions | 130     |\n| Leetcode Kit       | 100     |\n+--------------------+---------+\n<strong>Explanation:</strong> \nProducts with product_id = 1 is ordered in February a total of (60 + 70) = 130.\nProducts with product_id = 2 is ordered in February a total of 80.\nProducts with product_id = 3 is ordered in February a total of (2 + 3) = 5.\nProducts with product_id = 4 was not ordered in February 2020.\nProducts with product_id = 5 is ordered in February a total of (50 + 50) = 100.\n</pre>\n",
        "schema": "Create table If Not Exists Products (product_id int, product_name varchar(40), product_category varchar(40))\nCreate table If Not Exists Orders (product_id int, order_date date, unit int)\nTruncate table Products\ninsert into Products (product_id, product_name, product_category) values ('1', 'Leetcode Solutions', 'Book')\ninsert into Products (product_id, product_name, product_category) values ('2', 'Jewels of Stringology', 'Book')\ninsert into Products (product_id, product_name, product_category) values ('3', 'HP', 'Laptop')\ninsert into Products (product_id, product_name, product_category) values ('4', 'Lenovo', 'Laptop')\ninsert into Products (product_id, product_name, product_category) values ('5', 'Leetcode Kit', 'T-shirt')\nTruncate table Orders\ninsert into Orders (product_id, order_date, unit) values ('1', '2020-02-05', '60')\ninsert into Orders (product_id, order_date, unit) values ('1', '2020-02-10', '70')\ninsert into Orders (product_id, order_date, unit) values ('2', '2020-01-18', '30')\ninsert into Orders (product_id, order_date, unit) values ('2', '2020-02-11', '80')\ninsert into Orders (product_id, order_date, unit) values ('3', '2020-02-17', '2')\ninsert into Orders (product_id, order_date, unit) values ('3', '2020-02-24', '3')\ninsert into Orders (product_id, order_date, unit) values ('4', '2020-03-01', '20')\ninsert into Orders (product_id, order_date, unit) values ('4', '2020-03-04', '30')\ninsert into Orders (product_id, order_date, unit) values ('4', '2020-03-04', '60')\ninsert into Orders (product_id, order_date, unit) values ('5', '2020-02-25', '50')\ninsert into Orders (product_id, order_date, unit) values ('5', '2020-02-27', '50')\ninsert into Orders (product_id, order_date, unit) values ('5', '2020-03-01', '50')",
        "slug": "list-the-products-ordered-in-a-period",
        "originalCategory": "string-date"
    },
    {
        "id": "1484",
        "title": "Group Sold Products By The Date",
        "difficulty": "easy",
        "description": "<p>Table <code>Activities</code>:</p>\n\n<pre>\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| sell_date   | date    |\n| product     | varchar |\n+-------------+---------+\nThere is no primary key (column with unique values) for this table. It may contain duplicates.\nEach row of this table contains the product name and the date it was sold in a market.\n</pre>\n\n<p>&nbsp;</p>\n\n<p>Write a solution to find for each date the number of different products sold and their names.</p>\n\n<p>The sold products names for each date should be sorted lexicographically.</p>\n\n<p>Return the result table ordered by <code>sell_date</code>.</p>\n\n<p>The&nbsp;result format is in the following example.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> \nActivities table:\n+------------+------------+\n| sell_date  | product     |\n+------------+------------+\n| 2020-05-30 | Headphone  |\n| 2020-06-01 | Pencil     |\n| 2020-06-02 | Mask       |\n| 2020-05-30 | Basketball |\n| 2020-06-01 | Bible      |\n| 2020-06-02 | Mask       |\n| 2020-05-30 | T-Shirt    |\n+------------+------------+\n<strong>Output:</strong> \n+------------+----------+------------------------------+\n| sell_date  | num_sold | products                     |\n+------------+----------+------------------------------+\n| 2020-05-30 | 3        | Basketball,Headphone,T-shirt |\n| 2020-06-01 | 2        | Bible,Pencil                 |\n| 2020-06-02 | 1        | Mask                         |\n+------------+----------+------------------------------+\n<strong>Explanation:</strong> \nFor 2020-05-30, Sold items were (Headphone, Basketball, T-shirt), we sort them lexicographically and separate them by a comma.\nFor 2020-06-01, Sold items were (Pencil, Bible), we sort them lexicographically and separate them by a comma.\nFor 2020-06-02, the Sold item is (Mask), we just return it.\n</pre>\n",
        "schema": "Create table If Not Exists Activities (sell_date date, product varchar(20))\nTruncate table Activities\ninsert into Activities (sell_date, product) values ('2020-05-30', 'Headphone')\ninsert into Activities (sell_date, product) values ('2020-06-01', 'Pencil')\ninsert into Activities (sell_date, product) values ('2020-06-02', 'Mask')\ninsert into Activities (sell_date, product) values ('2020-05-30', 'Basketball')\ninsert into Activities (sell_date, product) values ('2020-06-01', 'Bible')\ninsert into Activities (sell_date, product) values ('2020-06-02', 'Mask')\ninsert into Activities (sell_date, product) values ('2020-05-30', 'T-Shirt')",
        "slug": "group-sold-products-by-the-date",
        "originalCategory": "string-date"
    },
    {
        "id": "1517",
        "title": "Find Users With Valid E-Mails",
        "difficulty": "easy",
        "description": "<p>Table: <code>Users</code></p>\n\n<pre>\n+---------------+---------+\n| Column Name   | Type    |\n+---------------+---------+\n| user_id       | int     |\n| name          | varchar |\n| mail          | varchar |\n+---------------+---------+\nuser_id is the primary key (column with unique values) for this table.\nThis table contains information of the users signed up in a website. Some e-mails are invalid.\n</pre>\n\n<p>&nbsp;</p>\n\n<p>Write a solution to find the users who have <strong>valid emails</strong>.</p>\n\n<p>A valid e-mail has a prefix name and a domain where:</p>\n\n<ul>\n\t<li><strong>The prefix name</strong> is a string that may contain letters (upper or lower case), digits, underscore <code>&#39;_&#39;</code>, period <code>&#39;.&#39;</code>, and/or dash <code>&#39;-&#39;</code>. The prefix name <strong>must</strong> start with a letter.</li>\n\t<li><strong>The domain</strong> is <code>&#39;@leetcode.com&#39;</code>.</li>\n</ul>\n\n<p>Return the result table in <strong>any order</strong>.</p>\n\n<p>The result format is in the following example.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> \nUsers table:\n+---------+-----------+-------------------------+\n| user_id | name      | mail                    |\n+---------+-----------+-------------------------+\n| 1       | Winston   | winston@leetcode.com    |\n| 2       | Jonathan  | jonathanisgreat         |\n| 3       | Annabelle | bella-@leetcode.com     |\n| 4       | Sally     | sally.come@leetcode.com |\n| 5       | Marwan    | quarz#2020@leetcode.com |\n| 6       | David     | david69@gmail.com       |\n| 7       | Shapiro   | .shapo@leetcode.com     |\n+---------+-----------+-------------------------+\n<strong>Output:</strong> \n+---------+-----------+-------------------------+\n| user_id | name      | mail                    |\n+---------+-----------+-------------------------+\n| 1       | Winston   | winston@leetcode.com    |\n| 3       | Annabelle | bella-@leetcode.com     |\n| 4       | Sally     | sally.come@leetcode.com |\n+---------+-----------+-------------------------+\n<strong>Explanation:</strong> \nThe mail of user 2 does not have a domain.\nThe mail of user 5 has the # sign which is not allowed.\nThe mail of user 6 does not have the leetcode domain.\nThe mail of user 7 starts with a period.\n</pre>\n",
        "schema": "Create table If Not Exists Users (user_id int, name varchar(30), mail varchar(50))\nTruncate table Users\ninsert into Users (user_id, name, mail) values ('1', 'Winston', 'winston@leetcode.com')\ninsert into Users (user_id, name, mail) values ('2', 'Jonathan', 'jonathanisgreat')\ninsert into Users (user_id, name, mail) values ('3', 'Annabelle', 'bella-@leetcode.com')\ninsert into Users (user_id, name, mail) values ('4', 'Sally', 'sally.come@leetcode.com')\ninsert into Users (user_id, name, mail) values ('5', 'Marwan', 'quarz#2020@leetcode.com')\ninsert into Users (user_id, name, mail) values ('6', 'David', 'david69@gmail.com')\ninsert into Users (user_id, name, mail) values ('7', 'Shapiro', '.shapo@leetcode.com')",
        "slug": "find-users-with-valid-e-mails",
        "originalCategory": "string-date"
    },
    {
        "id": "1527",
        "title": "Patients With a Condition",
        "difficulty": "easy",
        "description": "<p>Table: <code>Patients</code></p>\n\n<pre>\n+--------------+---------+\n| Column Name  | Type    |\n+--------------+---------+\n| patient_id   | int     |\n| patient_name | varchar |\n| conditions   | varchar |\n+--------------+---------+\npatient_id is the primary key (column with unique values) for this table.\n&#39;conditions&#39; contains 0 or more code separated by spaces. \nThis table contains information of the patients in the hospital.\n</pre>\n\n<p>&nbsp;</p>\n\n<p>Write a solution to find the patient_id, patient_name, and conditions of the patients who have Type I Diabetes. Type I Diabetes always starts with <code>DIAB1</code> prefix.</p>\n\n<p>Return the result table in <strong>any order</strong>.</p>\n\n<p>The&nbsp;result format is in the following example.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> \nPatients table:\n+------------+--------------+--------------+\n| patient_id | patient_name | conditions   |\n+------------+--------------+--------------+\n| 1          | Daniel       | YFEV COUGH   |\n| 2          | Alice        |              |\n| 3          | Bob          | DIAB100 MYOP |\n| 4          | George       | ACNE DIAB100 |\n| 5          | Alain        | DIAB201      |\n+------------+--------------+--------------+\n<strong>Output:</strong> \n+------------+--------------+--------------+\n| patient_id | patient_name | conditions   |\n+------------+--------------+--------------+\n| 3          | Bob          | DIAB100 MYOP |\n| 4          | George       | ACNE DIAB100 | \n+------------+--------------+--------------+\n<strong>Explanation:</strong> Bob and George both have a condition that starts with DIAB1.\n</pre>\n",
        "schema": "Create table If Not Exists Patients (patient_id int, patient_name varchar(30), conditions varchar(100))\nTruncate table Patients\ninsert into Patients (patient_id, patient_name, conditions) values ('1', 'Daniel', 'YFEV COUGH')\ninsert into Patients (patient_id, patient_name, conditions) values ('2', 'Alice', '')\ninsert into Patients (patient_id, patient_name, conditions) values ('3', 'Bob', 'DIAB100 MYOP')\ninsert into Patients (patient_id, patient_name, conditions) values ('4', 'George', 'ACNE DIAB100')\ninsert into Patients (patient_id, patient_name, conditions) values ('5', 'Alain', 'DIAB201')",
        "slug": "patients-with-a-condition",
        "originalCategory": "string-date"
    },
    {
        "id": "1667",
        "title": "Fix Names in a Table",
        "difficulty": "easy",
        "description": "<p>Table: <code>Users</code></p>\n\n<pre>\n+----------------+---------+\n| Column Name    | Type    |\n+----------------+---------+\n| user_id        | int     |\n| name           | varchar |\n+----------------+---------+\nuser_id is the primary key (column with unique values) for this table.\nThis table contains the ID and the name of the user. The name consists of only lowercase and uppercase characters.\n</pre>\n\n<p>&nbsp;</p>\n\n<p>Write a solution to fix the names so that only the first character is uppercase and the rest are lowercase.</p>\n\n<p>Return the result table ordered by <code>user_id</code>.</p>\n\n<p>The result format is in the following example.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> \nUsers table:\n+---------+-------+\n| user_id | name  |\n+---------+-------+\n| 1       | aLice |\n| 2       | bOB   |\n+---------+-------+\n<strong>Output:</strong> \n+---------+-------+\n| user_id | name  |\n+---------+-------+\n| 1       | Alice |\n| 2       | Bob   |\n+---------+-------+\n</pre>\n",
        "schema": "Create table If Not Exists Users (user_id int, name varchar(40))\nTruncate table Users\ninsert into Users (user_id, name) values ('1', 'aLice')\ninsert into Users (user_id, name) values ('2', 'bOB')",
        "slug": "fix-names-in-a-table",
        "originalCategory": "string-date"
    },
    {
        "id": "1890",
        "title": "The Latest Login in 2020",
        "difficulty": "easy",
        "description": "<p>Table: <code>Logins</code></p>\n\n<pre>\n+----------------+----------+\n| Column Name    | Type     |\n+----------------+----------+\n| user_id        | int      |\n| time_stamp     | datetime |\n+----------------+----------+\n(user_id, time_stamp) is the primary key (combination of columns with unique values) for this table.\nEach row contains information about the login time for the user with ID user_id.\n</pre>\n\n<p>&nbsp;</p>\n\n<p>Write a solution to report the <strong>latest</strong> login for all users in the year <code>2020</code>. Do <strong>not</strong> include the users who did not login in <code>2020</code>.</p>\n\n<p>Return the result table <strong>in any order</strong>.</p>\n\n<p>The result format is in the following example.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> \nLogins table:\n+---------+---------------------+\n| user_id | time_stamp          |\n+---------+---------------------+\n| 6       | 2020-06-30 15:06:07 |\n| 6       | 2021-04-21 14:06:06 |\n| 6       | 2019-03-07 00:18:15 |\n| 8       | 2020-02-01 05:10:53 |\n| 8       | 2020-12-30 00:46:50 |\n| 2       | 2020-01-16 02:49:50 |\n| 2       | 2019-08-25 07:59:08 |\n| 14      | 2019-07-14 09:00:00 |\n| 14      | 2021-01-06 11:59:59 |\n+---------+---------------------+\n<strong>Output:</strong> \n+---------+---------------------+\n| user_id | last_stamp          |\n+---------+---------------------+\n| 6       | 2020-06-30 15:06:07 |\n| 8       | 2020-12-30 00:46:50 |\n| 2       | 2020-01-16 02:49:50 |\n+---------+---------------------+\n<strong>Explanation:</strong> \nUser 6 logged into their account 3 times but only once in 2020, so we include this login in the result table.\nUser 8 logged into their account 2 times in 2020, once in February and once in December. We include only the latest one (December) in the result table.\nUser 2 logged into their account 2 times but only once in 2020, so we include this login in the result table.\nUser 14 did not login in 2020, so we do not include them in the result table.\n</pre>\n",
        "schema": "Create table If Not Exists Logins (user_id int, time_stamp datetime)\nTruncate table Logins\ninsert into Logins (user_id, time_stamp) values ('6', '2020-06-30 15:06:07')\ninsert into Logins (user_id, time_stamp) values ('6', '2021-04-21 14:06:06')\ninsert into Logins (user_id, time_stamp) values ('6', '2019-03-07 00:18:15')\ninsert into Logins (user_id, time_stamp) values ('8', '2020-02-01 05:10:53')\ninsert into Logins (user_id, time_stamp) values ('8', '2020-12-30 00:46:50')\ninsert into Logins (user_id, time_stamp) values ('2', '2020-01-16 02:49:50')\ninsert into Logins (user_id, time_stamp) values ('2', '2019-08-25 07:59:08')\ninsert into Logins (user_id, time_stamp) values ('14', '2019-07-14 09:00:00')\ninsert into Logins (user_id, time_stamp) values ('14', '2021-01-06 11:59:59')",
        "slug": "the-latest-login-in-2020",
        "editorial": `[TOC]

## Solution

--- 

### Overview

The two conditions needed to get the final result are : 
1. find all records in the year 2020 
2. from these records, identify the latest record for each user

For condition 1, there are two commonly used functions to get the year from a date:

1. [YEAR(date)](https://dev.mysql.com/doc/refman/5.7/en/date-and-time-functions.html#function_year)
2. [EXTRACT(unit from date)](https://dev.mysql.com/doc/refman/5.7/en/date-and-time-functions.html#function_extract): this function can extract different units (e.g. year, month, week) from a date

For condition 2, there are two methods to get the latest record: 
1. [MAX(expr)](https://dev.mysql.com/doc/refman/5.7/en/aggregate-functions.html#function_max): this function returns the maximum value of \`expr\`, and the MAX(time_stamp) returns the latest login time
2. [FIRST_VALUE(expr)](https://dev.mysql.com/doc/refman/8.0/en/window-function-descriptions.html#function_first-value): this window function returns the value of \`expr\` from the first row of the window frame; if the column \`time_stamp\` is sorted in descending order,  the FIRST_VALUE(time_stamp) also returns the latest login time

---

### Approach 1: Using YEAR() to extract year from the date column and MAX() to find the latest record 

#### Algorithm
1. Select the columns needed for the final output
2. Add condition 1 using YEAR() to select all records with a timestamp in the year 2020 
3. Add condition 2 using MAX() to get the latest record for each user from the previous step
4. Group the result by user_id to get the distinct record for each user_id 

##### MySQL

\`\`\`sql
SELECT 
    user_id, 
    MAX(time_stamp) AS last_stamp
FROM 
    Logins
WHERE 
    YEAR(time_stamp) = 2020
GROUP BY 1;
\`\`\`
---

### Approach 2: Using EXTRACT() to get year from the date column and FIRST_VALUE() to find the latest record 

#### Algorithm
1. Select the columns needed for the final output
2. Add condition 1 using EXTRACT() to select all records with a timestamp in the year 2020 
3. Add condition 2 using FIRST_VALUE() to get the latest record for each user from the previous step; the date column is sorted in descending order to make sure the first record is the latest record in 2020
4. Because window function returns non-aggregate results,  DISTINCT is needed for this approach to make sure users with multiple records in 2020 will return only one record

\`\`\`sql
SELECT
    DISTINCT user_id,
    FIRST_VALUE(time_stamp)OVER(PARTITION BY user_id ORDER BY time_stamp DESC) AS last_stamp
FROM
    Logins
WHERE EXTRACT(Year FROM time_stamp) = 2020;
\`\`\`

---`,
        "originalCategory": "string-date"
    },
    {
        "id": "176",
        "title": "Second Highest Salary",
        "difficulty": "medium",
        "description": "<p>Table: <code>Employee</code></p>\n\n<pre>\n+-------------+------+\n| Column Name | Type |\n+-------------+------+\n| id          | int  |\n| salary      | int  |\n+-------------+------+\nid is the primary key (column with unique values) for this table.\nEach row of this table contains information about the salary of an employee.\n</pre>\n\n<p>&nbsp;</p>\n\n<p>Write a solution to find&nbsp;the second highest <strong>distinct</strong> salary from the <code>Employee</code> table. If there is no second highest salary,&nbsp;return&nbsp;<code>null (return&nbsp;None in Pandas)</code>.</p>\n\n<p>The result format is in the following example.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> \nEmployee table:\n+----+--------+\n| id | salary |\n+----+--------+\n| 1  | 100    |\n| 2  | 200    |\n| 3  | 300    |\n+----+--------+\n<strong>Output:</strong> \n+---------------------+\n| SecondHighestSalary |\n+---------------------+\n| 200                 |\n+---------------------+\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> \nEmployee table:\n+----+--------+\n| id | salary |\n+----+--------+\n| 1  | 100    |\n+----+--------+\n<strong>Output:</strong> \n+---------------------+\n| SecondHighestSalary |\n+---------------------+\n| null                |\n+---------------------+\n</pre>\n",
        "schema": "Create table If Not Exists Employee (id int, salary int)\nTruncate table Employee\ninsert into Employee (id, salary) values ('1', '100')\ninsert into Employee (id, salary) values ('2', '200')\ninsert into Employee (id, salary) values ('3', '300')",
        "slug": "second-highest-salary",
        "originalCategory": "string-date"
    },
    {
        "id": "1440",
        "title": "Evaluate Boolean Expression",
        "difficulty": "medium",
        "description": "<p>Table: <code>Variables</code></p>\\n\\n<pre>\\n+------------+------------+\\n| name       | value      |\\n+------------+------------+\\n| varchar(3) | int        |\\n+------------+------------+\\n</pre>\\n\\n<p>Table: <code>Expressions</code></p>\\n\\n<pre>\\n+--------------+------------+---------------+\\n| left_operand | operator   | right_operand |\\n+--------------+------------+---------------+\\n| varchar(3)   | ENUM('>'   | varchar(3)    |\\n+--------------+------------+---------------+\\n</pre>\\n\\n<p>&nbsp;</p>\\n\\n<p>Write a solution to evaluate the boolean expressions in the <code>Expressions</code> table. Return the result table in <strong>any order</strong>.</p>\\n\\n<p>The result format is in the following example.</p>\\n\\n<p>&nbsp;</p>\\n<p><strong class=\\\"example\\\">Example 1:</strong></p>\\n\\n<pre>\\n<strong>Input:</strong> \\nVariables table:\\n+------+-------+\\n| name | value |\\n+------+-------+\\n| x    | 66    |\\n| y    | 77    |\\n+------+-------+\\nExpressions table:\\n+--------------+----------+---------------+\\n| left_operand | operator | right_operand |\\n+--------------+----------+---------------+\\n| x            | >        | y             |\\n| x            | <        | y             |\\n| x            | =        | y             |\\n| y            | >        | x             |\\n| y            | <        | x             |\\n| x            | =        | x             |\\n+--------------+----------+---------------+\\n<strong>Output:</strong> \\n+--------------+----------+---------------+-------+\\n| left_operand | operator | right_operand | value |\\n+--------------+----------+---------------+-------+\\n| x            | >        | y             | false |\\n| x            | <        | y             | true  |\\n| x            | =        | y             | true  |\\n| y            | >        | x             | true  |\\n+--------------+----------+---------------+-------+\\n</pre>\\n",
        "schema": "Create Table If Not Exists Variables (name varchar(3), value int)\nCreate Table If Not Exists Expressions (left_operand varchar(3), operator ENUM('>', '<', '='), right_operand varchar(3))\nTruncate table Variables\ninsert into Variables (name, value) values ('x', '66')\ninsert into Variables (name, value) values ('y', '77')\nTruncate table Expressions\ninsert into Expressions (left_operand, operator, right_operand) values ('x', '>', 'y')\ninsert into Expressions (left_operand, operator, right_operand) values ('x', '<', 'y')\ninsert into Expressions (left_operand, operator, right_operand) values ('x', '=', 'y')\ninsert into Expressions (left_operand, operator, right_operand) values ('y', '>', 'x')\ninsert into Expressions (left_operand, operator, right_operand) values ('y', '<', 'x')\ninsert into Expressions (left_operand, operator, right_operand) values ('x', '=', 'x')",
        "slug": "evaluate-boolean-expression",
        "originalCategory": "string-date"
    }
];
