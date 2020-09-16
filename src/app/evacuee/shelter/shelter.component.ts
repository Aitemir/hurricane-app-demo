import { Component, OnInit, Output, EventEmitter, ErrorHandler } from '@angular/core';
import { Shelter } from 'src/app/shared/shelter.model';
import { HttpClient } from '@angular/common/http';
//import { } from '@agm/core/services/google-maps-types';
//import { google } from '@agm/core/services/google-maps-types';
import { MatDialog } from '@angular/material/dialog';
import { ShelterDialogComponent } from './shelter-dialog/shelter-dialog.component';
import { Router } from '@angular/router';
import { ShelterWarningDialogComponent } from './shelter-warning-dialog/shelter-warning-dialog.component';
import { timeout } from 'rxjs/internal/operators/timeout';
import { ShelterInfoDialogComponent } from './shelter-info-dialog/shelter-info-dialog.component';
import { EvacueeService } from '../evacuee.service';
//import { google } from '@agm/core/services/google-maps-types';
//import * as googleApi from '@agm/core/services/google-maps-types';

@Component({
  selector: 'app-shelter',
  templateUrl: './shelter.component.html',
  styleUrls: ['./shelter.component.scss'] 
})
export class ShelterComponent implements OnInit {
  
  public zoom: number;
  coords: number[];
  showGeolocation = true;
  showShelters = false;
  shelters: Shelter[] = [];
  shelter: Shelter;
  error: string;
  isLoadingResults = true; 
  circleLat = 27.916170;
  circleLng = -82.357592;
  constructor(private evacueeService: EvacueeService,
    private http: HttpClient,
    public dialog: MatDialog,
    public router: Router) { }

  ngOnInit(): void {
    // I have to work on this part! I need to add catch statement and make promises look mor eelengamt. 
    // the promise is uncaught when the shelter list is not available!!!
    this.zoom = 4; 
    this.getAvailableShelters().then(data => this.shelters = data)
    .then(data => this.getLocation()).then(coords => this.coords = coords).catch(error=>console.log(error))
    .catch(error=>console.log(error)) //
    .catch(error=>console.log(error)) //
    .then(data => this.calculatePositionDistances(this.coords[0], this.coords[1]).catch(error=>{console.log(error)})
    );
  }

  getAvailableShelters() {
    const promise = new Promise<Shelter[]>((resolve, reject) => {
      const apiURL = "http://172.16.22.128:5000/api/shelters";
      this.http
        .get<Shelter[]>(apiURL)
        .pipe(timeout(5000)) // timeout for the get request
        .toPromise()
        .then((data: Shelter[]) => {
          console.log('in promise1');
          resolve(data);
          this.isLoadingResults = false;
        }, 
          err => {
            this.error = err.message; 
            reject(err);
          }
        );
    });
    return promise;
  }

  getLocation(): Promise<number[]> {
    return new Promise<number[]>((resolve, reject) => {
      this.getCurrentPosition(coords => {
        resolve([ coords[0], coords[1] ]);
        console.log('in promise2');
        reject({});
      });
    });
  }

  getCurrentPosition(callback: (coords: number[]) => void): void {
    if (navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        var lat = position.coords.latitude;
        var lng = position.coords.longitude;
        this.zoom = 11.5;
        callback([lat,lng])
      }, (error: PositionError)=> {
        this.openShelterWarningDialog(error.message);
        this.showGeolocation = false;
        this.showShelters = true;
        this.coords = [27.9904,-82.3018]
        this.zoom = 9;
        console.log(this.coords);
      }, {
        enableHighAccuracy: true,
        timeout: 6000,
        maximumAge: 0
      });
    } 
  }
// ATTENTION!!!! - https://stackoverflow.com/questions/45081665/cannot-find-module-agm-core comment out import {} and uncomment {google}
  calculatePositionDistances(lat:number, lng:number): Promise<number[]> {
    console.log('in promise3');
    return new Promise<number[]>((resolve,reject) =>{
      try {
      var geoLocationGM = new google.maps.LatLng(lat, lng); //declaring my geolocation
      //var geoLocationGM = <google.maps.LatLng>{};
      //var gmapsObjects: google.maps.LatLng [] = []
      var gmapsObjects: any[] = [];
      //var gmapsObjects = new Array<google.maps.LatLng>();
      //var gmapsObjects: Object [] = [];
      var distances = [];
      for (let i = 0; i < this.shelters.length; i++) {
        gmapsObjects.push(new google.maps.LatLng(this.shelters[i].latitude, this.shelters[i].longitude))
        var distance = google.maps.geometry.spherical.computeDistanceBetween(geoLocationGM, gmapsObjects[i]);
        distances.push(distance);
      }
      var min_value = Math.min(...distances); // potentially has to be deleted
      if (min_value <= 10000) { 
        var index = distances.indexOf(Math.min(...distances)); 
        this.openShelterDialog(index, this.shelters[index].shelterName, min_value)
        this.showShelters = true;
        resolve([index, min_value]) } 
      else {
          throw new Error ('something');
        }
      } catch (error) {
        //alert("There was an error finding the nearest shelter")
        this.openShelterWarningDialog('There was an error finding the nearest shelter');
        reject (error); //?
      }
    })
  }
 
  setShelter(i){
    this.evacueeService.setShelter(this.shelters[i]);
  }

  gmapsLocate(i: number){
    var gmapsSearch = 'https://www.google.com/maps/search/?api=1&query=' + this.shelters[i].latitude + ',' + this.shelters[i].longitude;
    window.open(gmapsSearch);
  }

  openShelterDialog(index: number, shelter_name: string, distance: number){
    const dialogRef = this.dialog.open(ShelterDialogComponent, {
      width: '450px',
      height: '245px',
      data: {index: index, shelter_name: shelter_name, distance: distance}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != -1) {
        this.setShelter(result);
        this.router.navigate(['/evacuee/add-group']);
      }
    }); 
  }

  openShelterWarningDialog(message: string): void {
    const dialogRef = this.dialog.open(ShelterWarningDialogComponent, {
      width: '450px',
      height: '225px',
      data: {message: message}
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }

  openShelterInfoDialog(i: number) {
    const dialogRef = this.dialog.open(ShelterInfoDialogComponent, {
      width: '450px',
      height: '225px',
      data: {name: this.shelters[i].shelterName, 
            address: this.shelters[i].address}
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }
}