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

export default router;
