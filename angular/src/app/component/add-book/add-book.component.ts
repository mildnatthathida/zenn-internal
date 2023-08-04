import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { CrudService } from 'src/app/service/crud.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Book } from 'src/app/service/Service';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss']
})
export class AddBookComponent implements OnInit {
 
  bookForm: FormGroup;
  submitted = false;
   
  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private crudService: CrudService
  ) { 
    this.bookForm = this.formBuilder.group({
      name: [''],
      price: [''],
      description: ['']
    })
  }
 
  ngOnInit() {
  }
 
  onSubmit(): void{
    const data = {
      _id:this.bookForm.value.id,
      name: this.bookForm.value.name,
      price: this.bookForm.value.price,
      description: this.bookForm.value.description
    }
    this.crudService.AddBook(data)
    .subscribe({
      next: (res) => {
        console.log(res)
        console.log('Data added successfully')
        this.submitted = true;
      }
    });
    this.ngZone.run(() =>this.router.navigateByUrl('/books-list'));
    }
  }
 