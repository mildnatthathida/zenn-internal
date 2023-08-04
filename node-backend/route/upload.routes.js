const express = require('express')
const app = express();
const Filepdf = require('../model/upload');
const fs = require('fs').promises; 
const router = require('express').Router();
const PDFParser = require('pdf-parse');
const base64 = require('base-64');
const path = require("path")
const multer = require('multer');
const { write } = require('fs');

const upload = multer({ 
  dest: './uploads/',
  limits: { fileSize: 1024 * 1024 * 24}
});

router.post('/upload-file',upload.single('file'),async(req, res) => {
  console.log('api//upload-file-test upload.routes');
  // console.log(req.file);
  const pdfBlob = req.file.path;
  try{
      const pdfdata = await fs.readFile(pdfBlob);
      const base64Data =pdfdata.toString('base64');

      const newPdf = new Filepdf({ 
        title: req.file.originalname,
        contentType: 'application/pdf',
        textContent: base64Data,
      })
      await newPdf.save()
      res.status(201).json({
        message:"File uploaded Successfully",
        uploadedFile:{
          _id : newPdf._id,
          name : newPdf.title,
          contentText : newPdf.textContent,
        }
      })
      console.log('File uploaded Successfully')
      fs.unlink(pdfBlob);
  }catch(err){
      res.status(400).json({
        message: err.message
    })
  }
})
router.get('/upload-file', async (req, res) => {
  console.log('GET Download api/upload-file');

  // const filename = req.params.title;
  // const filePath = path.join(__dirname, '../uploads', filename)
  try{
    // res.download(filePath, (err) => {
    //   if(err){
    //     console.error('Error downloading file:', err);
    //     return res.status(500).json({message: 'Error downloading file'})
    //   }
    // })
    const data = await Filepdf.find({})
    res.status(200).json(data)
  }catch(err){
    res.status(400).json({
      message: err.message
  })
  } 
})

module.exports = router