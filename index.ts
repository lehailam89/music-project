import express, { Express } from 'express';
import dotenv from 'dotenv';
dotenv.config();


import * as database from './config/database';
import session from 'express-session';
import flash from 'express-flash';
import cookieParser from 'cookie-parser';
import passport from './config/passport';

import adminRoutes from './routes/admin/index.route';
import clientRoutes from './routes/client/index.route';
import { systemConfig } from './config/config';
import path from 'path';
import methodOverride from 'method-override';
import bodyParser from "body-parser";
import { infoUser } from './middlewares/client/user.middleware';


database.connect();

const app: Express = express();
const port: number | string = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser()); // Đảm bảo rằng cookie-parser được sử dụng
app.use(methodOverride("_method"));
app.use(express.static("public"));

app.set("views", "./views");
app.set("view engine", "pug");

// Sử dụng session và flash
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true
}));
app.use(flash());

//passportjs đăng nhập Google
app.use(passport.initialize());
app.use(passport.session());

// Sử dụng middleware infoUser
app.use(infoUser);

//TinyMCE 
app.use(
    "/tinymce",
    express.static(path.join(__dirname, "node_modules", "tinymce"))
);

//App Local Variables
app.locals.prefixAdmin = systemConfig.prefixAdmin;

//Client routes
clientRoutes(app);
//admin routes
adminRoutes(app);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});