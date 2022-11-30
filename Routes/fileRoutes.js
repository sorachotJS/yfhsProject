//importing modules
const express = require("express");
const router = express.Router();
const uploadFile = require("../Middlewares/upload");
const fs = require("fs");

// upload file
router.post("/uploadPdf", async (req, res, next) => {
    try {
      await uploadFile(req, res);
       console.log(req.file);
      if (req.file == undefined) {
        return res.status(400).send({ message: "Please upload a file!" });
      }
  
      res.status(200).send({
        message: "Uploaded the file successfully: " + req.file.originalname,
      });
    } catch (err) {
      if (err.code == "LIMIT_FILE_SIZE") {
        return res.status(500).send({
          message: "File size cannot be larger than 5MB!",
        });
      }
  
      res.status(500).send({
        message: `Could not upload the file: ${req.file.originalname}. ${err}`,
      });
    }
  });

  router.get("/files/:name", async (req, res, next) => {
    const fileName = req.params.name;
    const directoryPath = "./Middlewares/files/";
  console.log(directoryPath + fileName);
    fs.readFile(directoryPath + fileName, function (err, data) {
      res.contentType("application/pdf");
      res.send(data);
    });
  });

module.exports = router;
