import express from "express";
import { selectSql } from "../database/sql";

const router = express.Router();

router.get('/',(req,res) => {
    res.render('login');
});

router.post('/',async(req,res)=>{
    const vars = req.body;
    const students = await selectSql.getStudent();
    let checkLogin = false;

    students.map((student)=>{
        if(vars.id == student.Student_id && vars.password == student.Password){
            console.log('login success!');
            checkLogin =true;
        }
    })

    if(checkLogin) { // login succeed
        req.session.userid = vars.id;
        console.log(vars.id);
        console.log(req.session);
        res.redirect('/select');

    } else {
        console.log('login failed!');
        res.send("<script>alert('로그인에 실패했습니다.'); location.href='/'; </script>");
    }
})

module.exports = router;