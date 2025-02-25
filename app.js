import methodOverride from "method-override";
import express from "express";
import path from "path";
const app = express()
import session from "express-session";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import passport from './config/passport.js'

import expressLayouts from "express-ejs-layouts";
import db from "./config/db.js";


app.use(methodOverride("_method"));

import dotenv from "dotenv";
dotenv.config();

import userRoutes from './routes/user.js';
import adminRoutes from './routes/admin.js'
const PORT = process.env.PORT

app.use(session({
        secret: process.env.SESSION_KEY,
        resave: false,
        saveUninitialized: false,
        cookie: { secure: false, maxAge: 1000 * 60 * 60 * 24 },
    })
);

app.use(passport.initialize());
app.use(passport.session());


// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

// Use express-ejs-layouts
app.use(expressLayouts);
app.set('layout', 'layouts/layout')

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json())
app.use(express.urlencoded({extended: true}))

// Connect to MongoDB Atlas
db();

app.use('/', userRoutes);
app.use('/admin', adminRoutes);


// cannot get page 404 error
// app.use((req, res, next) => {
//     res.status(404).render("404",{title : "Page not found"});
// });

app.listen(PORT,()=> console.log(`server running on ${PORT}`))