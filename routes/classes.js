import { Router } from 'express';
const router = Router();

// Get all classes
router.get('/', (req, res) => {
    req.db.all(`SELECT * FROM classes`, (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

// Create a new class
router.post('/', (req, res) => {
    const { name } = req.body;
    req.db.run(`INSERT INTO classes (name) VALUES (?)`,
        [name],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ id: this.lastID });
        }
    );
});

//Edit a class
router.put('/:id', (req, res) => {
    const { name } = req.body;
    req.db.run(`UPDATE classes SET name = ? WHERE id = ?`,
        [name, req.params.id],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ changes: this.changes });
        }
    );
});

//Delete a class
router.delete('/:id', (req, res) => {
    req.db.run(`DELETE FROM classes WHERE id = ?`,
        req.params.id,
        function (err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ changes: this.changes });
        }
    );
});

export default router;
