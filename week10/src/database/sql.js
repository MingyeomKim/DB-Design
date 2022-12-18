import { application } from 'express';
import MySQLStore from 'express-mysql-session';
import mysql from 'mysql2';

export const pool = mysql.createPool(
    process.env.JAWSDB_URL ?? {
    host: "localhost",
    user: "root",
    database: "inha",
    password: "family0831",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit:0,
});

const promisePool = pool.promise();

export const selectSql = {
    getStudent: async () => {
        const [rows] = await promisePool.query(`select * from student`);

        return rows;
    },
    getClasses : async (userid) => { // 현재 사용자에 대한 수강 강의 목록을 가져오는 함수
        const [rows] = await promisePool.query(`select c.id as Id, Name, Number_Of_Participants, Professor 
                                        from class as c, class_has_student as chs 
                                        where chs.student_id = ${userid} and c.id=chs.class_id`);
        return rows;
    }
};

export const deleteSql={
    deleteClass: async(data) => {
        const sql = `delete from class_has_student where class_id="${data.classId}" and Student_id=${data.studentId};`

        await promisePool.query(sql);
    }
};