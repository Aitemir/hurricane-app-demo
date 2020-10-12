import { Injectable, Inject } from '@angular/core';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { Shelter } from '../shared/shelter.model';
import { Evacuee } from '../shared/evacuee.model';
import { Address } from '../shared/address.model';
import { State } from '../shared/state.model';
import { Race } from '../shared/race.model';

const ADDRESS_STORAGE_KEY = 'address';
const EVACUEES_STORAGE_KEY = 'evacuees';
const SHELTER_STORAGE_KEY = 'shelter';

@Injectable({
  providedIn: 'root'
})
export class EvacueeService {

  setShelter(shelter: Shelter) {
    this.storeShelter(shelter);
  }

  constructor(@Inject(LOCAL_STORAGE) private storage: StorageService) { 
  }

  public getShelter(): Shelter {
    let shelter = this.storage.get(SHELTER_STORAGE_KEY);
    return shelter;
  }

  public storeShelter(shelter: Shelter): void {  
    this.storage.set(SHELTER_STORAGE_KEY, shelter);
  }

  public getAddress(): Address {
    let address = this.storage.get(ADDRESS_STORAGE_KEY);
    return address;
  }

  public storeAddress(address: Address): void {  
    this.storage.set(ADDRESS_STORAGE_KEY, address);
  }

  public updateMainEvacuee(evacuee: Evacuee): void {
    const evacuees: Evacuee [] = this.getEvacuees();
    evacuees[0] = evacuee;  
    this.storage.set(EVACUEES_STORAGE_KEY, evacuees);
  }

  public storeEvacuees(evacuee: Evacuee): void {  
    const evacuees = this.storage.get(EVACUEES_STORAGE_KEY) || [];
    evacuees.push(evacuee);
    this.storage.set(EVACUEES_STORAGE_KEY, evacuees);
  }

  public showStorage() {
    console.log(this.storage.get(ADDRESS_STORAGE_KEY) || 'LocaL storage is empty');
    console.log(this.storage.get(EVACUEES_STORAGE_KEY) || 'LocaL storage is empty');
  }

  public removeLocalStorageData(){
    this.storage.remove(SHELTER_STORAGE_KEY);
    this.storage.remove(ADDRESS_STORAGE_KEY);
    this.storage.remove(EVACUEES_STORAGE_KEY);
  }

  public getEvacuees(): Evacuee[] {
    let evacuees = this.storage.get(EVACUEES_STORAGE_KEY) || [];
    return evacuees;
  }

  public updateEvacuee(index: number, evacuee: Evacuee): void {
    const evacuees: Evacuee [] = this.getEvacuees();
    for (var i = 0; i < evacuees.length; i++) {
      if(i == index){  
          evacuees[index] = evacuee;  
          break; 
      }
   }
    this.storage.set(EVACUEES_STORAGE_KEY, evacuees);
  }

  public deleteEvacuee(index: number): void {
    const evacuees: Evacuee [] = this.getEvacuees();
    for (var i = 0; i < evacuees.length; i++) {
      if(i == index){ 
        evacuees.splice(index, 1)  
          break;  
      }
   }
    this.storage.set(EVACUEES_STORAGE_KEY, evacuees);
  }

  states: State[] = [
    {value: "AL", name: "Alabama"},
    {value: "AK", name: "Alaska"},
    {value: "AS", name: "American Samoa"},
    {value: "AZ", name: "Arizona"},
    {value: "AR", name: "Arkansas"},
    {value: "CA", name: "California"},
    {value: "CO", name: "Colorado"},
    {value: "CT", name: "Connecticut"},
    {value: "DE", name: "Delaware"},
    {value: "DC", name: "District Of Columbia"},
    {value: "FL", name: "Florida"},
    {value: "GA", name: "Georgia"},
    {value: "GU", name: "Guam"},
    {value: "HI", name: "Hawaii"},
    {value: "ID", name: "Idaho"},
    {value: "IL", name: "Illinois"},
    {value: "IN", name: "Indiana"},
    {value: "IA", name: "Iowa"},
    {value: "KS", name: "Kansas"},
    {value: "KY", name: "Kentucky"},
    {value: "LA", name: "Louisiana"},
    {value: "ME", name: "Maine"},
    {value: "MH", name: "Marshall Islands"},
    {value: "MD", name: "Maryland"},
    {value: "MA", name: "Massachusetts"},
    {value: "MI", name: "Michigan"},
    {value: "MN", name: "Minnesota"},
    {value: "MS", name: "Mississippi"},
    {value: "MO", name: "Missouri"},
    {value: "MT", name: "Montana"},
    {value: "NE", name: "Nebraska"},
    {value: "NV", name: "Nevada"},
    {value: "NH", name: "New Hampshire"},
    {value: "NJ", name: "New Jersey"},
    {value: "NM", name: "New Mexico"},
    {value: "NY", name: "New York"},
    {value: "NC", name: "North Carolina"},
    {value: "ND", name: "North Dakota"},
    {value: "MP", name: "Northern Mariana Islands"},
    {value: "OH", name: "Ohio"},
    {value: "OK", name: "Oklahoma"},
    {value: "OR", name: "Oregon"},
    {value: "PW", name: "Palau"},
    {value: "PA", name: "Pennsylvania"},
    {value: "PR", name: "Puerto Rico"},
    {value: "RI", name: "Rhode Island"},
    {value: "SC", name: "South Carolina"},
    {value: "SD", name: "South Dakota"},
    {value: "TN", name: "Tennessee"},
    {value: "TX", name: "Texas"},
    {value: "UT", name: "Utah"},
    {value: "VT", name: "Vermont"},
    {value: "VI", name: "Virgin Islands"},
    {value: "VA", name: "Virginia"},
    {value: "WA", name: "Washington"},
    {value: "WV", name: "West Virginia"},
    {value: "WI", name: "Wisconsin"},
    {value: "WY", name: "Wyoming"}
  ];

  races: Race[] = [
    {value: 'American Indian or Alaska Native'},
    {value: 'Asian'},
    {value: 'Black or African American'},
    {value: 'Hispanic or Latino'},
    {value: 'Native Hawaiian or Other Pacific Islander'},
    {value: 'White'}
  ];

  getStates(): State[] {
    return this.states;
  }
  getRaces(): Race[] {
    return this.races;
  }

}