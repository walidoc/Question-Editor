const express = require('express')
const router = express.Router()
const upload = require('../../config/multer')

// Row Model
const Row = require('../../models/row')

router.get('/', (req, res) => {
    Row.find()
        .sort({date: 1})
        .then(rows => res.json(rows))
        .catch(error => res.status(422).send(
            {success: false, message: 'Oops something went wrong while trying to fetch rows data', error}))
})

router.post('/', (req, res) => {
    const { label, idx } = req.body
    const newRow = new Row({
        label,
        idx
    })
    newRow.save()
        .then(row => res.json(row))
        .catch(error => res.status(422).send(
            {success: false, message: 'Oops something went wrong while trying to save a new row', error}))
})

// update a set of rows
router.put('/', (req, res) => {
    Row.update(req.body, {val: ''}, {multi: true})
        .then(result => res.json(result), err => res.send(err))
        .catch(error => res.status(422).send(
            {success: false, message: 'Oops something went wrong while trying to update some rows', error}))
})

// update one row
router.post('/:id', (req, res) => {
    const { id } = req.params
    Row.findByIdAndUpdate(id, {$set: req.body}, { new: true })
        .then(row => res.json(row))
        .catch(error => res.status(422).send(
            {success: false, message: 'Oops something went wrong while trying to modify row', error}))
})

// add photo
router.post('/img/:id', upload.single('img'), (req, res) => {
    const { id } = req.params
    let imgUrl = req.protocol + '://' + req.get('host') + '/' + req.file.path
    Row.findByIdAndUpdate(id, {$set: {img: imgUrl}}, { new: true })
        .then(row => res.json(row))
        .catch(error => res.status(422).send(
            {success: false, message: 'Oops something went wrong while trying to add an image', error}))
})

router.delete('/:id', (req, res) => {
    const { id } = req.params
    Row.findById(id)
        .then(row => row.remove()
                    .then(() => res.json({success: true}))
                    .catch(error => res.status(422).send(
                        {success: false, message: 'Oops something went wrong while trying to remove a row', error})
                    ))
        .catch(error => res.status(422).send(
            {success: false, message: 'Oops something went wrong while trying to find a row', error}))
})

module.exports = router