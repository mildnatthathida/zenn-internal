import { Injectable, NgZone } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Book } from './Book';
import { FormBuilder, Validators } from '@angular/forms';

// const baseUrl = 'http://localhost:8000/api/books';

@Injectable({
  providedIn: 'root'
})

export class CrudService {
 
  // Node/Express API
  REST_API: string = 'http://localhost:8000/api';
 
  // Http Header
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
 
  constructor(private httpClient: HttpClient) { }
 
  // Add
  AddBook(data: Book): Observable<Book> {
    let API_URL = `${this.REST_API}/add-book`;
    return this.httpClient.post<Book>(API_URL, data)
      .pipe(
        catchError(this.handleError)
      )
  }
 
  // Get all objects
  GetBooks(): Observable<any>{
    return this.httpClient.get<Book[]>(`${this.REST_API}/books-list`)
    .pipe(map((res: any) => {
      return res || {
        message: "No books found"
      }
    }),
    catchError(this.handleError)
  )
  }
 
  // Get single object
  GetBook(id:any): Observable<any> {
    let API_URL = `${this.REST_API}/read-book/${id}`;
    return this.httpClient.get(API_URL, { headers: this.httpHeaders })
      .pipe(map((res: any) => {
          return res || {}
        }),
        catchError(this.handleError)
      )
  }
 
  // Update
  updateBook(id:any, book:Book): Observable<Book> {
    let API_URL = `${this.REST_API}/update-book/${id}`;
    return this.httpClient.put<Book>(API_URL,book,{ headers: this.httpHeaders })
      .pipe(
        catchError(this.handleError)
      )
  }
 
  // Delete
  deleteBook(id:any, book:Book): Observable<Book> {
    let API_URL = `${this.REST_API}/delete-book/${id}`;
    return this.httpClient.delete<Book>(API_URL, { headers: this.httpHeaders}).pipe(
        catchError(this.handleError)
      )
  }
 
 
  // Error 
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Handle client error
      errorMessage = error.error.message;
    } else {
      // Handle server error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    // console.log(errorMessage);
    return throwError(errorMessage);
  }
 
}