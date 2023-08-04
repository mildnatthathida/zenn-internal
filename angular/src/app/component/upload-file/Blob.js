
// exports.blobfile = function() {
//     console.log('uploadedFile => Blob');
//     const uploadedFile = document.querySelector('#blobFile').files[0];
//     // const base64String = reader.readFile(uploadedFile, {encoding: "base64"})
//     // Creating a new blob  
//     // Hostname and port of the local server
//     fetch('http://localhost:8000/api/upload-file', {
//         method:'POST',
//         headers:{'Content-Type':'application/json '},
//         body:uploadedFile
//     })
//     readFile(uploadedFile)

//     function readFile(blob) {
//         const reader = new FileReader();

//         reader.readAsDataURL(blob);
//         // reader.readAsText(blob);

//         reader.addEventListener('load', () => {
//             const res = reader.result;
//             console.log(res);
//         })
//     }
// }

// const toBase64 = (file) => new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.readAsText(file);
//     reader.onload = () => resolve(reader.result);
//     reader.onerror = (error) => reject(error);
// });
// exports.blobfile = async function() {
//     console.log('uploadedFile');
//    const file = document.querySelector('#blobFile').files[0];
//    toBase64(file)
//    .then((res) => console.log(res))
//     .catch((err) => ("error : ",err));
// //    await axios.post("http://localhost:8000/upload-file", {fileData});
// }

// router.post("/schedulePDF", isLoggedin, isAdmin, async(req,res)=>{ 
//     const schedulePDF = new SchedulePDFModel({ myFile : req.file });
//     console.log(schedulePDF, req.file.file); 
//     await schedulePDF.save(); 
//     req.flash('success', 'schedulePDF uploaded!'); 
//     res.redirect('/dash'); 
// });

// router.post("/schedulePDF", isLoggedin, isAdmin, async(req,res)=>{ 
//     console.log(req.files.file); 
// });