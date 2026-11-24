
const path = require("path");
const fs = require("fs");
const multer = require("multer");
const {randomUUID} = require("crypto");



/// create upload folder 

const uploadPath =path.join(__dirname , ".." , "uploads");


if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath , {recursive : true});
}
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadPath);
  },

  filname : (req , file , cb ) => {
    const extension = path.extension(file.original.name);
    cb(null , randomUUID() + extension);
  }

});


const upload = multer({
    storage : storage 
});

module.exports = upload;



