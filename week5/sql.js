import mysql from 'mysql2';

const pool = mysql.createPool({
    host: 'localhost',
    port: 3306, 
    user: 'root',
    password: 'family0831',
    database: 'inha',
})

const promisePool = pool.promise();

const sql = {
    getEmployee: async () => {
        const results = await promisePool.query(`select * from employee`)
        return results;
    },
    getClub: async () => {
        const results = await promisePool.query(`select * from club`)
        return results;
    }
};

export default sql;