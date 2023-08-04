exports. getBase64 = function() {
    console.log('uploadedFile');
    const uploadedFile = document.querySelector('#fileUpload').files[0];
    
    tobase64(uploadedFile)
    .then(res => {
      console.log('Base 64: ' + res);
    })
    .catch(err => {
      console.log(err);
    })
  };

  const tobase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    // reader.readAsText(file,{encoding:"base64"});
    reader.readAsDataURL(file, {encoding: "base64"});
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });

