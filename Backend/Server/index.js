const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

//Create connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nodemysql'
})

// Connect to mysql
db.connect(err => {
    if(err) {
        throw err
    }
    console.log('MySQL Connected')
})

const app = express();

//Create Database
app.get("/createdb", (req, res) => {
    let sql = 'CREATE DATABASE nodemysql';
    db.query(sql, (err) => {
        if(err) {
            throw err;
        }
        res.send("Database Created")
    })
})

//Create Table
app.get('/createemployee', (req, res) => {
    let sql = 'CREATE TABLE employee(id int AUTO_INCREMENT, name VARCHAR(255), designation VARCHAR(255), PRIMARY KEY(id))';
    db.query(sql, err => {
        if(err) {
            throw err
        }
        res.send('Employee table created');
    })
})


app.get('/register', (req, res) => {
    let sql = 'CREATE TABLE register(id int AUTO_INCREMENT, name VARCHAR(255), email VARCHAR(255), password VARCHAR(255), PRIMARY KEY(id))';
    db.query(sql, err => {
        if(err) {
            throw err
        }
        res.send('Table created');
    })
})


// select employees
app.get('/getusers', (req, res) => {
    let sql = 'SELECT * FROM register';
    let query = db.query(sql, (err, results) => {
        if (err) {
            throw err
        }
        res.send(results);
    })
})

app.get('/getemployee/:id', (req, res) => {
    let sql = `SELECT * FROM register WHERE id = ${req.params.id}`;
    let query = db.query(sql, (err, results) => {
        if (err) {
            throw err
        }
        console.log(results);
        res.send(results);
    })
})

//update employee
app.get('/updateemployee/:id', (req,res) => {
    let newName = 'Updated name'
    let sql = `UPDATE employee SET name = '${newName}' WHERE id = ${req.params.id}`;
    let query = db.query(sql, (err,results) => {
        if(err) {
            throw err
        }
        res.send(results);
    })
})

app.get('/deleteemployee/:id', (req,res) => {
    let sql = `DELETE FROM employee WHERE id = ${req.params.id}`;
    let query = db.query(sql, err => {
        if(err){
            throw err;
        }
        res.send('Employee deleted');
    })
})

app.use(express.json());
app.use(cors());

app.post('/user', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true); // you 
    let data = req.body;
       console.log(data);
    let sql = `INSERT INTO register (name, email, password)
               VALUES("${data.name}", "${data.email}", "${data.password}")
    `
    let query = db.query(sql, data, (err,result) => {
        if(err) {
            throw err
        }
        res.send(data);
    })
})

app.listen('3002', () => {
    console.log('Server Started on port 3002');
})