import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddBookComponent } from './component/add-book/add-book.component';
import { BookDetailComponent } from './component/book-detail/book-detail.component';
import { BooksListComponent } from './component/books-list/books-list.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import { CrudService } from './service/crud.service';
import { UploadFileComponent } from './upload-file/upload-file.component';


@NgModule({
  declarations: [
    AppComponent,
    AddBookComponent,
    BookDetailComponent,
    BooksListComponent,
    UploadFileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [CrudService],
  bootstrap: [AppComponent]
})

export class AppModule { }