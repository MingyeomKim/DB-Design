import cookieParser from "cookie-parser";
import express from "express";
import expressSession from 'express-session';
const router = express.Router();

router.use(cookieParser());
router.use(expressSession({
    secret: 'dilab',
    resave: true,
    saveUninitialized: true,
}))

router.get('/logout', (req, res) => {
    if (req.cookies.userName) {
        res.clearCookie('userName')
        res.clearCookie('userId')
        res.redirect("/");
    } else {
        res.redirect("/");
    }
})

module.exports = router;