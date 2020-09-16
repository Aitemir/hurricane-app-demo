import { Race } from './race.model';

export interface Evacuee { 
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  sex: string; 
  //race: Race; 
  veteran: any;
  outofstate: any; 
  age: number;
  covidSymptoms: string;
}