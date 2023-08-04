import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UploadService } from 'src/app/service/upload.service';
// import { getBase64 } from './upload';
// import { blobfile } from './Blob';
@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss']
})
export class UploadFileComponent implements OnInit {

  fileToUpload : File | null = null;
  uploadedFile: any;
  submitted = false;

  constructor( private uploadService: UploadService ) {}

  ngOnInit(): void {
  }

  handleFileInput(files: FileList){
    this.fileToUpload = files.item(0);
  }

  uploadFile(){
    if (!this.fileToUpload) {
      console.log('No file selected.');
      return; // Exit the method if no file is selected
    }

    this.uploadService.uploadPdf(this.fileToUpload).subscribe((res) =>{
      console.log('Upload successful : ' , res)
      this.uploadedFile = res.uploadedFile;
    },(err) => {
      console.error('Upload failed:', err);
    })
  }
  onSubmit(): void{
    // const data ={
    //   "title":this.fileForm.value,
    //   "textContent":this.fileForm.value,
    // }

    // this.uploadService.AddFile(data)
    // .subscribe({
    //   next: (res) => {
    //     console.log(res)
    //     console.log('Data added successfully')
    //     this.submitted = true;
    //   }
    // });
    // this.ngZone.run(() =>this.router.navigateByUrl('/upload-file'));

    // // getBase64();

  }
}
