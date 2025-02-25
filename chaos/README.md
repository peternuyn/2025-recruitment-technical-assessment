> This question is relevant for **chaos backend**

# DevSoc Subcommittee Recruitment: Chaos Backend

**_Complete as many questions as you can._**

## Question 1

You have been given a skeleton function `process_data` in the `data.rs` file.
Complete the parameters and body of the function so that given a JSON request of the form

```json
{
  "data": ["Hello", 1, 5, "World", "!"]
}
```

the handler returns the following JSON:

```json
{
  "string_len": 11,
  "int_sum": 6
}
```

Edit the `DataResponse` and `DataRequest` structs as you need.

## Question 2

### a)

Write (Postgres) SQL `CREATE TABLE` statements to create the following schema.
Make sure to include foreign keys for the relationships that will `CASCADE` upon deletion.
![Database Schema](db_schema.png)

**Answer box:**

```sql
CREATE TABLE forms (
    --     Add columns here
    id INT NOT NULL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT

);

CREATE TABLE questions (
    --     Add columns here
    id INT NOT NULL PRIMARY KEY,
    form_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    question_type question_type NOT NULL,
    FOREIGN KEY questions(id) REFERENCES forms(id) ON DELETE CASCADE
);

CREATE TABLE question_options (
    --     Add columns here
    id INT NOT NULL PRIMARY KEY,
    question_id INT NOT NULL,
    option VARCHAR(255),
    FOREIGN KEY questions_options(id) REFERENCES questions(id) ON DELETE CASCADE
);
```

### b)

Using the above schema, write a (Postgres) SQL `SELECT` query to return all questions in the following format, given the form id `26583`:

```
   id    |   form_id   |           title             |   question_type   |     options
------------------------------------------------------------------------------------------------------------
 2       | 26583       | What is your full name?     | ShortAnswer       | [null]
 3       | 26583       | What languages do you know? | MultiSelect       | {"Rust", "JavaScript", "Python"}
 7       | 26583       | What year are you in?       | MultiChoice       | {"1", "2", "3", "4", "5+"}
```

**Answer box:**

```sql
-- Write query here
SELECT
    q.id,
    q.form_id,
    q.title,
    q.question_type,
    COALESCE(ARRAY_AGG(qo.option), ARRAY[NULL]) AS options
 FROM questions q
LEFT JOIN question_options qo ON q.id = qo.question_id
WHERE q.form_id = 26583
GROUP BY q.id, q.form_id, q.title, q.question_type;
```
