import { Injectable } from '@angular/core';
import { Observable, throwError, of } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http'
import { Shelter } from '../shared/shelter.model';
import { map, tap, catchError, timeout } from 'rxjs/operators'; // experiment
import { Evacuee } from '../shared/evacuee.model';
import { EvacueeGroup } from '../shared/evacuee-group.model';

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
  
  private serviceUrl = `http://172.16.22.128:5000`;
  private localServiceUrl = 'http://localhost:3000';

  getAvailableShelters(): Observable<Shelter[]> {
    return this.http.get<Shelter[]>(this.serviceUrl + '/api/shelters').pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError('There was an error connecting to the server'); 
        })
      );
  }
  
  addEvacueeGroup(evacueeGroup: EvacueeGroup): Observable<any> {
    return this.http.post<EvacueeGroup>(this.serviceUrl + '/api/evacuee_group', evacueeGroup, httpOptions) 
    .pipe(
      map((data: any) => {
        return data;
      }),
      catchError((error: HttpErrorResponse) => {
        return throwError('An error occurred inserting an evacuee group.'); 
        })
      ); // why not getting catcherror outside of the pipe? 
  }
}