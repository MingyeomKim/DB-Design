import express from "express";
import { selectSql,deleteSql } from "../database/sql";

const router = express.Router();

router.get('/',async(req,res)=>{
    const classes = await selectSql.getClasses(req.session.userid);
    res.render('delete',{
        title:"수강 취소 기능",
        classes
    })
});

router.post('/',async(req,res)=>{
    const data = {
        classId: req.body.delBtn,
        studentId: req.session.userid,
    };

    await deleteSql.deleteClass(data);

    res.redirect('/delete');
})

module.exports = router;