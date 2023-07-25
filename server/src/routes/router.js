const express = require('express')
const router = express.Router()
const path = require('path');

//database connection
const dbPath = path.resolve(__dirname, './todos.db')
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database(dbPath, (err) =>{
  if(err) return console.error(err);
})

//return list of all todos
router.get("/todos", async (req, res) => {
  try{
    const sql = `SELECT * FROM TODOS`
    db.all(sql, [], (err, rows) => {
        if(err) return res.status(500).json(err)
        return res.status(200).json(rows)
    })
    } catch (err){
        return res.status(500).json(err)
    }
})

//return all "completed" todos
router.get("/todos/complete", async (req, res) => {
    data = []
    try {
        sql = `SELECT * FROM TODOS WHERE COMPLETED=?`
        db.each(sql, [1], (err, rows)=> {
            if(err) return res.status(500).json(err)
            data.push(rows)
        }, function() {
        return res.status(200).json(err)
        }
        )
    }
    catch (err){
        return res.send(err)
    }
})

//add a new todo
router.post("/todos", async (req, res) => {
    try{
        const { task } = req.body;
        sql = `INSERT INTO TODOS(TASK, COMPLETED) VALUES (?, ?)`
        db.run(sql, [task, 0], (err)=>{
            if(err) return res.status(500).json(err)
            return res.status(200).json("Successfully inserted a new task")
        })
    }
    catch(err){
        return res.send(err)
    }
});

//delete todo by id
router.delete("/todos", (req, res) => {
    try{
        const { id } = req.query;
        sql = `DELETE FROM TODOS WHERE ID=?`
        db.run(sql, [id], (err) => {
            if(err) return res.status(500).json(err)
            return res.status(200).json(`Successfully deleted id=${id}`)
            })
        }
        catch(err){
            return res.send(err)
        }
});

//edit todo by id
router.post("/todos/update", (req, res) => {
    try{
        const { id } = req.query
        const { task } = req.body;
        sql = `UPDATE TODOS SET TASK = ? WHERE ID = ?`
        db.run(sql, [task, id], (err) => {
            if(err) return res.status(500).json(err)
            return res.status(200).json(`Successfully updated id=${id}`)
        })
    }
    catch(err){
        return res.send(err)
    }
});

//update todo to complete
router.post("/todos/complete", (req, res) => {
    try{
        const { id } = req.query;
            sql = `UPDATE TODOS SET COMPLETED=? WHERE ID=?`
            db.run(sql, [ 1, id ], (err) => {
            if(err) return res.status(500).json(err)
                return res.status(200).json(`Marked completed id=${id}`)
            })
    }
    catch(err){
        return res.send(err)
    }
  });

//recover todo from complete to incomplete
router.post("/todos/incomplete", (req, res) => {
    try{
        const { id } = req.query;
            sql = `UPDATE TODOS SET COMPLETED=? WHERE ID=?`,
            db.run(sql, [0, id], (err)=> {
            if(err) return res.status(500).json(err)
            return res.status(200).json(`Marked incompleted id=${id}`)
            })
    }
    catch(err){
        return res.send(err)
    }
});

// success_response = function (data){
//   return {
//           data: data, 
//           success: true
//         }
// }

// error_response = function (err){
//   return {
//           error: err, 
//           success: false
//         }
// }

// // db.close((err) => {
// //   if (err) return console.error(err.message)
// // })

module.exports = router





