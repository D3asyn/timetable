import express from 'express';
const router = express.Router();

// Get all subjects
router.get('/', (req, res) => {
    req.db.all(`SELECT * FROM subjects`, (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

// Create a new subject
router.post('/', (req, res) => {
    const { name } = req.body;
    req.db.run(`INSERT INTO subjects (name) VALUES (?)`,
        [name],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ id: this.lastID });
        }
    );
});

// Edit a subject
router.put('/:id', (req, res) => {
    const { name } = req.body;
    req.db.run(`UPDATE subjects SET name = ? WHERE id = ?`,
        [name, req.params.id],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ changes: this.changes });
        }
    );
});

// Delete a subject
router.delete('/:id', (req, res) => {
    req.db.run(`DELETE FROM subjects WHERE id = ?`,
        req.params.id,
        function (err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ changes: this.changes });
        }
    );
});

export default router;