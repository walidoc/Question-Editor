const express = require('express')
const router = express.Router()
const upload = require('../../config/multer')


// Column Model
const Column = require('../../models/column')

router.get('/', (req, res) => {
    Column.find()
        .sort({date: 1})
        .then(columns => res.json(columns))
        .catch(error => res.status(422).send(
            {success: false, message: 'Oops something went wrong while trying to fetch columns data', error}))
})

router.post('/', (req, res) => {
    const { label, val, idx } = req.body
    const newCol = new Column({
        label,
        val,
        idx
    })
    newCol.save()
        .then(col => res.json(col))
        .catch(error => res.status(422).send(
            {success: false, message: 'Oops something went wrong while trying to save new column', error}))
})

// update one column
router.post('/:id', (req, res) => {
    const { id } = req.params
    Column.findByIdAndUpdate(id, {$set: req.body}, { new: true })
        .then(column => res.json(column))
        .catch(error => res.status(422).send(
            {success: false, message: 'Oops something went wrong while trying to modify column', error}))
})

// add photo
router.post('/img/:id', upload.single('img'), (req, res) => {
    console.log(req.file)
    const { id } = req.params
    let imgUrl = req.protocol + '://' + req.get('host') + '/' + req.file.path
    Column.findByIdAndUpdate(id, {$set: {img: imgUrl}}, { new: true })
        .then(column => res.json(column))
        .catch(error => res.status(422).send(
            {success: false, message: 'Oops something went wrong while trying to add an image', error}))
})

router.delete('/:id', (req, res) => {
    const { id } = req.params
    Column.findById(id)
        .then(col => col.remove()
                    .then(() => res.json({success: true}))
                    .catch(error => res.status(422).send(
                        {success: false, message: 'Oops something went wrong while trying to remove a column', error})
                    ))
        .catch(error => res.status(422).send(
            {success: false, message: 'Oops something went wrong while trying to find a column', error}))
})

module.exports = router