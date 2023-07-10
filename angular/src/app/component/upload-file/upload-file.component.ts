import { Component, OnInit } from '@angular/core';
import { my_file } from './upload';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss']
})
export class UploadFileComponent implements OnInit {

  submitted = false;

  constructor() {}

  ngOnInit(): void {
  }

  onSubmit(): any{
    this.submitted = true;
    my_file();
  }
}
