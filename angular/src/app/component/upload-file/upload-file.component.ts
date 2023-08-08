import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UploadService } from 'src/app/service/upload.service';
// import { getBase64 } from './upload';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss']
})
export class UploadFileComponent implements OnInit {

  submitted = false;
  uploadMessage: string = '';

  constructor( 
    private uploadService: UploadService,
    public formBuilder: FormBuilder, 
  ) {}

  ngOnInit(): void {
  }

  onSubmit(): void{
    const fileInput = document.getElementById('file') as HTMLInputElement;
    const file = fileInput?.files?.[0];

    if(file) {
      this.uploadFile(file);
    } else {
      this.uploadMessage = 'Please select a file to upload.';
    }
  }

  uploadFile(file: File): void {
    setTimeout(() => {
      this.uploadMessage = `File "${file.name}" uploaded successfully.`;
      console.log('Uploaded Successfully.')

      this.uploadService.uploadFile(file).subscribe({
        next: (res) => {
          console.log(res)
          this.submitted = true;
        }
      })
    }, 2000);
  }

}
