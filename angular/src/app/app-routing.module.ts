import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddBookComponent } from './component/add-book/add-book.component';
import { BookDetailComponent } from './component/book-detail/book-detail.component';
import { BooksListComponent } from './component/books-list/books-list.component';
import { UploadFileComponent } from './upload-file/upload-file.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'add-book'},
  {path: 'books-list', component: BooksListComponent},
  {path: 'add-book', component: AddBookComponent},
  {path: 'edit-book/:id', component: BookDetailComponent},
  {path: 'upload-file', component: UploadFileComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
