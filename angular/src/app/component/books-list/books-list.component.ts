import { Component, OnInit } from '@angular/core';
import { CrudService } from 'src/app/service/crud.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.scss']
})

export class BooksListComponent implements OnInit {
   
  Books:any = [];
 
  constructor(
    private crudService: CrudService,
    public router : Router
  ) { }
 
  ngOnInit(): void {
    this.GetBooks();
  }

  GetBooks(){
    this.crudService.GetBooks().subscribe(data => {
      this.Books = data;
      console.log(this.Books);
    })
  }
 
  delete(id:any, i:any) {
    console.log(id);
    this.crudService.deleteBook(id).subscribe(() =>{
      return this.Books.splice(i, 1);
    })
  }

  editBook(id : any){
    this.crudService.GetBook(id).subscribe(book => {
      console.log(book)
      this.router.navigate(['/edit-book', id]); // Redirect to the edit book page
    });
  }
 
}