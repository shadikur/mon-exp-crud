import { Schema, model, connect } from 'mongoose';
import app from './app';
import config from './app/config';

async function run() {
  // Connect to MongoDB
  await connect(config.db_connect as string);

  try {
    app.listen(config.server_port, () => {
      console.log(
        `User management app listening on port ${config.server_port}`,
      );
    });
  } catch (error) {
    console.log(error);
  }
}

run();
