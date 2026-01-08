import express, { urlencoded } from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import expressLayouts from "express-ejs-layouts";
import routes from "./src/routes/router.get.js";
import routerAuth from "./src/routes/router.auth.js"
import ms from "ms";
import helmet from "helmet";
import { rateLimit } from "express-rate-limit"
import { slowDown } from "express-slow-down";
import cors from "cors"
import { logger } from "./src/config/logging.js";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { config } from "./src/config/env.js";
import { initDB } from "./src/config/connect.db.js";
import routerLogic from "./src/routes/router.logic.js"
import session from "express-session";
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
const configCors = {
  origin: (origin, callback) => {
    const allowed = [
      "http://localhost:3000",
      "http://127.0.0.1:3000"
    ];


    if (!origin || allowed.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Origen no permitido por Cors"))
    }
  },
  methods: ["GET", "POST", "DELETE", "PATCH", "PUT"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  maxAge: 6000000
}

//Config express-session
const sess = {
  resave: false,
  saveUninitialized: false,
  secret: "keyboard cat",
  cookie: {
    maxAge: 1000 * 60 * 60,
    secure: false,
    path: "/"
  }
}

const app = express();

// middleware
app.use(helmet(configHel));
app.use(cors(configCors));
app.use(express.static(join(__dirname, "src", "public")));
app.use(urlencoded({ extended: true }))
app.use(express.json());
app.use(express(sess))
app.use(morgan("dev"));
app.use(limiter)
app.use(delay)
app.use(cookieParser());
app.use(expressLayouts);


// settings
app.set("view engine", "ejs");
app.set("views", join(__dirname, "src", "views"));
app.set("layout", "./layouts/main");

//initialize DB
initDB()

// routes
app.use("/api", routerAuth)
app.use("/api-logic", routerLogic)
app.use("/", routes);

app.listen(process.env.PORT || 3000, async () => logger.info(`Server on port ${process.env.PORT || 3000}`));