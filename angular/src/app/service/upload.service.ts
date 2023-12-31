import { HttpClient, HttpRequest, HttpEvent, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
// import { File } from './Service';

@Injectable({
  providedIn: 'root'
})

export class UploadService {
   // Node/Express API
   REST_API: string = 'http://localhost:8000/api';
 
   // Http Header
   httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
  
   constructor(private httpClient: HttpClient) { }
   
  // Add

  uploadFile(file: File): Observable<any>{
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    let API_URL = `${this.REST_API}/upload-file`;

    const req = new HttpRequest('POST', API_URL , formData, {
      reportProgress: true,
    });
    return this.httpClient.request(req);
  }
 
  // Get all objects
  GetFiles(): Observable<any>{
    return this.httpClient.get<File[]>(`${this.REST_API}/upload-file`)
    .pipe(map((res: any) => {
      return res || {
        message: "No files found"
      }
    }),
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