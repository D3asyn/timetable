import { Router } from 'express';
const router = Router();

// Get all timetable entries
router.get('/', (req, res) => {
    req.db.all(`SELECT timetable.id, timetable.date, timetable.time, 
                subjects.name AS subject_name, teachers.name AS teacher_name, 
                classes.name AS class_name 
                FROM timetable
                JOIN subjects ON timetable.subject_id = subjects.id
                JOIN teachers ON timetable.teacher_id = teachers.id
                JOIN classes ON timetable.class_id = classes.id`,
        (err, rows) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json(rows);
        });
});

// Create a new timetable entry
router.post('/', (req, res) => {
    const { date, time, subject_id, teacher_id, class_id } = req.body;
    req.db.run(`INSERT INTO timetable (date, time, subject_id, teacher_id, class_id) VALUES (?, ?, ?, ?, ?)`,
        [date, time, subject_id, teacher_id, class_id],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ id: this.lastID });
        }
    );
});

export default router;
