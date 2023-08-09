const express = require('express')
const app = express();
const Filepdf = require('../model/upload');
const fs = require('fs').promises; 
const router = require('express').Router();
const multer = require('multer');

const upload = multer({ 
  dest: './uploads/',
  limits: { fileSize: 1024 * 1024 * 24}
});

router.post('/upload-file',upload.single('file'),async(req, res) => {
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
  try{
    const data = await Filepdf.find({})
    res.status(200).json(data)
  }catch(err){
    res.status(400).json({
      message: err.message
  })
  } 
})

module.exports = router