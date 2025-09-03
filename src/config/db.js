import mysql from "mysql2/promise";

let pool;

if (!global.dbPool) {
  pool = mysql.createPool(process.env.DATABASE_URL);
  global.dbPool = pool; //  prevent multiple pools in Next.js hot reload
} else {
  pool = global.dbPool;
}

export default pool;
