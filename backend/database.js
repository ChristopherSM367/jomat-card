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

module.exports = {
    getUserById: (id, callback) => {
        const sql = 'SELECT * FROM users WHERE id = ?';
        db.get(sql, [id], callback);
    },
    getAllUsers: (callback) => {
        const sql = 'SELECT * FROM users';
        db.all(sql, [], callback);
    },
    createUser: (user, callback) => {
        const sql = `
            INSERT INTO users (
                businessName, 
                businessAddress, 
                businessPhone, 
                businessEmail, 
                businessWebsite, 
                businessLogo, 
                facebookLink,
                twitterLink, 
                instagramLink, 
                backgroundLink, 
                linkedinLink, 
                businessJob
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
        db.run(sql, [
            user.businessName, 
            user.businessAddress, 
            user.businessPhone, 
            user.businessEmail, 
            user.businessWebsite, 
            user.businessLogo, 
            user.facebookLink, 
            user.twitterLink, 
            user.instagramLink, 
            user.backgroundLink, 
            user.linkedinLink, 
            user.businessJob
        ], callback);
    },
    updateUser: (id, user, callback) => {
        const sql = `
            UPDATE users SET 
                businessName = ?, 
                businessAddress = ?, 
                businessPhone = ?, 
                businessEmail = ?, 
                businessWebsite = ?, 
                businessLogo = ?, 
                facebookLink = ?, 
                twitterLink = ?, 
                instagramLink = ?, 
                backgroundLink = ?, 
                linkedinLink = ?, 
                businessJob = ? 
            WHERE id = ?
        `;
        db.run(sql, [
            user.businessName, 
            user.businessAddress, 
            user.businessPhone, 
            user.businessEmail, 
            user.businessWebsite, 
            user.businessLogo, 
            user.facebookLink, 
            user.twitterLink, 
            user.instagramLink, 
            user.backgroundLink, 
            user.linkedinLink, 
            user.businessJob, 
            id
        ], callback);
    },
    deleteUser: (id, callback) => {
        const sql = 'DELETE FROM users WHERE id = ?';
        db.run(sql, [id], callback);
    }
};