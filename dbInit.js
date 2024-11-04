import sqlite3 from 'sqlite3';

// Connect to the database
const db = new sqlite3.Database('./school.db', (err) => {
    if (err) {
        console.error('Error opening database:', err);
        return;
    }
    console.log('Database initialized successfully');

    db.serialize(() => {
        // Create teachers table
        db.run(`CREATE TABLE IF NOT EXISTS teachers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL
    )`, (err) => {
            if (err) console.error("Error creating 'teachers' table:", err);
            else console.log("'teachers' table created or already exists.");
        });

        // Create subjects table
        db.run(`CREATE TABLE IF NOT EXISTS subjects (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL UNIQUE
    )`, (err) => {
            if (err) console.error("Error creating 'subjects' table:", err);
            else console.log("'subjects' table created or already exists.");
        });

        // Create classes table
        db.run(`CREATE TABLE IF NOT EXISTS classes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL UNIQUE
    )`, (err) => {
            if (err) console.error("Error creating 'classes' table:", err);
            else console.log("'classes' table created or already exists.");
        });

        // Create students table
        db.run(`CREATE TABLE IF NOT EXISTS students (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      class_id INTEGER,
      FOREIGN KEY (class_id) REFERENCES classes(id)
    )`, (err) => {
            if (err) console.error("Error creating 'students' table:", err);
            else console.log("'students' table created or already exists.");
        });

        // Create timetable table
        db.run(`CREATE TABLE IF NOT EXISTS timetable (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      date DATE NOT NULL,
      time TIME NOT NULL,
      subject_id INTEGER,
      teacher_id INTEGER,
      class_id INTEGER,
      FOREIGN KEY (subject_id) REFERENCES subjects(id),
      FOREIGN KEY (teacher_id) REFERENCES teachers(id),
      FOREIGN KEY (class_id) REFERENCES classes(id)
    )`, (err) => {
            if (err) console.error("Error creating 'timetable' table:", err);
            else console.log("'timetable' table created or already exists.");
        });
    });

    db.close((err) => {
        if (err) console.error('Error closing the database:', err);
        else console.log('Database setup complete and connection closed.');
    });
});
