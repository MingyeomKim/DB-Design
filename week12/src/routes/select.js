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

import express from "express";
import { selectSql } from "../database/sql";
import { insertSql } from "../database/sql";
// TODO
// sql import

const router = express.Router();

router.get('/', async function (req, res) {
    // TODO
    // class 정보 불러오기
    const class_res = await selectSql.getClass(req.cookies.userId);
    const current_class_res = await selectSql.getCurrentClass(req.cookies.userId);
    const user_info_res = await selectSql.getUserInfo(req.cookies.userId);
    if (req.cookies.userName) { // user가 cookie에 존재하면
        // TODO
        // 불러온 class 정보 같이 넘겨주기
        res.render('select', { 
            title1 : '현재 수강 목록',
            title2 : '수강 신청 목록',
            user : req.cookies.userName,
            current_class_res,
            class_res, 
            user_info_res,
         });
    } else { // user가 존재하지 않으면 (login되지 않은 상태)
        res.redirect('/')
    }
});

router.post('/', async function(req, res) {
    const data = {
        classId : req.body.insertBtn,
        studentId : req.cookies.userId,
    };

    await insertSql.insertClassHasStudent(data);
    res.redirect('/sugang');
})

module.exports = router;