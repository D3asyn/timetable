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

export default router;