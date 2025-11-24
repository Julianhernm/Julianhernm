const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const expressLayouts = require("express-ejs-layouts");
const routes = require("./src/routes/router.get");
const { join } = require("path");

const app = express();


//middleware
app.use(express.json());
app.use(morgan("dev"))
app.use(cookieParser());
app.use(expressLayouts)

//settings
app.set("view engine", "ejs");
app.set("views", join(__dirname, "src", "views"))
app.set("Layout", "layout")

//routes
app.use("/", routes);

app.listen(process.env.PORT || 3000, ()=> console.log(`Server on port ${process.env.PORT || 3000}`))