const express = require('express');

const router = express.Router();

const db = require('../data/db.js')

router.get('/', (req, res) => {
    db
        .find()
        .then(db => {
            res.status(200).json(db);
        })
        .catch(error => {
            res.status(500).json({ error: "The posts information could not be retrieved." })
        })
})

router.get('/:id', (req, res) => {
    const id = req.params.id;
    db
        .findById(id)
        .then(post => {
            if(post.length === 0) {
                res.status(404).json({ message: "The post with the specified ID does not exist." });
            } else {
                res.status(200).json(post);
            }
        })
        .catch(error => {
            res.status(500).json({ error: "The post information could not be retrieved." });
        })
})

module.exports = router;