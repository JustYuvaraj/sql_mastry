// LeetCode SQL Patterns - window-functions.js
export const windowfunctions = [
    {
        "id": "1693",
        "title": "Daily Leads and Partners",
        "difficulty": "easy",
        "description": "<p>Table: <code>DailySales</code></p>\n\n<pre>\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| date_id     | date    |\n| make_name   | varchar |\n| lead_id     | int     |\n| partner_id  | int     |\n+-------------+---------+\nThere is no primary key (column with unique values) for this table. It may contain duplicates.\nThis table contains the date and the name of the product sold and the IDs of the lead and partner it was sold to.\nThe name consists of only lowercase English letters.\n</pre>\n\n<p>&nbsp;</p>\n\n<p>For each <code>date_id</code> and <code>make_name</code>, find the number of <strong>distinct</strong> <code>lead_id</code>&#39;s and <strong>distinct</strong> <code>partner_id</code>&#39;s.</p>\n\n<p>Return the result table in <strong>any order</strong>.</p>\n\n<p>The result format is in the following example.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> \nDailySales table:\n+-----------+-----------+---------+------------+\n| date_id   | make_name | lead_id | partner_id |\n+-----------+-----------+---------+------------+\n| 2020-12-8 | toyota    | 0       | 1          |\n| 2020-12-8 | toyota    | 1       | 0          |\n| 2020-12-8 | toyota    | 1       | 2          |\n| 2020-12-7 | toyota    | 0       | 2          |\n| 2020-12-7 | toyota    | 0       | 1          |\n| 2020-12-8 | honda     | 1       | 2          |\n| 2020-12-8 | honda     | 2       | 1          |\n| 2020-12-7 | honda     | 0       | 1          |\n| 2020-12-7 | honda     | 1       | 2          |\n| 2020-12-7 | honda     | 2       | 1          |\n+-----------+-----------+---------+------------+\n<strong>Output:</strong> \n+-----------+-----------+--------------+-----------------+\n| date_id   | make_name | unique_leads | unique_partners |\n+-----------+-----------+--------------+-----------------+\n| 2020-12-8 | toyota    | 2            | 3               |\n| 2020-12-7 | toyota    | 1            | 2               |\n| 2020-12-8 | honda     | 2            | 2               |\n| 2020-12-7 | honda     | 3            | 2               |\n+-----------+-----------+--------------+-----------------+\n<strong>Explanation:</strong> \nFor 2020-12-8, toyota gets leads = [0, 1] and partners = [0, 1, 2] while honda gets leads = [1, 2] and partners = [1, 2].\nFor 2020-12-7, toyota gets leads = [0] and partners = [1, 2] while honda gets leads = [0, 1, 2] and partners = [1, 2].\n</pre>\n",
        "schema": "Create table If Not Exists DailySales(date_id date, make_name varchar(20), lead_id int, partner_id int)\nTruncate table DailySales\ninsert into DailySales (date_id, make_name, lead_id, partner_id) values ('2020-12-8', 'toyota', '0', '1')\ninsert into DailySales (date_id, make_name, lead_id, partner_id) values ('2020-12-8', 'toyota', '1', '0')\ninsert into DailySales (date_id, make_name, lead_id, partner_id) values ('2020-12-8', 'toyota', '1', '2')\ninsert into DailySales (date_id, make_name, lead_id, partner_id) values ('2020-12-7', 'toyota', '0', '2')\ninsert into DailySales (date_id, make_name, lead_id, partner_id) values ('2020-12-7', 'toyota', '0', '1')\ninsert into DailySales (date_id, make_name, lead_id, partner_id) values ('2020-12-8', 'honda', '1', '2')\ninsert into DailySales (date_id, make_name, lead_id, partner_id) values ('2020-12-8', 'honda', '2', '1')\ninsert into DailySales (date_id, make_name, lead_id, partner_id) values ('2020-12-7', 'honda', '0', '1')\ninsert into DailySales (date_id, make_name, lead_id, partner_id) values ('2020-12-7', 'honda', '1', '2')\ninsert into DailySales (date_id, make_name, lead_id, partner_id) values ('2020-12-7', 'honda', '2', '1')",
        "slug": "daily-leads-and-partners",
        "originalCategory": "group-by"
    },
    {
        "id": "178",
        "title": "Rank Scores",
        "difficulty": "medium",
        "description": "<p>Table: <code>Scores</code></p>\n\n<pre>\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| score       | decimal |\n+-------------+---------+\nid is the primary key (column with unique values) for this table.\nEach row of this table contains the score of a game. Score is a floating point value with two decimal places.\n</pre>\n\n<p>&nbsp;</p>\n\n<p>Write a solution to find the rank of the scores. The ranking should be calculated according to the following rules:</p>\n\n<ul>\n\t<li>The scores should be ranked from the highest to the lowest.</li>\n\t<li>If there is a tie between two scores, both should have the same ranking.</li>\n\t<li>After a tie, the next ranking number should be the next consecutive integer value. In other words, there should be no holes between ranks.</li>\n</ul>\n\n<p>Return the result table ordered by <code>score</code> in descending order.</p>\n\n<p>The result format is in the following example.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> \nScores table:\n+----+-------+\n| id | score |\n+----+-------+\n| 1  | 3.50  |\n| 2  | 3.65  |\n| 3  | 4.00  |\n| 4  | 3.85  |\n| 5  | 4.00  |\n| 6  | 3.65  |\n+----+-------+\n<strong>Output:</strong> \n+-------+------+\n| score | rank |\n+-------+------+\n| 4.00  | 1    |\n| 4.00  | 1    |\n| 3.85  | 2    |\n| 3.65  | 3    |\n| 3.65  | 3    |\n| 3.50  | 4    |\n+-------+------+\n</pre>\n",
        "schema": "Create table If Not Exists Scores (id int, score DECIMAL(3,2))\nTruncate table Scores\ninsert into Scores (id, score) values ('1', '3.5')\ninsert into Scores (id, score) values ('2', '3.65')\ninsert into Scores (id, score) values ('3', '4.0')\ninsert into Scores (id, score) values ('4', '3.85')\ninsert into Scores (id, score) values ('5', '4.0')\ninsert into Scores (id, score) values ('6', '3.65')",
        "slug": "rank-scores",
        "originalCategory": "window-functions"
    },
    {
        "id": "534",
        "title": "Game Play Analysis III",
        "difficulty": "medium",
        "description": null,
        "schema": "Create table If Not Exists Activity (player_id int, device_id int, event_date date, games_played int)\nTruncate table Activity\ninsert into Activity (player_id, device_id, event_date, games_played) values ('1', '2', '2016-03-01', '5')\ninsert into Activity (player_id, device_id, event_date, games_played) values ('1', '2', '2016-05-02', '6')\ninsert into Activity (player_id, device_id, event_date, games_played) values ('1', '3', '2017-06-25', '1')\ninsert into Activity (player_id, device_id, event_date, games_played) values ('3', '1', '2016-03-02', '0')\ninsert into Activity (player_id, device_id, event_date, games_played) values ('3', '4', '2018-07-03', '5')",
        "slug": "game-play-analysis-iii",
        "originalCategory": "window-functions"
    },
    {
        "id": "1285",
        "title": "Find the Start and End Number of Continuous Ranges",
        "difficulty": "medium",
        "description": null,
        "schema": "Create table If Not Exists Logs (log_id int)\nTruncate table Logs\ninsert into Logs (log_id) values ('1')\ninsert into Logs (log_id) values ('2')\ninsert into Logs (log_id) values ('3')\ninsert into Logs (log_id) values ('7')\ninsert into Logs (log_id) values ('8')\ninsert into Logs (log_id) values ('10')",
        "slug": "find-the-start-and-end-number-of-continuous-ranges",
        "originalCategory": "window-functions"
    },
    {
        "id": "1225",
        "title": "Report Contiguous Dates",
        "difficulty": "hard",
        "description": null,
        "schema": "Create table If Not Exists Failed (fail_date date)\nCreate table If Not Exists Succeeded (success_date date)\nTruncate table Failed\ninsert into Failed (fail_date) values ('2018-12-28')\ninsert into Failed (fail_date) values ('2018-12-29')\ninsert into Failed (fail_date) values ('2019-01-04')\ninsert into Failed (fail_date) values ('2019-01-05')\nTruncate table Succeeded\ninsert into Succeeded (success_date) values ('2018-12-30')\ninsert into Succeeded (success_date) values ('2018-12-31')\ninsert into Succeeded (success_date) values ('2019-01-01')\ninsert into Succeeded (success_date) values ('2019-01-02')\ninsert into Succeeded (success_date) values ('2019-01-03')\ninsert into Succeeded (success_date) values ('2019-01-06')",
        "slug": "report-contiguous-dates",
        "originalCategory": "window-functions"
    },
    {
        "id": "1767",
        "title": "Find the Subtasks That Did Not Execute",
        "difficulty": "hard",
        "description": null,
        "schema": "Create table If Not Exists Tasks (task_id int, subtasks_count int)\nCreate table If Not Exists Executed (task_id int, subtask_id int)\nTruncate table Tasks\ninsert into Tasks (task_id, subtasks_count) values ('1', '3')\ninsert into Tasks (task_id, subtasks_count) values ('2', '2')\ninsert into Tasks (task_id, subtasks_count) values ('3', '4')\nTruncate table Executed\ninsert into Executed (task_id, subtask_id) values ('1', '2')\ninsert into Executed (task_id, subtask_id) values ('3', '1')\ninsert into Executed (task_id, subtask_id) values ('3', '2')\ninsert into Executed (task_id, subtask_id) values ('3', '3')\ninsert into Executed (task_id, subtask_id) values ('3', '4')",
        "slug": "find-the-subtasks-that-did-not-execute",
        "originalCategory": "window-functions"
    }
];
