// package.json debe tener: "type": "module"

import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import expressLayouts from "express-ejs-layouts";
import routes from "./src/routes/router.get.js"; 
import { fileURLToPath } from "url";
import { dirname, join } from "path";

// reconstruir __dirname en ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// middleware
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());
app.use(expressLayouts);
app.use(express.static(join(__dirname, "src", "views")))

// settings
app.set("view engine", "ejs");
app.set("views", join(__dirname, "src", "views"));
app.set("layout", "./layouts/main");

// routes
app.use("/", routes);

app.listen(process.env.PORT || 3000, () =>
  console.log(`Server on port ${process.env.PORT || 3000}`)
);