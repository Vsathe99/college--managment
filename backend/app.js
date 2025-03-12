import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dbConnect from './db/db.js';
import studentRoute from './routes/student.routes.js';
import teacherRoute from './routes/teacher.routes.js';

dbConnect();

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(cors({origin: '*', credentials: true}));


app.use('/student', studentRoute);
app.use('/teacher', teacherRoute);

export default app;