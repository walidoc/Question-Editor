const multer = require('multer')


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        cb(null, new Date().getTime() + '-' + file.originalname)
    }
});  

const upload = multer({ storage, limits: {
    fileSize: 1024 * 1024 * 5
}})

module.exports = upload