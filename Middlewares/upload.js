const util = require('util');
const multer = require('multer');
const maxSize = 5 * 1024 * 1024;

global.__basedir = __dirname;

let storage = multer.diskStorage({
    destination: (req,file,cb) =>{
        cb(null, `${__dirname}/files`);
    },
    filename: (req,file,cb) =>{
        cb(null, file.originalname);
    },
});

let uploadFile = multer({
    storage: storage,
    limits: {fieldSize: maxSize},
}).single("file")

let uploadfileMiddleware = util.promisify(uploadFile);
module.exports = uploadfileMiddleware;