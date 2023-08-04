import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { response } from 'express';
import { Book } from 'src/app/service/Service';
import { CrudService } from 'src/app/service/crud.service';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.scss']
})

export class BooksListComponent implements OnInit {
   
  Books:any = [];
 
  constructor(private crudService: CrudService, private fb:FormBuilder) { 
    
  }
 
  ngOnInit(): void {
    // this.crudService.GetBooks().subscribe((data) => {
    //   this.Books = data;
    // })
  }

  GetBooks(){
    this.crudService.GetBooks().subscribe(data => {
      for(const d of (data as any)){
        this.Books.get({
          name: d.name,
          price: d.price,
          description: d.description
        });
      }
      console.log(this.Books);
    })
  }
 
  delete(id:any, i:any) {
    console.log(id);
    this.crudService.deleteBook(id,i).subscribe(res => {
      return this.Books.push(res);
    })
    // if(window.confirm('Do you want to go ahead?')) {
    //   this.crudService.deleteBook(id).subscribe((res) => {
    //     this.Books.splice(i, 1);
    //   })
    // }
  }
 
}