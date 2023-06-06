const sqlite3 = require('sqlite3').verbose();

// Open database in memory
let db = new sqlite3.Database(":memory:", (err) => {
    if (err) {
        console.error(err.message);
        return;
    }
    console.log('Connected to the in-memory SQLite database');
});
// CREATE TABLE statement for member
const createMember = `
  CREATE TABLE IF NOT EXISTS member (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    address TEXT ,
    email TEXT NOT NULL,
    Password  TEXT NOT NULL
  )
`;
// Create createMember if not exists
db.run(createMember, (err) => {
    if (err) {
        console.error(err.message);
        return;
    }
    console.log('createMember created successfully');
});


module.exports = db;
