# **SQLifyJSON**

Convert JSON objects to SQL INSERT statements effortlessly.

## ***Installation***

```bash
npm install sqlifyjson
```

## ***Usage***

```javascript
const sqlifyjson = require("sqlifyjson");

const jsonData = [
    { id: 1, name: "Alice", age: 25 },
    { id: 2, name: "Bob", age: 30 }
];

const tableName = "users";

const sql = sqlifyjson(jsonData, tableName);
console.log(sql);
// Output:
// INSERT INTO `users` (`id`, `name`, `age`) VALUES 
// (1, 'Alice', 25), 
// (2, 'Bob', 30);
```

## ***Features***

* Supports single JSON objects and arrays of objects
* Automatically handles special characters
* Converts null or undefined to NULL in SQL

## ***Testing***

Create a test file (`test.js`):

```javascript
const sqlifyjson = require("./index");

test("Generates SQL for valid JSON", () => {
    const json = [{ id: 1, name: "Test" }];
    const sql = sqlifyjson(json, "users");
    console.log(sql);  // For debugging purposes
    expect(sql).toBe("INSERT INTO `users` (`id`, `name`) VALUES (1, 'Test');");
});

test("Throws error for missing table name", () => {
    expect(() => sqlifyjson([{ id: 1 }], "")).toThrow("Table name is required.");
});
```

Run tests:

```bash
npm test
```

## ***License***

**MIT**
 This project is licensed under the [MIT License](./LICENSE).  
You are free to use, modify, and distribute this software. See the `LICENSE` file for full license terms.
