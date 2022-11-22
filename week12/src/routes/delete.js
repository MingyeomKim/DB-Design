import express from "express";
import { deleteSql } from "../database/sql";

const router = express.Router();

router.post('/', async function(req, res) {
    const data = {
        classId : req.body.delBtn,
        studentId : req.cookies.userId,
    }; 
    await deleteSql.deleteClassHasStudent(data);
    res.redirect('/sugang');
})

module.exports = router;