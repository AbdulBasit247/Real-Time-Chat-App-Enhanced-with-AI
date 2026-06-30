import express from 'express';
import connectDB from './db/db.js';
import userRoutes from './routes/user.routes.js';
import projectRoutes from './routes/project.routes.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';

connectDB();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true,
}));
app.use(cookieParser());

app.use('/api/users', userRoutes);
app.use('/api/projects', projectRoutes);

// app.get('/', (req, res) => {
//     res.send('Hello World!');
// });

export default app;