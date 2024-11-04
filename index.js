import sqlite3 from 'sqlite3';
import { config } from 'dotenv';
import express, { json } from 'express';

config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(json());

const db = new sqlite3.Database('./school.db', (err) => {
    if (err) console.error('Error connecting to database:', err);
    else console.log('Connected to SQLite database');
});

// Middleware to pass the database connection
app.use((req, res, next) => {
    req.db = db;
    next();
});

// Import routes
import studentRoutes from './routes/students.js'
import teacherRoutes from './routes/teachers.js'
import subjectRoutes from './routes/subjects.js'
import classRoutes from './routes/classes.js'
import timetableRoutes from './routes/timetable.js'

// Use routes
app.use('/api/students', studentRoutes);
app.use('/api/teachers', teacherRoutes);
app.use('/api/subjects', subjectRoutes);
app.use('/api/classes', classRoutes);
app.use('/api/timetable', timetableRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});