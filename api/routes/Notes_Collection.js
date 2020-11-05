const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const Notes = require('../models/Notes');

router.get(('/'), (req, res, next) => {
    Notes.find()
        .exec()
        .then(docs => {
            console.log(docs);
            res.status(200).json(docs);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
});

router.post(('/'), (req, res, next) => {
    const notes = new Notes({
        _id: new mongoose.Types.ObjectId(),
        title: req.body.title,
        text: req.body.text
    });
    notes
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: 'Handling the POST request under Notes_Collection',
                createdNotes: result
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err});
        });
});


router.get(('/:Notes_Collection_Id'), (req, res, next) => {
    const id = req.params.Notes_Collection_Id;
    Notes.findById(id)
        .exec()
        .then(doc => {
            console.log(doc);
            if(doc) {
                res.status(200).json(doc);
            } else {
                res.status(404).json({message: 'There is no such entry exists'});
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
});

router.patch(('/:Notes_Collection_Id'), (req, res, next) => {
    const id = req.params.Notes_Collection_Id;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Notes.update({_id: id}, {$set: updateOps})
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

router.delete(('/:Notes_Collection_Id'), (req, res, next) => {
    const id = req.params.Notes_Collection_Id;
    Notes.remove({_id: id})
        .exec()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                errors: err
            });
        });
});

module.exports = router;

