import express from 'express';
import mysql from 'mysql'
import{ router} from './Routes/api/employee.js'

export const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database:'nodesql'
})

db.connect((err) => {
    if (err) {
        throw err
    }
    console.log('Connected to MySQL DB')
})

const app = express()

// create database
app.get('/createdb', (req, res) => {
    let sql = `CREATE DATABASE nodesql`
    db.query(sql, err => {
        if (err) {
            throw err
        }else{
            res.send({ message: "Database created Sucessfully" })
        }
       
    })
})

//create table

app.get('/createEmployee', (req, res) => {
    let sql = `CREATE TABLE employee(id int AUTO_INCREMENT, name VARCHAR(255), designation VARCHAR(255), PRIMARY KEY(id))`;
    db.query(sql, err => {
        if (err) {
            throw err
        }else{
            res.send({ message: "Employee table created Sucessfully" })
        }
       
    })
})

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use('/employee',router)

app.listen(3000, () => {
    console.log("server is running in port 3000")
})
