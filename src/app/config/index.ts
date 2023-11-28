import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.join((process.cwd(), '.env')) });

console.log(process.cwd());

export default {
  server_port: process.env.PORT,
  db_connect: process.env.MONGO_CONN,
  brcypt_salt: parseInt(process.env.BCRYPT_SALT || '10'),
};
