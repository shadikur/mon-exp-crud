import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.join((process.cwd(), '.env')) });

console.log(process.cwd());

export default {
  PORT: process.env.PORT,
  DB_CONN: process.env.MONGO_CONN,
};
