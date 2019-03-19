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

router.post('/', (req, res) => {
    const { title, contents } = req.body;

    if (!title || !contents) {
        res.status(400).json({ errorMessage: "Please provide title and contents for the post." });
    } else {
    db 
        .insert(req.body)
        .then(post => {
            res.status(201).json(post);
        })
        .catch(error => {
            res.status(500).json({ error: "There was an error while saving the post to the database" });
        })
    }
})

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    db
        .remove(id)
        .then(post => {
            if(post) {
                res.status(204).end();
            } else {
                res.status(404).json({ message: "The post with the specified ID does not exist." });
            }
        })
        .catch(error => {
            res.status(500).json({ error: "The post information could not be retrieved." });
        })
})

router.put('/:id', (req, res) => {
    const id = req.params.id;
    const postInfo = req.body;

    !postInfo.title || !postInfo.contents
    ? res
        .status(400)
        .json({ errorMessage: "Please provide title and contents for the post." })
    : db 
        .update(id, postInfo)
        .then(postBody => {
            if (postBody === 0) {
                res
                .status(404)
                .json({ message: "The post with the specified ID does not exist." });
            }
            db
                .findById(id)
                .then(post => {
                    if (post.length === 0) {
                        res
                        .status(404)
                        .json({ message: "The post with the specified ID could not be located." });
                    } else {
                    res
                    .json(post)
                    }
                })
                .catch(error => {
                    res
                        .status(500)
                        .json({ message: "Error occurred while locating post."})
                })
        })
        .catch (error => {
            res
                .status(500)
                .json({ error: "The post info could not be modified"})
        })

});

module.exports = router;