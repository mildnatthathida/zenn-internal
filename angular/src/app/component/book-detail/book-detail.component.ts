import { Component, OnInit, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CrudService } from './../../service/crud.service';
import { FormGroup, FormBuilder } from "@angular/forms";
 
@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.scss']
})
 
export class BookDetailComponent implements OnInit {
 
  updateForm: FormGroup;
   
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private activatedRoute: ActivatedRoute,
    private crudService: CrudService
  ) {
    this.updateForm = this.formBuilder.group({
      name: [''],
      price: [''],
      description: ['']
    })
  }
 
  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');

    this.crudService.GetBook(id).subscribe(book => {
      this.updateForm.patchValue(book);
    })
   }
 
  onUpdate(): any {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.crudService.updateBook(id, this.updateForm.value)
    .subscribe(() => {
      console.log('Data updated successfully!');
      this.router.navigateByUrl('/books-list');
    }, (err) => {
      console.log(err);
    })
  }
 
}