import express, { urlencoded } from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import expressLayouts from "express-ejs-layouts";
import routes from "./src/routes/router.get.js"; 
import ms from "ms";
import helmet from "helmet";
import { rateLimit } from "express-rate-limit"
import { slowDown } from "express-slow-down";
import cors from "cors"
import { logger } from "./src/config/logging.js";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import {sequelize} from "./src/config/connect.db.js";
import { config } from "./src/config/env.js";
import "./src/models/associations.js";

// reconstruir __dirname en ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//rate limit
const limiter = rateLimit({
  windowMs: ms(config.security.rateLimit.window),
  limit: config.security.rateLimit.max,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: "To many requests, please try again later"
})

const delay = slowDown({
  windowMs: ms(config.security.rateLimit.window),
  delayAfter: config.security.rateLimit.max,
  delayMs: config.security.speedLimit.delay
});


//config helmet
// CSP y COEP desactivados porque EJS usa inline scripts/styles
const configHel = {
  contentSecurityPolicy: false,
  crossOriginEmbedderPolicy: false
};

//config cors
const configCors= {
  origin:(origin, callback)=>{
    const allowed = config.security.corsOrigin.split(",");

    if(!origin || allowed.includes(origin)){
      callback(null, true);
    }else{
      callback(new Error("Origen no permitido por Cors"))
    }
  },
  methods: ["GET", "POST","DELETE", "PATCH", "PUT"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  maxAge: 600
}

const app = express();

// middleware
app.use(helmet(configHel));
app.use(cors(configCors));
app.use(express.static(join(__dirname, "src", "public")));
app.use(urlencoded({extended: true}))
app.use(express.json());
app.use(morgan("dev"));
app.use(limiter)
app.use(delay)
app.use(cookieParser());
app.use(expressLayouts);


// settings
app.set("view engine", "ejs");
app.set("views", join(__dirname, "src", "views"));
app.set("layout", "./layouts/main");

// routes

app.use("/", routes);

console.log("hola")


app.listen(process.env.PORT || 3000, async () =>{
  logger.info(`Server on port ${process.env.PORT || 3000}`)
  await sequelize.sync({force: false})
  await sequelize.authenticate()
}
);

