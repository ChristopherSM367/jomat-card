const express = require('express');
const router = express.Router();
const db = require('../database');

// Crear un nuevo usuario
router.post('/', (req, res) => {
    const {
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
    } = req.body;

    const query = `
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

    db.run(query, [
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
    ], function(err) {
        if (err) {
            console.error('Error insertando los datos:', err);
            res.status(500).json({ error: 'Falló al insertar usuario' });
        } else {
            res.status(201).json({ id: this.lastID });
        }
    });
});

// Obtener un usuario por ID
router.get('/:id', (req, res) => {
    const { id } = req.params;

    db.get('SELECT * FROM users WHERE id = ?', [id], (err, row) => {
        if (err) {
            console.error('Error buscando datos:', err);
            res.status(500).json({ error: 'Falló al buscar usuario' });
        } else if (!row) {
            res.status(404).json({ error: 'Usuario no encontrado' });
        } else {
            res.status(200).json(row);
        }
    });
});

// Actualizar un usuario
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const {
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
    } = req.body;

    const query = `
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

    db.run(query, [
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
        businessJob, 
        id
    ], function(err) {
        if (err) {
            console.error('Error actualizando datos:', err);
            res.status(500).json({ error: 'Falló al actualizar usuario' });
        } else if (this.changes === 0) {
            res.status(404).json({ error: 'Usuario no encontrado' });
        } else {
            res.status(200).json({ message: 'Usuario actualizado exitosamente' });
        }
    });
});

// Eliminar un usuario
router.delete('/:id', (req, res) => {
    const { id } = req.params;

    db.run('DELETE FROM users WHERE id = ?', [id], function(err) {
        if (err) {
            console.error('Error eliminando datos:', err);
            res.status(500).json({ error: 'Falló al eliminar usuario' });
        } else if (this.changes === 0) {
            res.status(404).json({ error: 'Usuario no encontrado' });
        } else {
            res.status(200).json({ message: 'Usuario eliminado exitosamente' });
        }
    });
});

module.exports = router;
