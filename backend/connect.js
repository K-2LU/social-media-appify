import pg from "pg";
const { Pool } = pg;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "social_appify",
  password: "admin19",
  port: 5432,
});

export default pool;
