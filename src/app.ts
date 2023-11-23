import express, { Request, Response } from 'express';
import cors from 'cors';
const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// All routes
app.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'Welcome to User Management API',
  });
});

export default app;
