exports.my_file = function() {
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
  reader.readAsDataURL(file);
  reader.onload = () => resolve(reader.result);
  reader.onerror = error => reject(error);
});