import express from 'express';
export const router = express.Router();
import { db } from '../../index.js'

router.post('/createEmployee', (req, res) => {

    let employeeDetail = {

        name: req.body.name,
        designation: req.body.designation
    }

    let sql = 'INSERT INTO employee SET ?'
     db.query(sql, employeeDetail, err => {
        if (err) {
            throw err
        } else {
            res.send({ message: "Employee added Sucessfully", result: employeeDetail })
        }
    })
})

router.get('/getAllEmployees', (req, res) => {
    let sql = 'SELECT * FROM employee';
    db.query(sql, (err, response) => {
        if (err) {
            throw err
        } else {
            res.send({ message: "Employee added Sucessfully", result: response })
        }
    })

})
router.get('/getEmployeeById/:id', (req, res) => {
    let sql = `SELECT * FROM employee Where id=${req.params.id}`;
     db.query(sql, (err, response) => {
        if (err) {
            throw err
        } else {
            res.send({ message: "Employee fetched Sucessfully", result: response })
        }
    })

})


router.put('/updateEmployee/:id', (req, res) => {

    let sql = `UPDATE employee SET name = ?, designation = ? WHERE id = ?`;
    db.query(sql, [req.body.name, req.body.designation, req.params.id], (err) => {
        if (err) {
            throw err
        } else {
            let sqlInner = `SELECT * FROM employee Where id=${req.params.id}`;
            db.query(sqlInner, (err, response) => {
                res.send({ message: "Employee updated Sucessfully", result: response })
            })

        }
    })
})

router.delete('/deleteEmployee/:id', (req, res) => {
    const sql = 'DELETE FROM employee WHERE id = ?';
    db.query(`SELECT * FROM employee Where id=${req.params.id}`, (err, response) => {
        if (err) {
            throw err;
        } else {
            console.log(response, "response")
            if(response.length>0){
                db.query(sql,[req.params.id],(err, response) =>{
                    res.send({ message: 'Employee deleted successfully', statusCode: 200 });
                })
            }else{
                res.send({ statusCode: 201, message: 'Employee Not found' })
            }
           

        }
    });
})