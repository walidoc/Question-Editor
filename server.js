const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')


const columnsRouter = require('./routes/api/columns')
const rowsRouter = require('./routes/api/rows')

const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use('/uploads', express.static('uploads'))

// DB config
const db = require('./config/keys').mongoURI
mongoose.connect(db, { useNewUrlParser: true })
    .then(() => console.log('MongoDB connected...'))
    .catch((err) => console.log(err))

const port = process.env.PORT || 5000

// Use Routes
app.use('/api/columns', columnsRouter)
app.use('/api/rows', rowsRouter)

app.listen(port, () => console.log(`Server running on port ${port}`))