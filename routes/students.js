import { Router } from 'express';
const router = Router();

// Get all students
router.get('/', (req, res) => {
    req.db.all(`SELECT * FROM students`, (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

// Create a new student
router.post('/', (req, res) => {
    const { name, class_id } = req.body;
    req.db.run(`INSERT INTO students (name, class_id) VALUES (?, ?)`,
        [name, class_id],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ id: this.lastID });
        }
    );
});

// Edit a student
router.put('/:id', (req, res) => {
    const { name, class_id } = req.body;
    req.db.run(`UPDATE students SET name = ?, class_id = ? WHERE id = ?`,
        [name, class_id, req.params.id],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ changes: this.changes });
        }
    );
});

// Delete a student
router.delete('/:id', (req, res) => {
    req.db.run(`DELETE FROM students WHERE id = ?`,
        req.params.id,
        function (err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ changes: this.changes });
        }
    );
});

export default router;
