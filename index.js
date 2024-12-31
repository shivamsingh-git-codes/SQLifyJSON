/**
 * Converts a JSON object or array of objects into SQL INSERT statements.
 * @param {Object|Array} json - JSON object or array to convert.
 * @param {string} tableName - Name of the SQL table.
 * @returns {string} - SQL INSERT statement(s).
 */
function sqlifyjson(json, tableName) {
    if (!tableName) throw new Error("Table name is required.");
    if (!Array.isArray(json)) {
        json = [json];
    }
    if (json.length === 0) {
        throw new Error("Empty JSON array provided.");
    }

    const keys = Object.keys(json[0]);
    const columns = keys.map((key) => `"${key}"`).join(", "); // Changed backticks to double quotes

    const values = json.map((obj) => {
        const row = keys.map((key) => {
            const value = obj[key];
            if (value === null || value === undefined) return "NULL";
            if (typeof value === "string") return `'${value.replace(/'/g, "''")}'`;
            return value;
        });
        return `(${row.join(", ")})`;
    });

    const sql = `INSERT INTO "${tableName}" (${columns}) VALUES ${values.join(", ")};`; // Changed backticks to double quotes
    return sql;
}

// Export the function for external use
module.exports = sqlifyjson;
