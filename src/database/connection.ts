import pg__ from "pg";
import dotenv from "dotenv";
import { readFileSync } from "fs";
const { Client } = pg__;

dotenv.config();

const { DB_USER, DB_HOST, DB_NAME, DB_PASS, DB_PORT } = process.env;

const connection = new Client({
  // connectionString: `postgres://candidate:<пароль пользователя>@rc1b-r21uoagjy1t7k77h.mdb.yandexcloud.net:6432/db1`,
  user: DB_USER,
  password: DB_PASS,
  host: DB_HOST ?? "localhost",
  database: DB_NAME,
  port: parseInt(DB_PORT ?? "5432", 10),
  ssl: {
    rejectUnauthorized: true,
    ca: readFileSync("./src/postgres/CA.pem").toString(),
  },
});

export default connection;
