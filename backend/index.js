const express = require("express");
require('./Models/db')
var cors = require('cors')
const AuthRouter = require('./Router/auth')
const NotesRouter = require('./Router/notes')
const app = express();
const PORT = 8000;

 
app.use(cors())

app.get("/", function (req, res) {
  res.send("Hello World");
});
app.use(express.json())

app.use('/auth',AuthRouter)
app.use('/notes',NotesRouter)


app.listen(PORT,()=>{
    console.log(`Server is runing on ${PORT}`)
})
