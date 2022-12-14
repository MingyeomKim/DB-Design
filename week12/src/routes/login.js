// Copyright 2021 kms
// 
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
// 
//     http://www.apache.org/licenses/LICENSE-2.0
// 
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import cookieParser from "cookie-parser";
import express from "express";
import expressSession from 'express-session';
import { selectSql } from "../database/sql";

const router = express.Router();

// 쿠키 및 세션 설정
router.use(cookieParser());
router.use(expressSession({
    secret: 'dilab',
    resave: true,
    saveUninitialized: true,
}))

router.get('/', (req, res) => {
    if (req.cookies.userName) {
        res.render('main', { user : req.cookies.userName });
    } else {
        res.render('login'); // hbs file name
    }
});

router.get('/logout', (req, res) => {
    if (req.cookies.userName) {
        res.clearCookie('userName')
        res.clearCookie('userId')
        res.redirect("/");
    } else {
        res.redirect("/");
    }
})

router.post('/', async (req, res) => {
    const vars = req.body; // 사용자가 입력한 id password
    const users = await selectSql.getUsers();
    let whoAmI = '';
    let studentId = '';
    let checkLogin = false;

    users.map((user) => { // for loop
        if (vars.id == user.Student_id && vars.password == user.Password) { // vars는 form id, user는 DB의 field name
            checkLogin = true;
            whoAmI = user.Name;
            studentId = user.Student_id;
        }
    })

    if (checkLogin) { 
        // cookie 설정
        res.cookie('userName', whoAmI, {
            expires: new Date(Date.now() + 3600000), // ms 단위 (3600000: 1시간 유효)
            httpOnly: true
        }),
        res.cookie('userId', studentId, {
            expires: new Date(Date.now() + 3600000), // ms 단위 (3600000: 1시간 유효)
            httpOnly: true
        }),
        res.redirect('/');
    } else {
        res.redirect('/');
    }
})

module.exports = router;