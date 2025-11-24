const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const routes = require("./src/routes/router.get")

const app = express();


//middleware
app.use(express.json());
app.use(morgan("dev"))
app.use(cookieParser());

//settings
app.set("view engine", "ejs");

//routes
app.use("/", routes);

app.listen(process.env.PORT || 3000, ()=> console.log(`Server on port ${process.env.PORT || 3000}`))