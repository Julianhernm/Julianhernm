const express = require("express");
const morgan = require("morgan");
const { join } = require("path")

const app = express()
const PORT = 3000;

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded());

app.set("view engine", "ejs");
app.set("viwes", join(__dirname, "workout", "views"));

app.get("/", (req, res)=>{
    app.json("Hello world");
})

app.listen(process.env.PORT || PORT, ()=> console.log(`Server on port ${process.env.PORT || PORT}`))
