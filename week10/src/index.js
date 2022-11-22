import express from "express";
import logger from "morgan";
import path from "path";

import loginRouter from "./routes/login";
import selectRouter from "./routes/select";
import deleteRouter from "./routes/delete";

const PORT = 3000;

const app = express();

/* 세션 설정 */
const session = require('express-session');
const MemoryStore = require('memorystore')(session);

const maxAge = 1000 * 60 * 5
const sessionObj = {
    secret: 'asdf1234',
    resave: false,
    saveUninitialized: true,
    store : new MemoryStore({checkPeriod: maxAge}),
    cookie: {
        maxAge,
    },
};

app.use(session(sessionObj));


app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.set("views", path.join(__dirname,"views"));
app.set("view engine","hbs");

app.use(logger("dev"));

app.use("/",loginRouter);
app.use("/select",selectRouter);
app.use("/delete",deleteRouter);

app.listen(PORT, ()=>{
    console.log(`Example app listening at http://localhost:${PORT}`);
})