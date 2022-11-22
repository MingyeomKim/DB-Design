import mysql from "mysql2";

// 데이터베이스 연결
const pool = mysql.createPool(
  process.env.JAWSDB_URL ?? {
    host: 'localhost',
    user: 'root',
    database: 'inha',
    password: 'family0831',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  }
);

// async / await 사용
const promisePool = pool.promise();

// selec query
export const selectSql = {
  getUsers: async () => {
    const [rows] = await promisePool.query(`select * from student`);

    return rows
  },
  getUserInfo : async(studentId) => {
    const [rows] = await promisePool.query(`select student_id, s.name, d.name as major \ 
                                            from student as s, department as d \ 
                                            where s.student_id=${studentId} and s.major=d.id`);

    return rows;
  },
  // 이미 수강 중인 과목 제외하고 출력
  getClass: async(studentId) => {
    const [rows] = await promisePool.query(`select *, (number_of_participants - current) as extra_seat \ 
                                          from class, (select count(*) as current from class_has_student) as cnt_class \ 
                                          where class.id not in (select class_id from class as c \ 
                                                                inner join class_has_student as chs \ 
                                                                on chs.class_Id=c.Id \ 
                                                                where chs.student_Id=${studentId});`);
    
    return rows;
  },
  getCurrentClass : async(studentId) => {
    const [rows] = await promisePool.query(`select * from class as c \ 
                                            inner join class_has_student as chs \ 
                                            on chs.class_Id=c.Id where student_Id=${studentId}`);
    return rows;
  },
}

// insert query
export const insertSql = {
  insertClassHasStudent : async(data) => {
    const sql = `insert into class_has_student (class_id, student_id) values ("${data.classId}", ${data.studentId});`;
    
    await promisePool.query(sql);
  }
}

// delete query 
export const deleteSql = {
  deleteClassHasStudent : async(data) => {
    const sql = `delete from class_has_student where class_id='${data.classId}' and student_id=${data.studentId};`;

    await promisePool.query(sql);
  }
}