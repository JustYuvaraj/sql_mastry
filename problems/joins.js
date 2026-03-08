// LeetCode SQL Patterns - joins.js
export const joins = [
    {
        "id": "175",
        "title": "Combine Two Tables",
        "difficulty": "easy",
        "description": "<p>Table: <code>Person</code></p>\n\n<pre>\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| personId    | int     |\n| lastName    | varchar |\n| firstName   | varchar |\n+-------------+---------+\npersonId is the primary key (column with unique values) for this table.\nThis table contains information about the ID of some persons and their first and last names.\n</pre>\n\n<p>&nbsp;</p>\n\n<p>Table: <code>Address</code></p>\n\n<pre>\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| addressId   | int     |\n| personId    | int     |\n| city        | varchar |\n| state       | varchar |\n+-------------+---------+\naddressId is the primary key (column with unique values) for this table.\nEach row of this table contains information about the city and state of one person with ID = PersonId.\n</pre>\n\n<p>&nbsp;</p>\n\n<p>Write a solution to report the first name, last name, city, and state of each person in the <code>Person</code> table. If the address of a <code>personId</code> is not present in the <code>Address</code> table, report <code>null</code> instead.</p>\n\n<p>Return the result table in <strong>any order</strong>.</p>\n\n<p>The result format is in the following example.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> \nPerson table:\n+----------+----------+-----------+\n| personId | lastName | firstName |\n+----------+----------+-----------+\n| 1        | Wang     | Allen     |\n| 2        | Alice    | Bob       |\n+----------+----------+-----------+\nAddress table:\n+-----------+----------+---------------+------------+\n| addressId | personId | city          | state      |\n+-----------+----------+---------------+------------+\n| 1         | 2        | New York City | New York   |\n| 2         | 3        | Leetcode      | California |\n+-----------+----------+---------------+------------+\n<strong>Output:</strong> \n+-----------+----------+---------------+----------+\n| firstName | lastName | city          | state    |\n+-----------+----------+---------------+----------+\n| Allen     | Wang     | Null          | Null     |\n| Bob       | Alice    | New York City | New York |\n+-----------+----------+---------------+----------+\n<strong>Explanation:</strong> \nThere is no address in the address table for the personId = 1 so we return null in their city and state.\naddressId = 1 contains information about the address of personId = 2.\n</pre>\n",
        "schema": "Create table If Not Exists Person (personId int, firstName varchar(255), lastName varchar(255))\nCreate table If Not Exists Address (addressId int, personId int, city varchar(255), state varchar(255))\nTruncate table Person\ninsert into Person (personId, lastName, firstName) values ('1', 'Wang', 'Allen')\ninsert into Person (personId, lastName, firstName) values ('2', 'Alice', 'Bob')\nTruncate table Address\ninsert into Address (addressId, personId, city, state) values ('1', '2', 'New York City', 'New York')\ninsert into Address (addressId, personId, city, state) values ('2', '3', 'Leetcode', 'California')",
        "slug": "combine-two-tables",
        "editorial": `[TOC]

# Solution
---

## pandas

### Approach 1: Using \`merge\`

**Visualization of approach 1**

![fig](../Figures/175/175-1.png)

#### Intuition

Let's breakdown the steps given the following input DataFrames:

\`person\`:
<table>
  <tr>
    <th>personId</th>
    <th>lastName</th>
    <th>firstName</th>
  </tr>
  <tr>
    <td>1</td>
    <td>Wang</td>
    <td>Allen</td>
  </tr>
  <tr>
    <td>2</td>
    <td>Alice</td>
    <td>Bob</td>
  </tr>
</table>
<br>

\`address\`:
<table>
  <tr>
    <th>addressId</th>
    <th>personId</th>
    <th>city</th>
    <th>state</th>
  </tr>
  <tr>
    <td>1</td>
    <td>2</td>
    <td>New York City</td>
    <td>New York</td>
  </tr>
  <tr>
    <td>2</td>
    <td>3</td>
    <td>Leetcode</td>
    <td>California</td>
  </tr>
</table>
<br>

1. **Merging the DataFrames**
   
   \`\`\`python
   result = pd.merge(person, address, on='personId', how='left')
   \`\`\`
   In this step, we are merging the \`person\` and \`address\` dataframes using a left join operation with the \`pd.merge()\` function. Here:
   - \`on='personId'\` specifies that we are using the 'personId' column as the key for merging the data. This column is present in both dataframes, and it holds unique identifiers for the individuals.
   - \`how='left'\` specifies that we are performing a left join, meaning all the records from the \`person\` dataframe (the left dataframe) will be retained, and the matching records from the \`address\` dataframe (the right dataframe) will be merged where the 'personId' values match. If a 'personId' from the \`person\` dataframe does not have a matching 'personId' in the \`address\` dataframe, the 'city' and 'state' columns for that record will contain Null values (representing missing data).

<table>
  <tr>
    <th>personId</th>
    <th>lastName</th>
    <th>firstName</th>
    <th>addressId</th>
    <th>city</th>
    <th>state</th>
  </tr>
  <tr>
    <td>1</td>
    <td>Wang</td>
    <td>Allen</td>
    <td>Null</td>
    <td>Null</td>
    <td>Null</td>
  </tr>
  <tr>
    <td>2</td>
    <td>Alice</td>
    <td>Bob</td>
    <td>1.0</td>
    <td>New York City</td>
    <td>New York</td>
  </tr>
</table>
<br>

2. **Selecting Relevant Columns**

   \`\`\`python
   result = result[['firstName', 'lastName', 'city', 'state']]
   \`\`\`
   In this step, we select only the columns that we are interested in for the final output. Since the merging operation can potentially bring in other columns from the \`address\` dataframe, we are explicitly selecting only the 'firstName', 'lastName', 'city', and 'state' columns to be in our final result. This helps in maintaining a clean and focused dataset which contains only the information we are interested in.

<table>
  <tr>
    <th>firstName</th>
    <th>lastName</th>
    <th>city</th>
    <th>state</th>
  </tr>
  <tr>
    <td>Allen</td>
    <td>Wang</td>
    <td>Null</td>
    <td>Null</td>
  </tr>
  <tr>
    <td>Bob</td>
    <td>Alice</td>
    <td>New York City</td>
    <td>New York</td>
  </tr>
</table>
<br>

In summary, this script is taking two separate dataframes and merging them into a single dataframe where each row represents a person and contains their first name, last name, city, and state. This is done using the person's unique identifier to correctly match each person with their address. It's a common operation when you want to bring together information from different sources into a unified view.

#### Implementation

<iframe src="https://leetcode.com/playground/XRUKdTyk/shared" frameBorder="0" width="100%" height="174" name="XRUKdTyk"></iframe>


---

## Database

### Approach 1: Using \`outer join\`

#### Intuition

Since the *PersonId* in table **Address** is the foreign key of table **Person**, we can join these two tables to get the address information of a person.

Considering there might be no address information for every person, we should use \`outer join\` instead of the default \`inner join\`.

#### Implementation

> Note: For MySQL, an \`outer join\` is performed either using \`left join\` or \`right join\`. 


\`\`\`sql
select FirstName, LastName, City, State
from Person left join Address
on Person.PersonId = Address.PersonId
;
\`\`\`

> Note: Using the \`where\` clause to filter the records will fail if there is no address information for a person because it will not display the name information.`,
        "originalCategory": "joins"
    },
    {
        "id": "197",
        "title": "Rising Temperature",
        "difficulty": "easy",
        "description": "<p>Table: <code>Weather</code></p>\n\n<pre>\n+---------------+---------+\n| Column Name   | Type    |\n+---------------+---------+\n| id            | int     |\n| recordDate    | date    |\n| temperature   | int     |\n+---------------+---------+\nid is the column with unique values for this table.\nThere are no different rows with the same recordDate.\nThis table contains information about the temperature on a certain day.\n</pre>\n\n<p>&nbsp;</p>\n\n<p>Write a solution to find all dates&#39; <code>id</code> with higher temperatures compared to its previous dates (yesterday).</p>\n\n<p>Return the result table in <strong>any order</strong>.</p>\n\n<p>The result format is in the following example.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> \nWeather table:\n+----+------------+-------------+\n| id | recordDate | temperature |\n+----+------------+-------------+\n| 1  | 2015-01-01 | 10          |\n| 2  | 2015-01-02 | 25          |\n| 3  | 2015-01-03 | 20          |\n| 4  | 2015-01-04 | 30          |\n+----+------------+-------------+\n<strong>Output:</strong> \n+----+\n| id |\n+----+\n| 2  |\n| 4  |\n+----+\n<strong>Explanation:</strong> \nIn 2015-01-02, the temperature was higher than the previous day (10 -&gt; 25).\nIn 2015-01-04, the temperature was higher than the previous day (20 -&gt; 30).\n</pre>\n",
        "schema": "Create table If Not Exists Weather (id int, recordDate date, temperature int)\nTruncate table Weather\ninsert into Weather (id, recordDate, temperature) values ('1', '2015-01-01', '10')\ninsert into Weather (id, recordDate, temperature) values ('2', '2015-01-02', '25')\ninsert into Weather (id, recordDate, temperature) values ('3', '2015-01-03', '20')\ninsert into Weather (id, recordDate, temperature) values ('4', '2015-01-04', '30')",
        "slug": "rising-temperature",
        "editorial": `[TOC]

# Solution
---

### Overview

**Problem Statement Reference**
> Write a solution to find all dates' Id with higher temperatures compared to its previous dates (yesterday). Return the result table in any order.

Let's further elaborate on the given example to deepen our understanding of the problem at hand.

If we conduct a time series analysis of the temperature data, we would notice distinct points where there is a rise in temperature compared to the previous day. This phenomenon is precisely what we are interested in identifying.

By analyzing the given data:

<table>
  <header>
    <tr>
      <th>id</th>
      <th>recordDate</th>
      <th>temperature</th>
    </tr>
  </header>
  <tbody>
    <tr>
      <td>1</td>
      <td>2015-01-01</td>
      <td>10</td>
    </tr>
    <tr>
      <td>2</td>
      <td>2015-01-02</td>
      <td>25</td>
    </tr>
    <tr>
      <td>3</td>
      <td>2015-01-03</td>
      <td>20</td>
    </tr>
    <tr>
      <td>4</td>
      <td>2015-01-04</td>
      <td>30</td>
    </tr>
  </tbody>
</table>

We can graphically represent the temperature readings across the consecutive dates. When we plot these points on a graph, with the \`recordDate\` on the X-axis and the \`temperature\` on the Y-axis, we observe a graphical representation of the temperature variations over the specified period.

![fig](../Figures/197/197-1.png)

From this graphical analysis, we notice two instances where there is a rise in the temperature compared to the day before:

1. **January 2, 2015 (id: 2)**: On this day, the temperature is recorded to be 25, which is higher than the 10 recorded on January 1st.
   
2. **January 4, 2015 (id: 4)**: Here, the temperature escalated to 30, surpassing the temperature of 20 noted on January 3rd.

Thus, based on our criteria of identifying days with a temperature rise compared to the immediate preceding day, we should return the ids for January 2nd and January 4th, which are 2 and 4 respectively.

---

## pandas

### Approach 1: Shifted Dataframe Merge on Record Date

#### Intuition

We are creating a new DataFrame that represents the data shifted by one day and merging it with the original DataFrame based on the \`recordDate\`. This way, for each record, we will have information on both the current day and the previous day in the same row, enabling easy comparison of temperatures across consecutive days.

Let's break this down step by step:

**Step 1: Converting \`recordDate\` to Datetime Type**

\`\`\`python
# Ensure the 'recordDate' column is a datetime type
weather['recordDate'] = pd.to_datetime(weather['recordDate'])
\`\`\`

- Before working with date data, it is good practice to ensure that the date column is of the datetime data type to facilitate date-based operations correctly.
  
**Step 2: Creating a Shifted DataFrame**

\`\`\`python
# Create a copy of the weather DataFrame with a 1 day shift 
weather_shifted = weather.copy()
weather_shifted['recordDate'] = weather_shifted['recordDate'] + pd.to_timedelta(1, unit='D')
\`\`\`

- A copy of the original DataFrame is created, where the \`recordDate\` for each entry is shifted forward by one day. This allows us to later merge this DataFrame with the original one to compare the temperatures of each day with the previous day.

**Step 3: Merging the Original and Shifted DataFrames**

\`\`\`python
# Merging the DataFrames on the 'recordDate' column to find consecutive dates
merged_df = pd.merge(weather, weather_shifted, on='recordDate', suffixes=('_today', '_yesterday'))
\`\`\`

- The original and shifted DataFrames are merged based on the \`recordDate\` column, which now contains consecutive dates. This merge operation forms pairs of consecutive days so that we can directly compare the temperatures of each day with the previous day.

**Step 4: Identifying Days with Higher Temperatures than the Previous Day**

\`\`\`python
# Finding rows where the temperature is greater on the current day compared to the previous day
result = merged_df[merged_df['temperature_today'] > merged_df['temperature_yesterday']][['id_today']].rename(columns={'id_today': 'Id'})
\`\`\`

- Within the merged DataFrame, we apply a condition to retain only those rows where the temperature of the current day (\`temperature_today\`) is greater than that of the previous day (\`temperature_yesterday\`). This effectively identifies all the days where the temperature was higher than the previous day.
- We select only the ID column corresponding to the days that satisfy this condition, renaming it to \`Id\` to meet the output specification.

**Step 5: Returning the Result**

\`\`\`python
return result
\`\`\`

- The final step is to return the DataFrame containing the IDs of the days where the temperature was higher than on the previous day.


#### Implementation

<iframe src="https://leetcode.com/playground/H8hou3Zo/shared" frameBorder="0" width="100%" height="361" name="H8hou3Zo"></iframe>


### Approach 2: Shift Function with Precise Date Match

#### Intuition

In this approach, we sort the DataFrame by \`recordDate\` and then use the shift function to create new columns that hold the data for the previous day. After that, we filter the DataFrame to only include the rows where the temperature is greater than that of the previous day and the dates are precisely one day apart.

Let's break this down step by step:

**Step 1: Converting \`recordDate\` to Datetime Type**

\`\`\`python
weather['recordDate'] = pd.to_datetime(weather['recordDate'])
\`\`\`
- Before performing operations based on dates, we first ensure that the \`recordDate\` column is of datetime type. This allows us to easily perform date-specific operations later in the function.

**Step 2: Sorting the DataFrame**

\`\`\`python
weather.sort_values('recordDate', inplace=True)
\`\`\`
- We sort the data based on the \`recordDate\` to maintain a chronological order. This step is crucial because the next steps involve operations that are dependent on the order of the dates.

**Step 3: Creating Columns for Previous Day's Data**

\`\`\`python
weather['PreviousTemperature'] = weather['temperature'].shift(1)
weather['PreviousRecordDate'] = weather['recordDate'].shift(1)
\`\`\`
- We create two new columns in the \`weather\` DataFrame:
  - \`PreviousTemperature\`: This column is constructed by shifting the \`temperature\` column down by one row using \`shift(1)\`. This means that the value in each row of \`PreviousTemperature\` is the temperature value from the immediately preceding row in the DataFrame, not necessarily from the immediately preceding day in terms of time.
  - \`PreviousRecordDate\`: Similarly, this column is formed by shifting the \`recordDate\` column down by one row. Hence, each value in \`PreviousRecordDate\` corresponds to the date from the immediately preceding row, not necessarily the day immediately before the current \`recordDate\`.

By having these new columns, we align each row with the temperature and record date of its preceding row in the DataFrame, allowing for comparisons between a day's temperature and that of the previous row. It’s crucial to note that these “previous” values come from the DataFrame's order and do not always represent the chronological day before, as there might be gaps in the dates within the data.

**Step 4: Filtering for Days with Higher Temperature than the Previous Day**

\`\`\`python
result = weather[
    (weather['temperature'] > weather['PreviousTemperature']) & 
    (weather['recordDate'] == weather['PreviousRecordDate'] + pd.Timedelta(days=1))
][['id']].rename(columns={'id': 'Id'})
\`\`\`

- We are filtering the DataFrame for rows where the temperature is higher than the previous day's temperature: \`(weather['temperature'] > weather['PreviousTemperature'])\`.
- We also ensure that the record date is exactly one day more than the previous record date: \`(weather['recordDate'] == weather['PreviousRecordDate'] + pd.Timedelta(days=1))\`. This is done using \`pd.Timedelta(days=1)\` to add a day to the previous record date and checking if it equals the current record date.

**Step 5: Returning the Result**

\`\`\`python
return result
\`\`\`
- Finally, we return the filtered DataFrame which contains only the \`Id\` column that satisfies both conditions specified in step 4. This DataFrame represents all the dates where the temperature was higher than the temperature of the previous day.

#### Implementation

<iframe src="https://leetcode.com/playground/gkesEsMj/shared" frameBorder="0" width="100%" height="429" name="gkesEsMj"></iframe>


---

## Database

### Approach 1: Using \`JOIN\` and \`DATEDIFF()\` 

#### Intuition

By doing a self-join on the \`Weather\` table, we create a Cartesian product of the table with itself, creating pairs of days. We then use the \`DATEDIFF\` function to restrict these pairs to only include consecutive days. Lastly, we filter these pairs of consecutive days further to only include pairs where the temperature is higher on the second day. The resulting ids represent the days where the temperature was higher than the previous day.

Let's break this down step by step:

**Step 1: Defining the Main Query Structure**

\`\`\`sql
SELECT 
    w1.id
FROM 
    Weather w1
JOIN 
    Weather w2
\`\`\`

Here, we are setting up a query to retrieve the \`id\` from the \`Weather\` table aliased as \`w1\`. To find the records where the temperature is greater than the previous day, we are performing a self-join on the \`Weather\` table, creating a second alias \`w2\`. This allows us to compare each record in \`w1\` with each record in \`w2\`.

**Step 2: Join Condition**

\`\`\`sql
ON 
    DATEDIFF(w1.recordDate, w2.recordDate) = 1
\`\`\`

In the join condition, we are using the \`DATEDIFF\` function to find pairs of records where the \`recordDate\` differs by exactly one day. This condition ensures that we are comparing each day's temperature with the temperature of the previous day.

**Step 3: Filter Records with Higher Temperature**

\`\`\`sql
WHERE 
    w1.temperature > w2.temperature;
\`\`\`

After finding pairs of days that are consecutive, we apply a filter in the \`WHERE\` clause to only get the records where the temperature on a day (represented by a record in \`w1\`) is greater than the temperature on the previous day (represented by a record in \`w2\`). This is the main condition to fulfill the requirement of finding the ids where the temperature is higher than the previous day.


#### Implementation



\`\`\`mysql []
SELECT 
    w1.id
FROM 
    Weather w1
JOIN 
    Weather w2
ON 
    DATEDIFF(w1.recordDate, w2.recordDate) = 1
WHERE 
    w1.temperature > w2.temperature;

\`\`\`

### Approach 2: Using \`LAG()\` Function

#### Intuition

Let's break this down step by step:

**Step 1: Creating a Common Table Expression (CTE) with Lag Function**

\`\`\`sql
WITH PreviousWeatherData AS
(
    SELECT 
        id,
        recordDate,
        temperature, 
        LAG(temperature, 1) OVER (ORDER BY recordDate) AS PreviousTemperature,
        LAG(recordDate, 1) OVER (ORDER BY recordDate) AS PreviousRecordDate
    FROM 
        Weather
)
\`\`\`

In this step, we create a Common Table Expression (CTE) named \`PreviousWeatherData\` using a \`WITH\` clause. Inside this CTE, we are selecting all the rows from the "Weather" table along with two additional columns:

1. \`PreviousTemperature\`: The temperature from the previous day, which is obtained using the \`LAG()\` function with an offset of 1, ordered by \`recordDate\`.
2. \`PreviousRecordDate\`: The record date of the previous day, similarly obtained using the \`LAG()\` function with an offset of 1, ordered by \`recordDate\`.

This setup helps us associate each record with the respective details from the previous day in the same row.

**Step 2: Selecting IDs with Conditions on Temperature and Date**

\`\`\`sql
SELECT 
    id 
FROM 
    PreviousWeatherData
WHERE 
    temperature > PreviousTemperature
AND 
    recordDate = DATE_ADD(PreviousRecordDate, INTERVAL 1 DAY);
\`\`\`

In this step, we execute a query on the \`PreviousWeatherData\` CTE with two conditions in the WHERE clause to filter the required IDs:

1. \`temperature > PreviousTemperature\`: This condition filters for the days where the temperature was higher than the previous day's temperature.
2. \`recordDate = DATE_ADD(PreviousRecordDate, INTERVAL 1 DAY)\`: This condition ensures that we are comparing consecutive days. It uses the \`DATE_ADD()\` function to add an interval of 1 day to the \`PreviousRecordDate\` and checks if it equals the current \`recordDate\`.

By combining these two conditions with an \`AND\` clause, we ensure that we only select the IDs where both conditions are met, which are the days when the temperature is higher than the day before.


#### Implementation


\`\`\`mysql []
WITH PreviousWeatherData AS
(
    SELECT 
        id,
        recordDate,
        temperature, 
        LAG(temperature, 1) OVER (ORDER BY recordDate) AS PreviousTemperature,
        LAG(recordDate, 1) OVER (ORDER BY recordDate) AS PreviousRecordDate
    FROM 
        Weather
)
SELECT 
    id 
FROM 
    PreviousWeatherData
WHERE 
    temperature > PreviousTemperature
AND 
    recordDate = DATE_ADD(PreviousRecordDate, INTERVAL 1 DAY);

\`\`\`

### Approach 3: Using Subquery

#### Intuition

Let's break this down step by step:

**Step 1: Inner Subquery to Get the Previous Day’s Temperature**

\`\`\`sql
        SELECT 
            w2.temperature
        FROM 
            Weather w2
        WHERE 
            w2.recordDate = DATE_SUB(w1.recordDate, INTERVAL 1 DAY)
\`\`\`

The inner query is responsible for retrieving the temperature of the day before the date currently under consideration in the outer query. 

It utilizes the \`DATE_SUB\` function to find the date one day before the \`recordDate\` in the outer query (\`w1.recordDate\`) and then fetches the temperature recorded on that previous date from the same Weather table (alias \`w2\`).

**Step 2: Outer Query to Find Days with Higher Temperature**

\`\`\`sql
SELECT 
    w1.id
FROM 
    Weather w1
WHERE 
    w1.temperature > (
        -- ... (inner subquery)
    );
\`\`\`

The outer query iterates over each row (each day) in the Weather table (alias \`w1\`) and checks if the temperature on that day is greater than the temperature on the previous day, the latter being obtained from the inner subquery.

**Step 3: Comparing Temperatures**

\`\`\`sql
    w1.temperature > (
        -- ... (inner subquery)
    )
\`\`\`

Here, we have the crucial comparison that serves our goal. For each day in the outer query, it checks whether the temperature is greater than the temperature fetched from the inner subquery (which is the temperature of the previous day).

**Step 4: Selecting the ID**

\`\`\`sql
SELECT 
    w1.id
\`\`\`

If the condition in the \`WHERE\` clause is satisfied (today’s temperature is greater than yesterday’s), we select the ID of the current day (from the outer query’s perspective). This ID indicates a day where the temperature was higher than the temperature on the previous day.

#### Implementation



\`\`\`mysql []
SELECT 
    w1.id
FROM 
    Weather w1
WHERE 
    w1.temperature > (
        SELECT 
            w2.temperature
        FROM 
            Weather w2
        WHERE 
            w2.recordDate = DATE_SUB(w1.recordDate, INTERVAL 1 DAY)
    );

\`\`\`

### Approach 4: Using Cartesian Product and \`WHERE\` Clause

#### Intuition

Let's break this down step by step:

**Step 1: Cartesian Product**
\`\`\`sql
FROM 
    Weather w1, Weather w2
\`\`\`

In this step, we are performing a Cartesian product (or cross join) of the \`Weather\` table with itself. This means we create a new table where each row from \`w1\` (first instance of the Weather table) is paired with every row from \`w2\` (second instance of the Weather table), resulting in a table with n² rows (where n is the number of rows in the Weather table).

**Step 2: Filtering Based on Date Difference**
\`\`\`sql
WHERE 
    DATEDIFF(w2.recordDate, w1.recordDate) = 1 
\`\`\`

Next, we use the \`DATEDIFF\` function to find pairs of rows where the difference between the 'recordDate' in w2 and w1 is exactly 1 day. This effectively filters down to pairs of rows representing consecutive days.

**Step 3: Filtering Based on Temperature Difference**
\`\`\`sql
AND 
    w2.temperature > w1.temperature;
\`\`\`

In this step, we are filtering the pairs further to retain only those where the temperature on the second day (\`w2.temperature\`) is greater than the temperature on the first day (\`w1.temperature\`). This finds the days where the temperature is rising compared to the previous day.

**Step 4: Selecting the Result**
\`\`\`sql
SELECT 
    w2.id
\`\`\`

Finally, from all the pairs that satisfy the conditions set in the WHERE clause, we select the ID of the day from the w2 table (i.e., the ID of the day with the higher temperature).


#### Implementation



\`\`\`mysql []
SELECT 
    w2.id
FROM 
    Weather w1, Weather w2
WHERE 
    DATEDIFF(w2.recordDate, w1.recordDate) = 1 
AND 
    w2.temperature > w1.temperature;

\`\`\``,
        "originalCategory": "joins"
    },
    {
        "id": "577",
        "title": "Employee Bonus",
        "difficulty": "easy",
        "description": "<p>Table: <code>Employee</code></p>\n\n<pre>\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| empId       | int     |\n| name        | varchar |\n| supervisor  | int     |\n| salary      | int     |\n+-------------+---------+\nempId is the column with unique values for this table.\nEach row of this table indicates the name and the ID of an employee in addition to their salary and the id of their manager.\n</pre>\n\n<p>&nbsp;</p>\n\n<p>Table: <code>Bonus</code></p>\n\n<pre>\n+-------------+------+\n| Column Name | Type |\n+-------------+------+\n| empId       | int  |\n| bonus       | int  |\n+-------------+------+\nempId is the column of unique values for this table.\nempId is a foreign key (reference column) to empId from the Employee table.\nEach row of this table contains the id of an employee and their respective bonus.\n</pre>\n\n<p>&nbsp;</p>\n\n<p>Write a solution to report the name and bonus amount of each employee who satisfies either of the following:</p>\n\n<ul>\n\t<li>The employee has a bonus <strong>less than</strong> <code>1000</code>.</li>\n\t<li>The employee did not get any bonus.</li>\n</ul>\n\n<p>Return the result table in <strong>any order</strong>.</p>\n\n<p>The&nbsp;result format is in the following example.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> \nEmployee table:\n+-------+--------+------------+--------+\n| empId | name   | supervisor | salary |\n+-------+--------+------------+--------+\n| 3     | Brad   | null       | 4000   |\n| 1     | John   | 3          | 1000   |\n| 2     | Dan    | 3          | 2000   |\n| 4     | Thomas | 3          | 4000   |\n+-------+--------+------------+--------+\nBonus table:\n+-------+-------+\n| empId | bonus |\n+-------+-------+\n| 2     | 500   |\n| 4     | 2000  |\n+-------+-------+\n<strong>Output:</strong> \n+------+-------+\n| name | bonus |\n+------+-------+\n| Brad | null  |\n| John | null  |\n| Dan  | 500   |\n+------+-------+\n</pre>\n",
        "schema": "Create table If Not Exists Employee (empId int, name varchar(255), supervisor int, salary int)\nCreate table If Not Exists Bonus (empId int, bonus int)\nTruncate table Employee\ninsert into Employee (empId, name, supervisor, salary) values ('3', 'Brad', NULL, '4000')\ninsert into Employee (empId, name, supervisor, salary) values ('1', 'John', '3', '1000')\ninsert into Employee (empId, name, supervisor, salary) values ('2', 'Dan', '3', '2000')\ninsert into Employee (empId, name, supervisor, salary) values ('4', 'Thomas', '3', '4000')\nTruncate table Bonus\ninsert into Bonus (empId, bonus) values ('2', '500')\ninsert into Bonus (empId, bonus) values ('4', '2000')",
        "slug": "employee-bonus",
        "editorial": `[TOC]

# Solution

---




## pandas

### Approach 1: Filter and Retrieve 

##### Algorithm

1. Define the \`employee_bonus\` function that takes two DataFrames, \`employee\` and \`bonus\`, as input parameters and specifies that it returns a DataFrame.

2. Use the Pandas merge function to combine the \`employee\` and \`bonus\` DataFrames on the \`empId\` column using a left join. This combines employee data with their respective bonuses.

3. Apply a filter to the merged DataFrame to include only rows where the bonus is less than 1000 or where the bonus is missing (NaN). Use boolean indexing for filtering.

4. Choose the \`name\` and \`bonus\` columns from the filtered DataFrame to extract the relevant information.

5. Return the filtered DataFrame as the output of the function.

##### Code

\`\`\`python
import pandas as pd

def employee_bonus(employee: pd.DataFrame, bonus: pd.DataFrame) -> pd.DataFrame:
    # Merge Employee and Bonus tables using a left join
    result_df = pd.merge(employee, bonus, on='empId', how='left')

    # Filter rows where bonus is less than 1000 or missing
    result_df = result_df[(result_df['bonus'] < 1000) | result_df['bonus'].isnull()]

    # Select "name" and "bonus" columns
    result_df = result_df[['name', 'bonus']]

    return result_df



\`\`\`

<br>

## Database


### Approach 1: Using \`OUTER JOIN\` and \`WHERE\` clause


#### Algorithm

1. Initialize Query: Start an SQL query.

2. Since foreign key **Bonus.empId** refers to **Employee.empId** and some employees do not have bonus records, we can use \`OUTER JOIN\` to link these two tables as the first step.


\`\`\`sql
SELECT
    Employee.name, Bonus.bonus
FROM
    Employee
        LEFT OUTER JOIN
    Bonus ON Employee.empid = Bonus.empid
;
\`\`\`
>Note: "LEFT OUTER JOIN" could be written as "LEFT JOIN".

The output to run this code with the sample data is as below.

\`\`\`
| name   | bonus |
|--------|-------|
| Dan    | 500   |
| Thomas | 2000  |
| Brad   |       |
| John   |       |
\`\`\`
The bonus value for \`Brad\` and \`John\` is empty, which is actually \`NULL\` in the database. "Conceptually, NULL means “a missing unknown value” and it is treated somewhat differently from other values." Check the [Working with NULL Values](https://dev.mysql.com/doc/refman/5.7/en/working-with-null.html) in MySQL manual for more details. In addition, we have to use \`IS NULL\` or \`IS NOT NULL\` to compare a value with \`NULL\`.

3. At last, we can add a \`WHERE\` clause with the proper conditions to filter these records.

#### Implementation

\`\`\`mysql []
SELECT
    Employee.name, Bonus.bonus
FROM
    Employee
        LEFT JOIN
    Bonus ON Employee.empid = Bonus.empid
WHERE
    bonus < 1000 OR bonus IS NULL
;
\`\`\`


<br>`,
        "originalCategory": "joins"
    },
    {
        "id": "607",
        "title": "Sales Person",
        "difficulty": "easy",
        "description": "<p>Table: <code>SalesPerson</code></p>\n\n<pre>\n+-----------------+---------+\n| Column Name     | Type    |\n+-----------------+---------+\n| sales_id        | int     |\n| name            | varchar |\n| salary          | int     |\n| commission_rate | int     |\n| hire_date       | date    |\n+-----------------+---------+\nsales_id is the primary key (column with unique values) for this table.\nEach row of this table indicates the name and the ID of a salesperson alongside their salary, commission rate, and hire date.\n</pre>\n\n<p>&nbsp;</p>\n\n<p>Table: <code>Company</code></p>\n\n<pre>\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| com_id      | int     |\n| name        | varchar |\n| city        | varchar |\n+-------------+---------+\ncom_id is the primary key (column with unique values) for this table.\nEach row of this table indicates the name and the ID of a company and the city in which the company is located.\n</pre>\n\n<p>&nbsp;</p>\n\n<p>Table: <code>Orders</code></p>\n\n<pre>\n+-------------+------+\n| Column Name | Type |\n+-------------+------+\n| order_id    | int  |\n| order_date  | date |\n| com_id      | int  |\n| sales_id    | int  |\n| amount      | int  |\n+-------------+------+\norder_id is the primary key (column with unique values) for this table.\ncom_id is a foreign key (reference column) to com_id from the Company table.\nsales_id is a foreign key (reference column) to sales_id from the SalesPerson table.\nEach row of this table contains information about one order. This includes the ID of the company, the ID of the salesperson, the date of the order, and the amount paid.\n</pre>\n\n<p>&nbsp;</p>\n\n<p>Write a solution to find the names of all the salespersons who did not have any orders related to the company with the name <strong>&quot;RED&quot;</strong>.</p>\n\n<p>Return the result table in <strong>any order</strong>.</p>\n\n<p>The result format is in the following example.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> \nSalesPerson table:\n+----------+------+--------+-----------------+------------+\n| sales_id | name | salary | commission_rate | hire_date  |\n+----------+------+--------+-----------------+------------+\n| 1        | John | 100000 | 6               | 4/1/2006   |\n| 2        | Amy  | 12000  | 5               | 5/1/2010   |\n| 3        | Mark | 65000  | 12              | 12/25/2008 |\n| 4        | Pam  | 25000  | 25              | 1/1/2005   |\n| 5        | Alex | 5000   | 10              | 2/3/2007   |\n+----------+------+--------+-----------------+------------+\nCompany table:\n+--------+--------+----------+\n| com_id | name   | city     |\n+--------+--------+----------+\n| 1      | RED    | Boston   |\n| 2      | ORANGE | New York |\n| 3      | YELLOW | Boston   |\n| 4      | GREEN  | Austin   |\n+--------+--------+----------+\nOrders table:\n+----------+------------+--------+----------+--------+\n| order_id | order_date | com_id | sales_id | amount |\n+----------+------------+--------+----------+--------+\n| 1        | 1/1/2014   | 3      | 4        | 10000  |\n| 2        | 2/1/2014   | 4      | 5        | 5000   |\n| 3        | 3/1/2014   | 1      | 1        | 50000  |\n| 4        | 4/1/2014   | 1      | 4        | 25000  |\n+----------+------------+--------+----------+--------+\n<strong>Output:</strong> \n+------+\n| name |\n+------+\n| Amy  |\n| Mark |\n| Alex |\n+------+\n<strong>Explanation:</strong> \nAccording to orders 3 and 4 in the Orders table, it is easy to tell that only salesperson John and Pam have sales to company RED, so we report all the other names in the table salesperson.\n</pre>\n",
        "schema": "Create table If Not Exists SalesPerson (sales_id int, name varchar(255), salary int, commission_rate int, hire_date date)\nCreate table If Not Exists Company (com_id int, name varchar(255), city varchar(255))\nCreate table If Not Exists Orders (order_id int, order_date date, com_id int, sales_id int, amount int)\nTruncate table SalesPerson\ninsert into SalesPerson (sales_id, name, salary, commission_rate, hire_date) values ('1', 'John', '100000', '6', '4/1/2006')\ninsert into SalesPerson (sales_id, name, salary, commission_rate, hire_date) values ('2', 'Amy', '12000', '5', '5/1/2010')\ninsert into SalesPerson (sales_id, name, salary, commission_rate, hire_date) values ('3', 'Mark', '65000', '12', '12/25/2008')\ninsert into SalesPerson (sales_id, name, salary, commission_rate, hire_date) values ('4', 'Pam', '25000', '25', '1/1/2005')\ninsert into SalesPerson (sales_id, name, salary, commission_rate, hire_date) values ('5', 'Alex', '5000', '10', '2/3/2007')\nTruncate table Company\ninsert into Company (com_id, name, city) values ('1', 'RED', 'Boston')\ninsert into Company (com_id, name, city) values ('2', 'ORANGE', 'New York')\ninsert into Company (com_id, name, city) values ('3', 'YELLOW', 'Boston')\ninsert into Company (com_id, name, city) values ('4', 'GREEN', 'Austin')\nTruncate table Orders\ninsert into Orders (order_id, order_date, com_id, sales_id, amount) values ('1', '1/1/2014', '3', '4', '10000')\ninsert into Orders (order_id, order_date, com_id, sales_id, amount) values ('2', '2/1/2014', '4', '5', '5000')\ninsert into Orders (order_id, order_date, com_id, sales_id, amount) values ('3', '3/1/2014', '1', '1', '50000')\ninsert into Orders (order_id, order_date, com_id, sales_id, amount) values ('4', '4/1/2014', '1', '4', '25000')",
        "slug": "sales-person",
        "originalCategory": "joins"
    },
    {
        "id": "1068",
        "title": "Product Sales Analysis I",
        "difficulty": "easy",
        "description": "<p>Table: <code>Sales</code></p>\n\n<pre>\n+-------------+-------+\n| Column Name | Type  |\n+-------------+-------+\n| sale_id     | int   |\n| product_id  | int   |\n| year        | int   |\n| quantity    | int   |\n| price       | int   |\n+-------------+-------+\n(sale_id, year) is the primary key (combination of columns with unique values) of this table.\nproduct_id is a foreign key (reference column) to <code>Product</code> table.\nEach row of this table shows a sale on the product product_id in a certain year.\nNote that the price is per unit.\n</pre>\n\n<p>&nbsp;</p>\n\n<p>Table: <code>Product</code></p>\n\n<pre>\n+--------------+---------+\n| Column Name  | Type    |\n+--------------+---------+\n| product_id   | int     |\n| product_name | varchar |\n+--------------+---------+\nproduct_id is the primary key (column with unique values) of this table.\nEach row of this table indicates the product name of each product.\n</pre>\n\n<p>&nbsp;</p>\n\n<p>Write a solution to report the <code>product_name</code>, <code>year</code>, and <code>price</code> for each <code>sale_id</code> in the <code>Sales</code> table.</p>\n\n<p>Return the resulting table in <strong>any order</strong>.</p>\n\n<p>The result format is in the following example.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> \nSales table:\n+---------+------------+------+----------+-------+\n| sale_id | product_id | year | quantity | price |\n+---------+------------+------+----------+-------+ \n| 1       | 100        | 2008 | 10       | 5000  |\n| 2       | 100        | 2009 | 12       | 5000  |\n| 7       | 200        | 2011 | 15       | 9000  |\n+---------+------------+------+----------+-------+\nProduct table:\n+------------+--------------+\n| product_id | product_name |\n+------------+--------------+\n| 100        | Nokia        |\n| 200        | Apple        |\n| 300        | Samsung      |\n+------------+--------------+\n<strong>Output:</strong> \n+--------------+-------+-------+\n| product_name | year  | price |\n+--------------+-------+-------+\n| Nokia        | 2008  | 5000  |\n| Nokia        | 2009  | 5000  |\n| Apple        | 2011  | 9000  |\n+--------------+-------+-------+\n<strong>Explanation:</strong> \nFrom sale_id = 1, we can conclude that Nokia was sold for 5000 in the year 2008.\nFrom sale_id = 2, we can conclude that Nokia was sold for 5000 in the year 2009.\nFrom sale_id = 7, we can conclude that Apple was sold for 9000 in the year 2011.\n</pre>\n",
        "schema": "Create table If Not Exists Sales (sale_id int, product_id int, year int, quantity int, price int)\nCreate table If Not Exists Product (product_id int, product_name varchar(10))\nTruncate table Sales\ninsert into Sales (sale_id, product_id, year, quantity, price) values ('1', '100', '2008', '10', '5000')\ninsert into Sales (sale_id, product_id, year, quantity, price) values ('2', '100', '2009', '12', '5000')\ninsert into Sales (sale_id, product_id, year, quantity, price) values ('7', '200', '2011', '15', '9000')\nTruncate table Product\ninsert into Product (product_id, product_name) values ('100', 'Nokia')\ninsert into Product (product_id, product_name) values ('200', 'Apple')\ninsert into Product (product_id, product_name) values ('300', 'Samsung')",
        "slug": "product-sales-analysis-i",
        "editorial": `​
<!-- Don't delete this -->
[TOC]
​
# Solution
​
---
​
## pandas

### Approach: Inner Join
<!-- h4 for sections -->
#### Algorithm

<!-- Describe your approach to solving the problem. -->
The information we want to display belongs to two separate DataFrames. It's important to note that these two DataFrames are related through the \`product_id\` column. Therefore, we will merge these two DataFrames using this column. This way, we will be able to present information from both DataFrames simultaneously. The \`merge()\` method defaults to an \`INNER JOIN\`, so there is no need to provide any argument to the \`how\` parameter, as we want to retrieve only the matching records from both DataFrames.

\`\`\`python
sales_and_product = sales.merge(
    product,
    on=["product_id"]
    )
\`\`\`
Below is how the new dataframe, sales_and_product, looks like after the merge:

| sale_id | product_id | year | quantity | price | product_name |
| ------- | ---------- | ---- | -------- | ----- | ------------ |
| 1       | 100        | 2008 | 10       | 5000  | Nokia        |
| 2       | 100        | 2009 | 12       | 5000  | Nokia        |
| 7       | 200        | 2011 | 15       | 9000  | Apple        |

<br>

Since we only need to report the columns \`product_name\`, \`year\`, and \`price\`, we create another DataFrame containing only these required columns. Double brackets are used to extract a subset of data and yield a new DataFrame.

\`\`\`python
df = sales_and_product[['product_name', 'year', 'price']]
\`\`\`

<!-- h4 for sections -->
#### Implementation

<iframe src="https://leetcode.com/playground/CLZQcoGZ/shared" frameBorder="0" width="100%" height="225" name="CLZQcoGZ"></iframe>​

<br>

---
​
## Database

### Approach: Inner Join
<!-- h3 for approaches -->
<!-- h4 for sections -->
#### Algorithm
<!-- Describe your approach to solving the problem. -->
The information we want to display belongs to two separate tables. It's important to note that these two tables are related through the \`product_id\` column. Therefore, we will join these two tables using this column. This way, we will be able to present information from both tables simultaneously. We \`JOIN\` the two tables \`ON\` the \`product_id\` column and \`SELECT\` the columns needed for the final output.
​
<!-- h4 for sections -->
#### Implementation

\`\`\`sql
SELECT 
    p.product_name, s.year, s.price
FROM 
    Sales s
JOIN 
    Product p
ON
    s.product_id = p.product_id
\`\`\`
​
<!-- an empty line to separate approaches -->
<br>`,
        "originalCategory": "joins"
    },
    {
        "id": "1280",
        "title": "Students and Examinations",
        "difficulty": "easy",
        "description": "<p>Table: <code>Students</code></p>\n\n<pre>\n+---------------+---------+\n| Column Name   | Type    |\n+---------------+---------+\n| student_id    | int     |\n| student_name  | varchar |\n+---------------+---------+\nstudent_id is the primary key (column with unique values) for this table.\nEach row of this table contains the ID and the name of one student in the school.\n</pre>\n\n<p>&nbsp;</p>\n\n<p>Table: <code>Subjects</code></p>\n\n<pre>\n+--------------+---------+\n| Column Name  | Type    |\n+--------------+---------+\n| subject_name | varchar |\n+--------------+---------+\nsubject_name is the primary key (column with unique values) for this table.\nEach row of this table contains the name of one subject in the school.\n</pre>\n\n<p>&nbsp;</p>\n\n<p>Table: <code>Examinations</code></p>\n\n<pre>\n+--------------+---------+\n| Column Name  | Type    |\n+--------------+---------+\n| student_id   | int     |\n| subject_name | varchar |\n+--------------+---------+\nThere is no primary key (column with unique values) for this table. It may contain duplicates.\nEach student from the Students table takes every course from the Subjects table.\nEach row of this table indicates that a student with ID student_id attended the exam of subject_name.\n</pre>\n\n<p>&nbsp;</p>\n\n<p>Write a solution to find the number of times each student attended each exam.</p>\n\n<p>Return the result table ordered by <code>student_id</code> and <code>subject_name</code>.</p>\n\n<p>The result format is in the following example.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> \nStudents table:\n+------------+--------------+\n| student_id | student_name |\n+------------+--------------+\n| 1          | Alice        |\n| 2          | Bob          |\n| 13         | John         |\n| 6          | Alex         |\n+------------+--------------+\nSubjects table:\n+--------------+\n| subject_name |\n+--------------+\n| Math         |\n| Physics      |\n| Programming  |\n+--------------+\nExaminations table:\n+------------+--------------+\n| student_id | subject_name |\n+------------+--------------+\n| 1          | Math         |\n| 1          | Physics      |\n| 1          | Programming  |\n| 2          | Programming  |\n| 1          | Physics      |\n| 1          | Math         |\n| 13         | Math         |\n| 13         | Programming  |\n| 13         | Physics      |\n| 2          | Math         |\n| 1          | Math         |\n+------------+--------------+\n<strong>Output:</strong> \n+------------+--------------+--------------+----------------+\n| student_id | student_name | subject_name | attended_exams |\n+------------+--------------+--------------+----------------+\n| 1          | Alice        | Math         | 3              |\n| 1          | Alice        | Physics      | 2              |\n| 1          | Alice        | Programming  | 1              |\n| 2          | Bob          | Math         | 1              |\n| 2          | Bob          | Physics      | 0              |\n| 2          | Bob          | Programming  | 1              |\n| 6          | Alex         | Math         | 0              |\n| 6          | Alex         | Physics      | 0              |\n| 6          | Alex         | Programming  | 0              |\n| 13         | John         | Math         | 1              |\n| 13         | John         | Physics      | 1              |\n| 13         | John         | Programming  | 1              |\n+------------+--------------+--------------+----------------+\n<strong>Explanation:</strong> \nThe result table should contain all students and all subjects.\nAlice attended the Math exam 3 times, the Physics exam 2 times, and the Programming exam 1 time.\nBob attended the Math exam 1 time, the Programming exam 1 time, and did not attend the Physics exam.\nAlex did not attend any exams.\nJohn attended the Math exam 1 time, the Physics exam 1 time, and the Programming exam 1 time.\n</pre>\n",
        "schema": "Create table If Not Exists Students (student_id int, student_name varchar(20))\nCreate table If Not Exists Subjects (subject_name varchar(20))\nCreate table If Not Exists Examinations (student_id int, subject_name varchar(20))\nTruncate table Students\ninsert into Students (student_id, student_name) values ('1', 'Alice')\ninsert into Students (student_id, student_name) values ('2', 'Bob')\ninsert into Students (student_id, student_name) values ('13', 'John')\ninsert into Students (student_id, student_name) values ('6', 'Alex')\nTruncate table Subjects\ninsert into Subjects (subject_name) values ('Math')\ninsert into Subjects (subject_name) values ('Physics')\ninsert into Subjects (subject_name) values ('Programming')\nTruncate table Examinations\ninsert into Examinations (student_id, subject_name) values ('1', 'Math')\ninsert into Examinations (student_id, subject_name) values ('1', 'Physics')\ninsert into Examinations (student_id, subject_name) values ('1', 'Programming')\ninsert into Examinations (student_id, subject_name) values ('2', 'Programming')\ninsert into Examinations (student_id, subject_name) values ('1', 'Physics')\ninsert into Examinations (student_id, subject_name) values ('1', 'Math')\ninsert into Examinations (student_id, subject_name) values ('13', 'Math')\ninsert into Examinations (student_id, subject_name) values ('13', 'Programming')\ninsert into Examinations (student_id, subject_name) values ('13', 'Physics')\ninsert into Examinations (student_id, subject_name) values ('2', 'Math')\ninsert into Examinations (student_id, subject_name) values ('1', 'Math')",
        "slug": "students-and-examinations",
        "originalCategory": "joins"
    },
    {
        "id": "1378",
        "title": "Replace Employee ID With The Unique Identifier",
        "difficulty": "easy",
        "description": "<p>Table: <code>Employees</code></p>\n\n<pre>\n+---------------+---------+\n| Column Name   | Type    |\n+---------------+---------+\n| id            | int     |\n| name          | varchar |\n+---------------+---------+\nid is the primary key (column with unique values) for this table.\nEach row of this table contains the id and the name of an employee in a company.\n</pre>\n\n<p>&nbsp;</p>\n\n<p>Table: <code>EmployeeUNI</code></p>\n\n<pre>\n+---------------+---------+\n| Column Name   | Type    |\n+---------------+---------+\n| id            | int     |\n| unique_id     | int     |\n+---------------+---------+\n(id, unique_id) is the primary key (combination of columns with unique values) for this table.\nEach row of this table contains the id and the corresponding unique id of an employee in the company.\n</pre>\n\n<p>&nbsp;</p>\n\n<p>Write a solution to show the <strong>unique ID </strong>of each user, If a user does not have a unique ID replace just show <code>null</code>.</p>\n\n<p>Return the result table in <strong>any</strong> order.</p>\n\n<p>The result format is in the following example.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> \nEmployees table:\n+----+----------+\n| id | name     |\n+----+----------+\n| 1  | Alice    |\n| 7  | Bob      |\n| 11 | Meir     |\n| 90 | Winston  |\n| 3  | Jonathan |\n+----+----------+\nEmployeeUNI table:\n+----+-----------+\n| id | unique_id |\n+----+-----------+\n| 3  | 1         |\n| 11 | 2         |\n| 90 | 3         |\n+----+-----------+\n<strong>Output:</strong> \n+-----------+----------+\n| unique_id | name     |\n+-----------+----------+\n| null      | Alice    |\n| null      | Bob      |\n| 2         | Meir     |\n| 3         | Winston  |\n| 1         | Jonathan |\n+-----------+----------+\n<strong>Explanation:</strong> \nAlice and Bob do not have a unique ID, We will show null instead.\nThe unique ID of Meir is 2.\nThe unique ID of Winston is 3.\nThe unique ID of Jonathan is 1.\n</pre>\n",
        "schema": "Create table If Not Exists Employees (id int, name varchar(20))\nCreate table If Not Exists EmployeeUNI (id int, unique_id int)\nTruncate table Employees\ninsert into Employees (id, name) values ('1', 'Alice')\ninsert into Employees (id, name) values ('7', 'Bob')\ninsert into Employees (id, name) values ('11', 'Meir')\ninsert into Employees (id, name) values ('90', 'Winston')\ninsert into Employees (id, name) values ('3', 'Jonathan')\nTruncate table EmployeeUNI\ninsert into EmployeeUNI (id, unique_id) values ('3', '1')\ninsert into EmployeeUNI (id, unique_id) values ('11', '2')\ninsert into EmployeeUNI (id, unique_id) values ('90', '3')",
        "slug": "replace-employee-id-with-the-unique-identifier",
        "originalCategory": "joins"
    },
    {
        "id": "1571",
        "title": "Warehouse Manager",
        "difficulty": "easy",
        "description": "<p>Table: <code>Warehouse</code></p>\\n\\n<pre>\\n+-------------+------------+------------+\\n| name        | product_id | units      |\\n+-------------+------------+------------+\\n| varchar(50) | int        | int        |\\n+-------------+------------+------------+\\n</pre>\\n\\n<p>Table: <code>Products</code></p>\\n\\n<pre>\\n+------------+--------------+------------+------------+------------+\\n| product_id | product_name | Width      | Length     | Height     |\\n+------------+--------------+------------+------------+------------+\\n| int        | varchar(50)  | int        | int        | int        |\\n+------------+--------------+------------+------------+------------+\\n</pre>\\n\\n<p>&nbsp;</p>\\n\\n<p>Write a solution to report the number of cubic feet of <strong>volume</strong> the inventory occupies in each warehouse. The volume of a product is <code>Width * Length * Height</code>. Return the result table in <strong>any order</strong>.</p>\\n\\n<p>The result format is in the following example.</p>\\n\\n<p>&nbsp;</p>\\n<p><strong class=\\\"example\\\">Example 1:</strong></p>\\n\\n<pre>\\n<strong>Input:</strong> \\nWarehouse table:\\n+----------+------------+-------+\\n| name     | product_id | units |\\n+----------+------------+-------+\\n| LCHouse1 | 1          | 1     |\\n| LCHouse1 | 2          | 10    |\\n| LCHouse1 | 3          | 5     |\\n| LCHouse2 | 1          | 2     |\\n| LCHouse2 | 2          | 2     |\\n| LCHouse3 | 4          | 1     |\\n+----------+------------+-------+\\nProducts table:\\n+------------+--------------+-------+--------+--------+\\n| product_id | product_name | Width | Length | Height |\\n+------------+--------------+-------+--------+--------+\\n| 1          | LC-TV        | 5     | 50     | 40     |\\n| 2          | LC-KeyChain  | 5     | 5      | 5      |\\n| 3          | LC-Phone     | 2     | 10     | 10     |\\n| 4          | LC-T-Shirt   | 4     | 10     | 20     |\\n+------------+--------------+-------+--------+--------+\\n<strong>Output:</strong> \\n+----------+--------+\\n| name     | volume |\\n+----------+--------+\\n| LCHouse1 | 12250  |\\n| LCHouse2 | 20250  |\\n| LCHouse3 | 800    |\\n+----------+--------+\\n</pre>\\n",
        "schema": "Create table If Not Exists Warehouse (name varchar(50), product_id int, units int)\n\nCreate table If Not Exists Products (product_id int, product_name varchar(50), Width int,Length int,Height int)\nTruncate table Warehouse\ninsert into Warehouse (name, product_id, units) values ('LCHouse1', '1', '1')\ninsert into Warehouse (name, product_id, units) values ('LCHouse1', '2', '10')\ninsert into Warehouse (name, product_id, units) values ('LCHouse1', '3', '5')\ninsert into Warehouse (name, product_id, units) values ('LCHouse2', '1', '2')\ninsert into Warehouse (name, product_id, units) values ('LCHouse2', '2', '2')\ninsert into Warehouse (name, product_id, units) values ('LCHouse3', '4', '1')\nTruncate table Products\ninsert into Products (product_id, product_name, Width, Length, Height) values ('1', 'LC-TV', '5', '50', '40')\ninsert into Products (product_id, product_name, Width, Length, Height) values ('2', 'LC-KeyChain', '5', '5', '5')\ninsert into Products (product_id, product_name, Width, Length, Height) values ('3', 'LC-Phone', '2', '10', '10')\ninsert into Products (product_id, product_name, Width, Length, Height) values ('4', 'LC-T-Shirt', '4', '10', '20')",
        "slug": "warehouse-manager",
        "originalCategory": "joins"
    },
    {
        "id": "1581",
        "title": "Customer Who Visited but Did Not Make Any Transactions",
        "difficulty": "easy",
        "description": "<p>Table: <code>Visits</code></p>\n\n<pre>\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| visit_id    | int     |\n| customer_id | int     |\n+-------------+---------+\nvisit_id is the column with unique values for this table.\nThis table contains information about the customers who visited the mall.\n</pre>\n\n<p>&nbsp;</p>\n\n<p>Table: <code>Transactions</code></p>\n\n<pre>\n+----------------+---------+\n| Column Name    | Type    |\n+----------------+---------+\n| transaction_id | int     |\n| visit_id       | int     |\n| amount         | int     |\n+----------------+---------+\ntransaction_id is column with unique values for this table.\nThis table contains information about the transactions made during the visit_id.\n</pre>\n\n<p>&nbsp;</p>\n\n<p>Write a&nbsp;solution to find the IDs of the users who visited without making any transactions and the number of times they made these types of visits.</p>\n\n<p>Return the result table sorted in <strong>any order</strong>.</p>\n\n<p>The&nbsp;result format is in the following example.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> \nVisits\n+----------+-------------+\n| visit_id | customer_id |\n+----------+-------------+\n| 1        | 23          |\n| 2        | 9           |\n| 4        | 30          |\n| 5        | 54          |\n| 6        | 96          |\n| 7        | 54          |\n| 8        | 54          |\n+----------+-------------+\nTransactions\n+----------------+----------+--------+\n| transaction_id | visit_id | amount |\n+----------------+----------+--------+\n| 2              | 5        | 310    |\n| 3              | 5        | 300    |\n| 9              | 5        | 200    |\n| 12             | 1        | 910    |\n| 13             | 2        | 970    |\n+----------------+----------+--------+\n<strong>Output:</strong> \n+-------------+----------------+\n| customer_id | count_no_trans |\n+-------------+----------------+\n| 54          | 2              |\n| 30          | 1              |\n| 96          | 1              |\n+-------------+----------------+\n<strong>Explanation:</strong> \nCustomer with id = 23 visited the mall once and made one transaction during the visit with id = 12.\nCustomer with id = 9 visited the mall once and made one transaction during the visit with id = 13.\nCustomer with id = 30 visited the mall once and did not make any transactions.\nCustomer with id = 54 visited the mall three times. During 2 visits they did not make any transactions, and during one visit they made 3 transactions.\nCustomer with id = 96 visited the mall once and did not make any transactions.\nAs we can see, users with IDs 30 and 96 visited the mall one time without making any transactions. Also, user 54 visited the mall twice and did not make any transactions.\n</pre>\n",
        "schema": "Create table If Not Exists Visits(visit_id int, customer_id int)\nCreate table If Not Exists Transactions(transaction_id int, visit_id int, amount int)\nTruncate table Visits\ninsert into Visits (visit_id, customer_id) values ('1', '23')\ninsert into Visits (visit_id, customer_id) values ('2', '9')\ninsert into Visits (visit_id, customer_id) values ('4', '30')\ninsert into Visits (visit_id, customer_id) values ('5', '54')\ninsert into Visits (visit_id, customer_id) values ('6', '96')\ninsert into Visits (visit_id, customer_id) values ('7', '54')\ninsert into Visits (visit_id, customer_id) values ('8', '54')\nTruncate table Transactions\ninsert into Transactions (transaction_id, visit_id, amount) values ('2', '5', '310')\ninsert into Transactions (transaction_id, visit_id, amount) values ('3', '5', '300')\ninsert into Transactions (transaction_id, visit_id, amount) values ('9', '5', '200')\ninsert into Transactions (transaction_id, visit_id, amount) values ('12', '1', '910')\ninsert into Transactions (transaction_id, visit_id, amount) values ('13', '2', '970')",
        "slug": "customer-who-visited-but-did-not-make-any-transactions",
        "editorial": `[TOC]

# Solution

---
## pandas

To identify customers who visited but did not make any transactions, we need to remove the records of customers who made transactions from the list of all customers who visited. By doing so, we convert this problem to a typical "NOT IN" problem. There are two main ways to solve "NOT IN" problems: 1) using the function similar to \`NOT IN/EXISTS\` directly or 2)\`LEFT OUTER JOIN/merge\` where the right table is set as \`NULL\`. We will introduce both methods in pandas and Mysql. 

### Approach 1: Removing Records Using \`~\` and \`isin()\` 

#### Algorithm

<!-- Describe your approach to solving the problem. -->
For this approach, we leverage the functions \`~\` and \`isin()\` to exclude unwanted records from the list. Since we want to remove the customers who made transactions from all customers who visited, we first identify those customers from the DataFrame \`visits\` to see who are also in the DataFrame \`transactions\` using \`isin()\`. We then remove these visits from all visits using \`~\`. 

\`\`\`python
visits_no_trans = visits[~visits.visit_id.isin(transactions.visit_id)]
\`\`\`

This step creates a new DataFrame that contains the visits that the customers made no transactions.  

| visit_id | customer_id |
| -------- | ----------- |
| 4        | 30          |
| 6        | 96          |
| 7        | 54          |
| 8        | 54          |

The next step is to count how many of these types of visits were made by each customer. To do this, we have the results grouped by the \`customer_id\` and \`count\` the \`visit_id\`. To get the final output, we also need to rename the column that stores the calculated result. 

\`\`\`python
df = visits_no_trans.groupby('customer_id', as_index=False)['visit_id'].count()

return df.rename(columns={'visit_id': 'count_no_trans'})
\`\`\`

<!-- h4 for sections -->
#### Implementation
​<iframe src="https://leetcode.com/playground/TT4k7pM2/shared" frameBorder="0" width="100%" height="208" name="TT4k7pM2"></iframe>
<!-- an empty line to separate approaches -->

### Approach 2: Removing Records Using \`left merge\` and \`isna()\`

#### Algorithm

For this approach, we leverage the \`left merge\` and \`isna()\` to achieve the same goal: removing the visits with transactions from all visits. To do this, we first \`left merge\` the DataFrame \`visits\` that contain all \`visit_id\`s to the DataFrame \`transactions\` that contain only the \`visit_id\`s that have transactions. We want to make sure the records that need to be removed are placed in the right DataFrame. 

\`\`\`python
visits_no_trans = visits.merge(transactions, on='visit_id', how='left')
\`\`\`

We now have a DataFrame with all \`visit_id\`s and their corresponding transactions. The visits that have no transactions associated return \`null\` values for the column \`transaction_id\`. 

| visit_id | customer_id | transaction_id | amount |
| -------- | ----------- | -------------- | ------ |
| 1        | 23          | 12             | 910    |
| 2        | 9           | 13             | 970    |
| 4        | 30          | null           | null   |
| 5        | 54          | 2              | 310    |
| 5        | 54          | 3              | 300    |
| 5        | 54          | 9              | 200    |
| 6        | 96          | null           | null   |
| 7        | 54          | null           | null   |
| 8        | 54          | null           | null   |

Now we only need to remove those visits that have \`null\` transactions. We can use the function \`isna()\` to achieve this. 

\`\`\`python
visits_no_trans = visits_no_trans[visits_no_trans.transaction_id.isna()]
\`\`\`

The DataFrame \`visits_no_trans\` now retains only the visits that have no transactions. 

| visit_id | customer_id | transaction_id | amount |
| -------- | ----------- | -------------- | ------ |
| 4        | 30          | null           | null   |
| 6        | 96          | null           | null   |
| 7        | 54          | null           | null   |
| 8        | 54          | null           | null   |

Next, we want to count how many of these types of visits were made by each customer. To do this, we have the results grouped by the \`customer_id\` and \`count\` the \`visit_id\`. To get the final output, we also need to rename the column that stores the calculated result.

\`\`\`python
df = visits_no_trans.groupby('customer_id', as_index=False)['visit_id'].count()

return df.rename(columns={'visit_id': 'count_no_trans'})
\`\`\`

<!-- h4 for sections -->
#### Implementation
​<iframe src="https://leetcode.com/playground/JkfyEoKr/shared" frameBorder="0" width="100%" height="242" name="JkfyEoKr"></iframe>
<!-- an empty line to separate approaches -->
----
​
## Database
<!-- h3 for approaches -->
### Approach 1: Removing Records Using \`NOT IN/EXISTS\`
<!-- h4 for sections -->
#### Algorithm
<!-- Describe your approach to solving the problem. -->
For this approach, we remove the visits that have transactions directly using \`NOT IN\`. Let's start by identifying these visits. For this problem, they are all the \`visit_id\` from the table \`Transactions\`. 

\`\`\`sql
SELECT visit_id FROM Transactions
\`\`\`

Next, in the main query, we can \`COUNT\` the \`visit_id\` at the \`customer_id\` level from table \`Visits\` excluding the visits we identified in the subquery. The aggregate value is grouped at the \`customer_id\` level as we are looking for the total result for each customer. This column is also renamed as requested by the final output.

<!-- h4 for sections -->
#### Implementation

\`\`\`mysql []
SELECT 
  customer_id, 
  COUNT(visit_id) AS count_no_trans 
FROM 
  Visits 
WHERE 
  visit_id NOT IN (
    SELECT 
      visit_id 
    FROM 
      Transactions
  ) 
GROUP BY 
  customer_id
\`\`\`
<!-- an empty line to separate approaches -->

### Approach 2: Removing Records Using \`LEFT JOIN\` and \`IS NULL\`
<!-- h4 for sections -->
#### Algorithm
<!-- Describe your approach to solving the problem. -->
For this approach, we want to exclude visits that involved transactions from the complete set of visits by using \`LEFT JOIN\`. To do this, we have all visits as the left table (table \`Visits\`) to join the visits from table \`Transactions\` on the shared column \`visit_id\`. To remove the records from the right table, we set its key as \`NULL\`, so the remains in the \`Visits\` table are the records of visits where no transactions occurred.

To get the final output, we want to \`COUNT\` the number of such visits associated with each \`customer_id\`, and have the aggregated value grouped at the \`customer_id\` level. Lastly, we update the column as requested in the original problem statement. 

<!-- h4 for sections -->
#### Implementation

\`\`\`mysql []
SELECT 
  customer_id, 
  COUNT(*) AS count_no_trans 
FROM 
  Visits AS v 
  LEFT JOIN Transactions AS t ON v.visit_id = t.visit_id 
WHERE 
  t.visit_id IS NULL 
GROUP BY 
  customer_id
\`\`\`
----`,
        "originalCategory": "joins"
    },
    {
        "id": "1661",
        "title": "Average Time of Process per Machine",
        "difficulty": "easy",
        "description": "<p>Table: <code>Activity</code></p>\n\n<pre>\n+----------------+---------+\n| Column Name    | Type    |\n+----------------+---------+\n| machine_id     | int     |\n| process_id     | int     |\n| activity_type  | enum    |\n| timestamp      | float   |\n+----------------+---------+\nThe table shows the user activities for a factory website.\n(machine_id, process_id, activity_type) is the primary key (combination of columns with unique values) of this table.\nmachine_id is the ID of a machine.\nprocess_id is the ID of a process running on the machine with ID machine_id.\nactivity_type is an ENUM (category) of type (&#39;start&#39;, &#39;end&#39;).\ntimestamp is a float representing the current time in seconds.\n&#39;start&#39; means the machine starts the process at the given timestamp and &#39;end&#39; means the machine ends the process at the given timestamp.\nThe &#39;start&#39; timestamp will always be before the &#39;end&#39; timestamp for every (machine_id, process_id) pair.\nIt is guaranteed that each (machine_id, process_id) pair has a &#39;start&#39; and &#39;end&#39; timestamp.\n</pre>\n\n<p>&nbsp;</p>\n\n<p>There is a factory website that has several machines each running the <strong>same number of processes</strong>. Write a solution&nbsp;to find the <strong>average time</strong> each machine takes to complete a process.</p>\n\n<p>The time to complete a process is the <code>&#39;end&#39; timestamp</code> minus the <code>&#39;start&#39; timestamp</code>. The average time is calculated by the total time to complete every process on the machine divided by the number of processes that were run.</p>\n\n<p>The resulting table should have the <code>machine_id</code> along with the <strong>average time</strong> as <code>processing_time</code>, which should be <strong>rounded to 3 decimal places</strong>.</p>\n\n<p>Return the result table in <strong>any order</strong>.</p>\n\n<p>The result format is in the following example.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> \nActivity table:\n+------------+------------+---------------+-----------+\n| machine_id | process_id | activity_type | timestamp |\n+------------+------------+---------------+-----------+\n| 0          | 0          | start         | 0.712     |\n| 0          | 0          | end           | 1.520     |\n| 0          | 1          | start         | 3.140     |\n| 0          | 1          | end           | 4.120     |\n| 1          | 0          | start         | 0.550     |\n| 1          | 0          | end           | 1.550     |\n| 1          | 1          | start         | 0.430     |\n| 1          | 1          | end           | 1.420     |\n| 2          | 0          | start         | 4.100     |\n| 2          | 0          | end           | 4.512     |\n| 2          | 1          | start         | 2.500     |\n| 2          | 1          | end           | 5.000     |\n+------------+------------+---------------+-----------+\n<strong>Output:</strong> \n+------------+-----------------+\n| machine_id | processing_time |\n+------------+-----------------+\n| 0          | 0.894           |\n| 1          | 0.995           |\n| 2          | 1.456           |\n+------------+-----------------+\n<strong>Explanation:</strong> \nThere are 3 machines running 2 processes each.\nMachine 0&#39;s average time is ((1.520 - 0.712) + (4.120 - 3.140)) / 2 = 0.894\nMachine 1&#39;s average time is ((1.550 - 0.550) + (1.420 - 0.430)) / 2 = 0.995\nMachine 2&#39;s average time is ((4.512 - 4.100) + (5.000 - 2.500)) / 2 = 1.456\n</pre>\n",
        "schema": "Create table If Not Exists Activity (machine_id int, process_id int, activity_type ENUM('start', 'end'), timestamp float)\nTruncate table Activity\ninsert into Activity (machine_id, process_id, activity_type, timestamp) values ('0', '0', 'start', '0.712')\ninsert into Activity (machine_id, process_id, activity_type, timestamp) values ('0', '0', 'end', '1.52')\ninsert into Activity (machine_id, process_id, activity_type, timestamp) values ('0', '1', 'start', '3.14')\ninsert into Activity (machine_id, process_id, activity_type, timestamp) values ('0', '1', 'end', '4.12')\ninsert into Activity (machine_id, process_id, activity_type, timestamp) values ('1', '0', 'start', '0.55')\ninsert into Activity (machine_id, process_id, activity_type, timestamp) values ('1', '0', 'end', '1.55')\ninsert into Activity (machine_id, process_id, activity_type, timestamp) values ('1', '1', 'start', '0.43')\ninsert into Activity (machine_id, process_id, activity_type, timestamp) values ('1', '1', 'end', '1.42')\ninsert into Activity (machine_id, process_id, activity_type, timestamp) values ('2', '0', 'start', '4.1')\ninsert into Activity (machine_id, process_id, activity_type, timestamp) values ('2', '0', 'end', '4.512')\ninsert into Activity (machine_id, process_id, activity_type, timestamp) values ('2', '1', 'start', '2.5')\ninsert into Activity (machine_id, process_id, activity_type, timestamp) values ('2', '1', 'end', '5')",
        "slug": "average-time-of-process-per-machine",
        "editorial": `​
[TOC]
​
# Solution
​
---

​

## pandas
We provide two different ways to perform calculations on two sets of data in the same column. One way is to use custom changes to distinguish between the two sets of data. The other way is to split the column into two different columns based on filters. Then we can calculate the aggregate total based on those isolated sets.


### Approach 1: Update Values with lambda and then Calculate

#### Algorithm

<!-- Describe your approach to solving the problem. -->
To calculate the time to complete a process, we need to know the difference between the 'start' \`timestamp\` and the 'end' \`timestamp\` for each machine and process. If we set all the 'start' \`timestamp\` to its negative value, we can get the time difference by using \`SUM()\`, since \`(-start) + end\` is equal to \`end - start\`, which is the time difference. 

We use [\`apply()\`](https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.apply.html) and \`lambda\` to transform the \`timestamp\` for all rows that have an \`activity_type\` equals to 'start'. To convert the \`timestamp\` to negative, we have the \`timestamp\` multiplied by -1. We pass the parameter 'axis=1' so the calculation will be applied across rows.  

\`\`\`python
activity['timestamp'] = activity.apply(lambda x: x.timestamp * -1 if x.activity_type == 'start' else x.timestamp, axis=1)
\`\`\`

Now we have an updated DataFrame with all start \`timestamp\`  set to negative. 

| machine_id | process_id | activity_type | timestamp |
| ---------- | ---------- | ------------- | --------- |
| 0          | 0          | start         | -0.712    |
| 0          | 0          | end           | 1.52      |
| 0          | 1          | start         | -3.14     |
| 0          | 1          | end           | 4.12      |


With this updated DataFrame, we can now calculate the time to complete a process for each machine and process by adding the start \`timestamp\` and the end \`timestamp\`: 

\`\`\`python
sum_machine_process = activity.groupby(['machine_id', 'process_id'], as_index=False)['timestamp'].sum()
\`\`\`

| machine_id | process_id | timestamp |
| ---------- | ---------- | --------- |
| 0          | 0          | 0.808     |
| 0          | 1          | 0.98      |
| 1          | 0          | 1         |
| 1          | 1          | 0.99      |
| 2          | 0          | 0.412     |
| 2          | 1          | 2.5       |

Since we want the average processing time by each machine, that has more than one process, we then calculate the aggregate average for each machine with the same method: 

\`\`\`python
mean_machine = sum_machine_process.groupby(['machine_id'], as_index=False)['timestamp'].mean()
\`\`\`

Lastly, we want to round this final calculation to 3 decimal places and rename the column name as requested. We can add the functions \`round\` and \`rename\` directly to the code from the previous step: 

\`\`\`python
mean_machine = sum_machine_process.groupby(['machine_id'], as_index=False)['timestamp'].mean().round(3).rename(columns = {'timestamp': 'processing_time'})
\`\`\`


#### Final Code

<iframe src="https://leetcode.com/playground/XXLPgdSL/shared" frameBorder="0" width="100%" height="242" name="XXLPgdSL"></iframe>

---


### Approach 2: Split One Column Into Two and then Calculate 


#### Algorithm


In this approach, we split the original column into two separate ones and then calculate the aggregate values using these two columns. 

For this problem, we create two separate \`timestamp\` columns by splitting the original DataFrame by the values in the column \`activity_type\`: 

\`\`\`python
#this DataFrame contains all the records with the start timestamp
start_df = activity[activity['activity_type'] == 'start']
#this DataFrame contains all the records with end timestamp
end_df = activity[activity['activity_type'] == 'end']
\`\`\`

We then merge the two newly created DataFrames on the two shared columns \`machine_id\` and \`process_id\` for the later calculation. 

\`\`\`python
merge_df = end_df.merge(start_df, on = ['machine_id', 'process_id'])
\`\`\`

Now we have a DataFrame that contains the start \`timestamp\` and end \`timestamp\` for each machine and process in two different columns. Notice we have the \`end_df\` join the \`start_df\`, so the \`activity_type_x\` and \`timestamp_x\` are the values from \`end_df\`. 

| machine_id | process_id | activity_type_x | timestamp_x | activity_type_y | timestamp_y |
| ---------- | ---------- | --------------- | ----------- | --------------- | ----------- |
| 0          | 0          | end             | 1.52        | start           | 0.712       |
| 0          | 1          | end             | 4.12        | start           | 3.14        |
| 1          | 0          | end             | 1.55        | start           | 0.55        |
​

Now we can calculate the time to complete a process. We use the function [\`assign()\`](https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.assign.html) to minus start \`timestamp\` (\`timestamp_y\`) from the end \`timestamp\` (\`timestamp_x\`) and store the calculated value in a new column \`processing_time\`. 

\`\`\`python
df = merge_df.assign(processing_time = merge_df['timestamp_x'] - merge_df['timestamp_y'])
\`\`\`
Below is the output. A new column, \`processing_time\` has been added to the original DataFrame (\`merge_df\`). 

| machine_id | process_id | activity_type_x | timestamp_x | activity_type_y | timestamp_y | processing_time |
| ---------- | ---------- | --------------- | ----------- | --------------- | ----------- | --------------- |
| 0          | 0          | end             | 1.52        | start           | 0.712       | 0.808           |
| 0          | 1          | end             | 4.12        | start           | 3.14        | 0.98            |
| 1          | 0          | end             | 1.55        | start           | 0.55        | 1               |
| 1          | 1          | end             | 1.42        | start           | 0.43        | 0.99            |
| 2          | 0          | end             | 4.512       | start           | 4.1         | 0.412           |
| 2          | 1          | end             | 5           | start           | 2.5         | 2.5             |

With the newly created \`processing_time\`, we can calculate the average processing time for each \`machine_id\` using \`groupby()\`. The calculation can be added to the previous step:

\`\`\`python
 df = merge_df.assign(processing_time = merge_df['timestamp_x'] - merge_df['timestamp_y']).groupby(['machine_id'])['processing_time'].mean()
\`\`\`

Last but not least, we want to make sure the calculated value is rounded to 3 decimal places by using \`round()\`. Again, we can add this function to the previous step: 

\`\`\`python
df = merge_df.assign(processing_time = merge_df['timestamp_x'] - merge_df['timestamp_y']).groupby(['machine_id'], as_index=False)['processing_time'].mean().round(3)
\`\`\`


#### Implementation

<iframe src="https://leetcode.com/playground/XRjxQZ9c/shared" frameBorder="0" width="100%" height="276" name="XRjxQZ9c"></iframe>

---


## Database


### Approach 1: Transform Values with CASE WHEN and then Calculate


#### Algorithm


To calculate the time to complete a process, we need to know the difference between the 'start' \`timestamp\` and the 'end' \`timestamp\` for each machine and process. If we set all the 'start' \`timestamp\` to its negative value, we can get the time difference by using \`SUM()\`, since \`(-start) + end\` is equal to \`end - start\`, which is the time difference. 

To do this, we use \`CASE WHEN\` to multiply all the start \`timestamp\` by -1, so the aggregated total of \`timestamp\` becomes the time to complete a process for each machine. 

\`\`\`sql
SUM(CASE WHEN activity_type = 'start' THEN timestamp*-1 ELSE timestamp END)
\`\`\`

Since we need the average by each \`machine_id\` and there might be multiple processes for each machine, we manually calculate the average by having the processing time divided by the number of processes. Luckily, for this question, all machines have the same number of processes.

\`\`\`sql
SUM(CASE WHEN activity_type='start' THEN timestamp*-1 ELSE timestamp END)*1.0/(SELECT COUNT(DISTINCT process_id))
\`\`\`

Lastly, we round the \`processing_time\` to 3 decimal places by using the function \`ROUND()\` and rename the column name. 

\`\`\`sql
ROUND(SUM(CASE WHEN activity_type='start' THEN timestamp*-1 ELSE timestamp END)*1.0/(SELECT COUNT(DISTINCT process_id)),3) AS processing_time
\`\`\`


#### Implementation

\`\`\`sql
SELECT 
    machine_id,
    ROUND(SUM(CASE WHEN activity_type='start' THEN timestamp*-1 ELSE timestamp END)*1.0
    / (SELECT COUNT(DISTINCT process_id)),3) AS processing_time
FROM 
    Activity
GROUP BY machine_id
\`\`\`
​

### Approach 2: Calling the original Table twice and Calculate as two columns


#### Algorithm


For this approach, we are calling the original table twice, once as the table that stores the start \`timestamps\` and once as the table that stores the end \`timestamps\`. To create the table alias, we give the original table \`Activity\` two different names, and filter each table by the \`activity_type\`. We also make sure the two tables are joined on the \`machine_id\` and \`process_id\`, so the output will have the start \`timestamp\` and end \`timestamp\` stored in two different columns for each machine and process. 

\`\`\`sql
SELECT *
FROM Activity a, 
     Activity b
WHERE 
    a.machine_id = b.machine_id
AND 
    a.process_id = b.process_id
AND 
    a.activity_type = 'start'
AND 
    b.activity_type = 'end'
\`\`\`

The output looks like this: 

| machine_id | process_id | activity_type | timestamp | machine_id | process_id | activity_type | timestamp |
| ---------- | ---------- | ------------- | --------- | ---------- | ---------- | ------------- | --------- |
| 0          | 0          | start         | 0.712     | 0          | 0          | end           | 1.52      |
| 0          | 1          | start         | 3.14      | 0          | 1          | end           | 4.12      |
| 1          | 0          | start         | 0.55      | 1          | 0          | end           | 1.55      |
| 1          | 1          | start         | 0.43      | 1          | 1          | end           | 1.42      |
| 2          | 0          | start         | 4.1       | 2          | 0          | end           | 4.512     |
| 2          | 1          | start         | 2.5       | 2          | 1          | end           | 5         |

With this table, we can update the calculation for \`processing_time\` by having all the timestamps from table b (end \`timestamp\`) to subtract all the \`timestamp\` in table a (start \`timestamp\`):

\`\`\`sql
SELECT (b.timestamp - a.timestamp) AS processing_time
\`\`\`

Since we want the average \`processing_time\` at the \`machine_id\` level, we add AVG() to the \`processing_time\` calculation and round it to 3 decimal places using the function \`ROUND()\`. 

\`\`\`sql
SELECT a.machine_id, 
       ROUND(AVG(b.timestamp - a.timestamp), 3) AS processing_time
\`\`\`


#### Implementation

\`\`\`sql
SELECT a.machine_id, 
       ROUND(AVG(b.timestamp - a.timestamp), 3) AS processing_time
FROM Activity a, 
     Activity b
WHERE 
    a.machine_id = b.machine_id
AND 
    a.process_id = b.process_id
AND 
    a.activity_type = 'start'
AND 
    b.activity_type = 'end'
GROUP BY machine_id
\`\`\`
​
---`,
        "originalCategory": "joins"
    },
    {
        "id": "570",
        "title": "Managers with at Least 5 Direct Reports",
        "difficulty": "medium",
        "description": "<p>Table: <code>Employee</code></p>\n\n<pre>\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| name        | varchar |\n| department  | varchar |\n| managerId   | int     |\n+-------------+---------+\nid is the primary key (column with unique values) for this table.\nEach row of this table indicates the name of an employee, their department, and the id of their manager.\nIf managerId is null, then the employee does not have a manager.\nNo employee will be the manager of themself.\n</pre>\n\n<p>&nbsp;</p>\n\n<p>Write a solution to find managers with at least <strong>five direct reports</strong>.</p>\n\n<p>Return the result table in <strong>any order</strong>.</p>\n\n<p>The result format is in the following example.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> \nEmployee table:\n+-----+-------+------------+-----------+\n| id  | name  | department | managerId |\n+-----+-------+------------+-----------+\n| 101 | John  | A          | null      |\n| 102 | Dan   | A          | 101       |\n| 103 | James | A          | 101       |\n| 104 | Amy   | A          | 101       |\n| 105 | Anne  | A          | 101       |\n| 106 | Ron   | B          | 101       |\n+-----+-------+------------+-----------+\n<strong>Output:</strong> \n+------+\n| name |\n+------+\n| John |\n+------+\n</pre>\n",
        "schema": "Create table If Not Exists Employee (id int, name varchar(255), department varchar(255), managerId int)\nTruncate table Employee\ninsert into Employee (id, name, department, managerId) values ('101', 'John', 'A', NULL)\ninsert into Employee (id, name, department, managerId) values ('102', 'Dan', 'A', '101')\ninsert into Employee (id, name, department, managerId) values ('103', 'James', 'A', '101')\ninsert into Employee (id, name, department, managerId) values ('104', 'Amy', 'A', '101')\ninsert into Employee (id, name, department, managerId) values ('105', 'Anne', 'A', '101')\ninsert into Employee (id, name, department, managerId) values ('106', 'Ron', 'B', '101')",
        "slug": "managers-with-at-least-5-direct-reports",
        "originalCategory": "joins"
    },
    {
        "id": "1699",
        "title": "Number of Calls Between Two Persons",
        "difficulty": "medium",
        "description": "<p>Table: <code>Calls</code></p>\\n\\n<pre>\\n+------------+------------+------------+\\n| from_id    | to_id      | duration   |\\n+------------+------------+------------+\\n| int        | int        | int        |\\n+------------+------------+------------+\\n</pre>\\n\\n<p>&nbsp;</p>\\n\\n<p>Write a solution to report the number of calls and the total call duration between each pair of distinct persons <code>(person1, person2)</code> where <code>person1 < person2</code>. Return the result table in <strong>any order</strong>.</p>\\n\\n<p>The result format is in the following example.</p>\\n\\n<p>&nbsp;</p>\\n<p><strong class=\\\"example\\\">Example 1:</strong></p>\\n\\n<pre>\\n<strong>Input:</strong> \\nCalls table:\\n+---------+-------+----------+\\n| from_id | to_id | duration |\\n+---------+-------+----------+\\n| 1       | 2     | 59       |\\n| 2       | 1     | 11       |\\n| 1       | 3     | 20       |\\n| 3       | 4     | 100      |\\n| 3       | 4     | 200      |\\n| 3       | 4     | 200      |\\n| 4       | 3     | 499      |\\n+---------+-------+----------+\\n<strong>Output:</strong> \\n+---------+---------+------------+----------------+\\n| person1 | person2 | call_count | total_duration |\\n+---------+---------+------------+----------------+\\n| 1       | 2       | 2          | 70             |\\n| 1       | 3       | 1          | 20             |\\n| 3       | 4       | 4          | 999            |\\n+---------+---------+------------+----------------+\\n</pre>\\n",
        "schema": "Create table If Not Exists Calls (from_id int, to_id int, duration int)\nTruncate table Calls\ninsert into Calls (from_id, to_id, duration) values ('1', '2', '59')\ninsert into Calls (from_id, to_id, duration) values ('2', '1', '11')\ninsert into Calls (from_id, to_id, duration) values ('1', '3', '20')\ninsert into Calls (from_id, to_id, duration) values ('3', '4', '100')\ninsert into Calls (from_id, to_id, duration) values ('3', '4', '200')\ninsert into Calls (from_id, to_id, duration) values ('3', '4', '200')\ninsert into Calls (from_id, to_id, duration) values ('4', '3', '499')",
        "slug": "number-of-calls-between-two-persons",
        "originalCategory": "joins"
    },
    {
        "id": "1934",
        "title": "Confirmation Rate",
        "difficulty": "medium",
        "description": "<p>Table: <code>Signups</code></p>\n\n<pre>\n+----------------+----------+\n| Column Name    | Type     |\n+----------------+----------+\n| user_id        | int      |\n| time_stamp     | datetime |\n+----------------+----------+\nuser_id is the column of unique values for this table.\nEach row contains information about the signup time for the user with ID user_id.\n</pre>\n\n<p>&nbsp;</p>\n\n<p>Table: <code>Confirmations</code></p>\n\n<pre>\n+----------------+----------+\n| Column Name    | Type     |\n+----------------+----------+\n| user_id        | int      |\n| time_stamp     | datetime |\n| action         | ENUM     |\n+----------------+----------+\n(user_id, time_stamp) is the primary key (combination of columns with unique values) for this table.\nuser_id is a foreign key (reference column) to the Signups table.\naction is an ENUM (category) of the type (&#39;confirmed&#39;, &#39;timeout&#39;)\nEach row of this table indicates that the user with ID user_id requested a confirmation message at time_stamp and that confirmation message was either confirmed (&#39;confirmed&#39;) or expired without confirming (&#39;timeout&#39;).\n</pre>\n\n<p>&nbsp;</p>\n\n<p>The <strong>confirmation rate</strong> of a user is the number of <code>&#39;confirmed&#39;</code> messages divided by the total number of requested confirmation messages. The confirmation rate of a user that did not request any confirmation messages is <code>0</code>. Round the confirmation rate to <strong>two decimal</strong> places.</p>\n\n<p>Write a solution to find the <strong>confirmation rate</strong> of each user.</p>\n\n<p>Return the result table in <strong>any order</strong>.</p>\n\n<p>The result format is in the following example.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> \nSignups table:\n+---------+---------------------+\n| user_id | time_stamp          |\n+---------+---------------------+\n| 3       | 2020-03-21 10:16:13 |\n| 7       | 2020-01-04 13:57:59 |\n| 2       | 2020-07-29 23:09:44 |\n| 6       | 2020-12-09 10:39:37 |\n+---------+---------------------+\nConfirmations table:\n+---------+---------------------+-----------+\n| user_id | time_stamp          | action    |\n+---------+---------------------+-----------+\n| 3       | 2021-01-06 03:30:46 | timeout   |\n| 3       | 2021-07-14 14:00:00 | timeout   |\n| 7       | 2021-06-12 11:57:29 | confirmed |\n| 7       | 2021-06-13 12:58:28 | confirmed |\n| 7       | 2021-06-14 13:59:27 | confirmed |\n| 2       | 2021-01-22 00:00:00 | confirmed |\n| 2       | 2021-02-28 23:59:59 | timeout   |\n+---------+---------------------+-----------+\n<strong>Output:</strong> \n+---------+-------------------+\n| user_id | confirmation_rate |\n+---------+-------------------+\n| 6       | 0.00              |\n| 3       | 0.00              |\n| 7       | 1.00              |\n| 2       | 0.50              |\n+---------+-------------------+\n<strong>Explanation:</strong> \nUser 6 did not request any confirmation messages. The confirmation rate is 0.\nUser 3 made 2 requests and both timed out. The confirmation rate is 0.\nUser 7 made 3 requests and all were confirmed. The confirmation rate is 1.\nUser 2 made 2 requests where one was confirmed and the other timed out. The confirmation rate is 1 / 2 = 0.5.\n</pre>\n",
        "schema": "Create table If Not Exists Signups (user_id int, time_stamp datetime)\nCreate table If Not Exists Confirmations (user_id int, time_stamp datetime, action ENUM('confirmed','timeout'))\nTruncate table Signups\ninsert into Signups (user_id, time_stamp) values ('3', '2020-03-21 10:16:13')\ninsert into Signups (user_id, time_stamp) values ('7', '2020-01-04 13:57:59')\ninsert into Signups (user_id, time_stamp) values ('2', '2020-07-29 23:09:44')\ninsert into Signups (user_id, time_stamp) values ('6', '2020-12-09 10:39:37')\nTruncate table Confirmations\ninsert into Confirmations (user_id, time_stamp, action) values ('3', '2021-01-06 03:30:46', 'timeout')\ninsert into Confirmations (user_id, time_stamp, action) values ('3', '2021-07-14 14:00:00', 'timeout')\ninsert into Confirmations (user_id, time_stamp, action) values ('7', '2021-06-12 11:57:29', 'confirmed')\ninsert into Confirmations (user_id, time_stamp, action) values ('7', '2021-06-13 12:58:28', 'confirmed')\ninsert into Confirmations (user_id, time_stamp, action) values ('7', '2021-06-14 13:59:27', 'confirmed')\ninsert into Confirmations (user_id, time_stamp, action) values ('2', '2021-01-22 00:00:00', 'confirmed')\ninsert into Confirmations (user_id, time_stamp, action) values ('2', '2021-02-28 23:59:59', 'timeout')",
        "slug": "confirmation-rate",
        "originalCategory": "joins"
    }
];
