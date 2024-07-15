const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'users.db');

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error al abrir la base de datos:', err);
    } else {
        console.log('Conectado a la base de datos');
        db.run(`CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY,
            businessName TEXT NOT NULL,
            businessAddress TEXT NOT NULL,
            businessPhone TEXT NOT NULL,
            businessEmail TEXT NOT NULL,
            businessWebsite TEXT NOT NULL,
            businessLogo TEXT,
            facebookLink TEXT,
            twitterLink TEXT,
            instagramLink TEXT,
            backgroundLink TEXT,
            linkedinLink TEXT,
            businessJob TEXT
        )`, (err) => {
            if (err) {
                console.error('Error creando la tabla:', err);
            }
        });
    }
});

module.exports = db;