import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { config } from 'dotenv';
config();

import authRoutes from './routes/auth.routes.js';
import notesRoutes from './routes/notes.routes.js';
import tagsRoutes from './routes/tags.routes.js';

const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

app.use("/api",authRoutes);
app.use('/api', notesRoutes);
app.use('/api', tagsRoutes);

export default app;