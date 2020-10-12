import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http'
import { Shelter } from '../shared/shelter.model';
import { catchError } from 'rxjs/operators'; // experiment

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json' 
  })
};

@Injectable({
  providedIn: 'root'
})
export class EvacueeHttpService {

  constructor(private http: HttpClient) { }
  
  private serviceUrl = 'http://localhost:3000';

  getAvailableShelters(): Observable<Shelter[]> {
    return this.http.get<Shelter[]>(this.serviceUrl + '/api/shelters').pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError('There was an error connecting to the server'); 
        })
      );
  }
}