const express = require("express");
const app = express();
const bodyparser = require('body-parser')
const path = require('path');

//database connection
const dbPath = path.resolve(__dirname, '../todos.db')
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database(dbPath, (err) =>{
  if(err) return console.error(err);
})

//middleware
app.use(bodyparser.urlencoded({ extended: true }))
app.use(express.json())


//return list of all todos
app.get("/todos", async (req, res) => {
  const sql = `SELECT * FROM TODOS`
  db.all(sql, [], (err, rows) => {
    if (err) return res.status(500).json(error_response(err))
    return res.status(200).json(success_response(rows))
  })
})

//return all "completed" todos
app.get("/todos/complete", async (req, res) => {
  data = []
    sql = `SELECT * FROM TODOS WHERE COMPLETED=?`
    db.each(sql, [1], (err, rows)=> {
      if(err) return res.status(500).json(error_response(err))
      data.push(rows)
    }, function() {
      return res.status(200).json(success_response(data)) 
    }
)})

//add a new todo
app.post("/todos", async (req, res) => {
  const { task } = req.body;
  sql = `INSERT INTO TODOS(TASK, COMPLETED) VALUES (?, ?)`
  db.run(sql, [task, 0], (err)=>{
    if(err) return res.status(500).json(error_response(err))
    return res.status(200).json(success_response("Successfully inserted a new task"))
  })
});

//delete todo by id
app.delete("/todos", (req, res) => {
  const { id } = req.query;
  sql = `DELETE FROM TODOS WHERE ID=?`
  db.run(sql, [id], (err) => {
    if(err) return res.status(500).json(error_response(err))
    return res.status(200).json(success_response(`Successfully deleted id=${id}`))
    })
});

//edit todo by id
app.post("/todos/update", (req, res) => {
  const { id, task } = req.body;
  sql = `UPDATE TODOS SET TASK = ? WHERE ID = ?`
  db.run(sql, [task, id], (err) => {
    if(err) return res.status(500).json(error_response(err))
    return res.status(200).json(success_response(`Successfully updated id=${id}`))
  })
});

//update todo to complete
app.post("/todos/complete", (req, res) => {
  const { id } = req.body;
    sql = `UPDATE TODOS SET COMPLETED=? WHERE ID=?`
    db.run(sql, [ 1, id ], (err) => {
      if(err) return res.status(500).json(error_response(err))
      return res.status(200).json(success_response(`Marked completed id=${id}`))
    })
  });

//recover todo from complete to incomplete
app.post("/todos/incomplete", (req, res) => {
  const { id } = req.body;
    sql = `UPDATE TODOS SET COMPLETED=? WHERE ID=?`,
    db.run(sql, [0, id], (err)=> {
      if(err) return res.status(500).json(error_response(err))
      return res.status(200).json(success_response(`Marked incompleted id=${id}`))
    })
});

success_response = function (data){
  return {
          status: 200,
          data: data, 
          success: true
        }
}

error_response = function (err){
  return {
          status: 500,
          error: err, 
          success: false
        }
}

app.listen(4000, () => {
  console.log("server started at port 4000");
});

// db.close((err) => {
//   if (err) return console.error(err.message)
// })





