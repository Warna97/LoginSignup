const express = require('express')
const port=3000
const bodyParser = require('body-parser');
const db = require('./database');


const app =express()
// Parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

// API endpoint to register a member
app.post('/register', async (req, res) => {
    const {
        name,
        address,
        email,
        password
    } = req.body;

    // Email validation
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
        return res.status(400).json({ error: 'Invalid email address' });
    }
    const insertQuery = `
    INSERT INTO member (name, address, email,password)
    VALUES (?, ?, ?, ?)
  `;

    db.run(insertQuery, [
        name,
        address,
        email,
        password
    ], function(err) {
        if (err) {
            console.error(err.message);
            return res.status(400).json({ error: 'Could not register member' });
        }
         console.log(`A member with id ${this.lastID} has been registered`);
        return res.status(201).json({
            message: `member ${name} has been registered`,
            memberId: this.lastID
        });
    });
});

// Create login endpoint
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    // Perform validation and authentication logic
    // Check if the email and password match a user in the database

    // Example: Assuming you have a 'member' table in the SQLite database
    const query = `SELECT * FROM member WHERE email = ? AND password = ?`;
    db.get(query, [email, password], (err, row) => {
        if (err) {
            // Handle any database error
            return res.status(500).json({ error: 'Internal server error' });
        }

        if (!row) {
            // User not found or credentials don't match
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        // User successfully authenticated
        return res.status(200).json({ message: 'Login successful' });
    });
});






app.get('/',(req,res)=>{
    res.status(200).json({ message: 'Test application' });
    res.send("hello world")
})
app.listen(port,()=>{
    console.log(`app is running on port ${port}`)
    }
)