import express from 'express';
const router = express.Router();

// Get all teachers
router.get('/', (req, res) => {
    req.db.all(`SELECT * FROM teachers`, (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

// Create a new teacher
router.post('/', (req, res) => {
    const { name } = req.body;
    req.db.run(`INSERT INTO teachers (name) VALUES (?)`,
        [name],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ id: this.lastID });
        }
    );
});

// Edit a teacher
router.put('/:id', (req, res) => {
    const { name } = req.body;
    req.db.run(`UPDATE teachers SET name = ? WHERE id = ?`,
        [name, req.params.id],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ changes: this.changes });
        }
    );
});

// Delete a teacher
router.delete('/:id', (req, res) => {
    req.db.run(`DELETE FROM teachers WHERE id = ?`,
        req.params.id,
        function (err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ changes: this.changes });
        }
    );
});

export default router;
