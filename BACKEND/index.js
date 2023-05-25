const connectToMongo = require("./db");
const express = require('express')
connectToMongo();

const app = express()
const port = 5000
app.use(express.json());
// const tasks = [{
//   id:1,
//   title:"Work with developers",
//   description:"Work with developers to fullfill clients requirements"
// },{
//   id:2,
//   title:"Learn Unit testing",
//   description: "Learn Unit testing and do a certification on it"
// }]
app.get('/', (req, res) => {
  res.send("Hello World")
})
// app.get('/tasks', (req, res) => {
//   res.send({message:'Hello World!',data:tasks})
// })
app.use("/api/auth", require("./routes/auth"));
app.use("/api/tasks", require("./routes/tasks"));


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})