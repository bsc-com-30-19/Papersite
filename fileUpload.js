const multer = require("multer");
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "./Papers");
  },
  filename: function (req, file, cb) {
    return cb(null, Date.now() + "-" + "Han" + path.extname(file.originalname));
  },
}); 

const upload = multer({storage : storage} );

module.exports = upload;