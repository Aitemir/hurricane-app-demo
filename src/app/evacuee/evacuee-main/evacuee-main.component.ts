import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppComponent } from 'src/app/app.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Evacuee } from 'src/app/shared/evacuee.model';
import { Address } from 'src/app/shared/address.model';
import { EvacueeGroup } from 'src/app/shared/evacuee-group.model';
import { EvacueeService } from '../evacuee.service';
import { EvacueeHttpService } from '../evacuee-http.service';
import { Shelter } from 'src/app/shared/shelter.model';
import { MatDialog } from '@angular/material/dialog';
import { EvacueeMainDialogComponent } from './evacuee-main-dialog/evacuee-main-dialog.component';
import { EvacueeMainWarningDialogComponent } from './evacuee-main-warning-dialog/evacuee-main-warning-dialog.component';
import { EvacueeMainQuestionDialogComponent } from './evacuee-main-question-dialog/evacuee-main-question-dialog.component';
import { MatStepper } from '@angular/material/stepper';
import { EvacueeSummaryComponent } from '../evacuee-summary/evacuee-summary.component';

@Component({
  selector: 'app-evacuee-main',
  templateUrl: './evacuee-main.component.html',
  styleUrls: ['./evacuee-main.component.scss']
})
export class EvacueeMainComponent implements OnInit {

  constructor(private evacueeService: EvacueeService, 
    private evacueeHttpService: EvacueeHttpService,
    private formBuilder: FormBuilder, 
    public appComp: AppComponent, 
    private _snackBar: MatSnackBar,
    public dialog: MatDialog) { }

  shelters: Shelter[] = [];
  addressFormGroup: FormGroup;
  evacueeGroup: EvacueeGroup;
  message: string; 
  evacueeCounter: number = 1; 
  evacuee: Evacuee;
  shelter: Shelter;
  address: Address;
  evacueeList: Evacuee[] = []; 
  evacueeChangeIndex;
  validatedEvacueeList: Evacuee[] = [];
  //races = this.evacueeService.getRaces();
  states = this.evacueeService.getStates();

  ngOnInit() { 

    //this.evacueeService.removeLocalStorageData();
    if (this.evacueeService.getEvacuees()[0] != undefined) {this.mainUserPlaceholder = this.evacueeService.getEvacuees()[0]}

    if (this.evacueeService.getAddress() == undefined) {
      this.address = <Address>{};
      this.addressFormGroup = this.formBuilder.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', Validators.email],
        phone: [null],
        sex: ['', Validators.required],
        //race: ['', Validators.required],
        veteran:[false],
        outofstate:[false],
        age:['', Validators.compose([Validators.min(1 ), Validators.max(110)])],
        street: ['', Validators.required],
        city: ['', Validators.required],
        state: ['', Validators.required],
        zip: ['', Validators.required]
      });
    } else {
      this.evacuee = this.evacueeService.getEvacuees()[0];
      this.address = this.evacueeService.getAddress(); 
      this.addressFormGroup = this.formBuilder.group({
        firstName: [this.evacuee.firstName, Validators.required],
        lastName: [this.evacuee.lastName, Validators.required],
        email: [this.evacuee.email, Validators.email],
        phone: [this.evacuee.phone],
        sex: [this.evacuee.sex, Validators.required],
        //race: [this.evacuee.race, Validators.required],
        veteran: [this.evacuee.veteran],
        outofstate: [this.evacuee.outofstate],
        age:[this.evacuee.age, Validators.compose([Validators.min(1), Validators.max(110)])],
        street: [this.address.street, Validators.required],
        city: [this.address.city, Validators.required],
        state: [this.address.state, Validators.required],
        zip: [this.address.zip, Validators.required]
      });
      this.addressFormGroup.markAsPristine();;
      this.updatePersonalInfoAddressButtonHidden = false;
      this.startGroupButtonHidden = true;
      this.submitButtonHidden = true;
      this.saveButtonHidden = false;
    }

    this.evacueeInfoFormGroup = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.email],
      phone: [null],
      sex: ['', Validators.required],
      //race: ['', Validators.required],
      veteran:[false],
      outofstate:[false],
      age:['', Validators.compose([Validators.min(1 ), Validators.max(110)])] 
    });

    this.shelter = <Shelter>{};
    try {
      let shelter = this.evacueeService.getShelter();
      this.shelter.shelterId = shelter.shelterId
      this.shelter.shelterName = shelter.shelterName;
    }
    catch {
      this.openWarningDialog('It looks like you have not chosen your shelter. Please go back and select one from the menu');
    }
    this.evacueeGroup = <EvacueeGroup>{}
    this.evacueeList = this.evacueeService.getEvacuees();
    this.loadData(0, this.pageSize);
    this.evacueeService.showStorage();
  }

  @ViewChild('stepper') stepper: MatStepper;
  
  pageIndex = 0;
  pageSize = 10;
  pageSizeOptions = [1,2,5,10];

  editButtonHidden = false;
  deleteButtonHidden = false;
  cancelButtonHidden = true;
  addButtonHidden = false;
  submitButtonHidden = false;
  updateButtonHidden = true;
  editTitle = false;
  startGroupButtonHidden = false;
  updatePersonalInfoAddressButtonHidden = true;
  addFormButtonHidden = true;
  addFormHidden = false;
  saveButtonHidden = true;
  mainUserPlaceholder: Evacuee = <Evacuee>{};
  
  evacueeInfoFormGroup: FormGroup;

  displayedColumns: string[] = ['firstName', 'lastName', 'age', 'sex', 
  'veteran', 'outofstate', 'email', 'phone'];
  dataSource: MatTableDataSource<object>;

  loadData(pageIndex, pageSize)
  {
    this.dataSource = new MatTableDataSource<object>(this.evacueeList.slice(pageIndex, pageIndex + pageSize));
  }
 
  // The get functions have same names as formcontrols, but technically are different
  get firstName(): any { return this.evacueeInfoFormGroup.get('firstName')}
  get lastName(): any { return this.evacueeInfoFormGroup.get('lastName')}
  get email(): any { return this.evacueeInfoFormGroup.get('email')}
  get phone(): any { return this.evacueeInfoFormGroup.get('phone')}
  get sex(): any { return this.evacueeInfoFormGroup.get('sex')}
  //get race(): any { return this.evacueeInfoFormGroup.get('race')}
  get veteran(): any { return this.evacueeInfoFormGroup.get('veteran')}
  get outofstate(): any { return this.evacueeInfoFormGroup.get('outofstate')}
  get age(): any { return this.evacueeInfoFormGroup.get('age')}

  addMainEvacuee() {
    var evacuee = <Evacuee>{};
    evacuee.firstName = this.addressFormGroup.controls.firstName.value;
    evacuee.lastName = this.addressFormGroup.controls.lastName.value;
    evacuee.email = this.addressFormGroup.controls.email.value;
    evacuee.phone = this.addressFormGroup.controls.phone.value;
    evacuee.sex = this.addressFormGroup.controls.sex.value;
    //evacuee.race = this.addressFormGroup.controls.race.value;
    evacuee.veteran = this.addressFormGroup.controls.veteran.value;
    evacuee.outofstate = this.addressFormGroup.controls.outofstate.value;
    evacuee.age = this.addressFormGroup.controls.age.value;
    this.evacueeService.storeEvacuees(evacuee);
    this.evacueeList[0] = this.evacueeService.getEvacuees()[0];
    this.mainUserPlaceholder = this.evacueeService.getEvacuees()[0];
    this.addAddress();
    this.saveGroup();
    this.addressFormGroup.markAsPristine();;
    this.updatePersonalInfoAddressButtonHidden = false;
    this.startGroupButtonHidden = true;
    this.submitButtonHidden = true;
    this.saveButtonHidden = false;
  }

  updateMainEvacuee() {
    var evacuee = <Evacuee>{};
    evacuee.firstName = this.addressFormGroup.controls.firstName.value;
    evacuee.lastName = this.addressFormGroup.controls.lastName.value;
    evacuee.email = this.addressFormGroup.controls.email.value;
    evacuee.phone = this.addressFormGroup.controls.phone.value;
    evacuee.sex = this.addressFormGroup.controls.sex.value;
    //evacuee.race = this.addressFormGroup.controls.race.value;
    evacuee.veteran = this.addressFormGroup.controls.veteran.value;
    evacuee.outofstate = this.addressFormGroup.controls.outofstate.value;
    evacuee.age = this.addressFormGroup.controls.age.value;
    this.evacueeService.updateMainEvacuee(evacuee);
    this.evacueeList[0] = this.evacueeService.getEvacuees()[0];
    this.mainUserPlaceholder = this.evacueeService.getEvacuees()[0];
    this.addAddress();
    this.saveGroup();
    this.addressFormGroup.markAsPristine();;
    this.updatePersonalInfoAddressButtonHidden = false;
    this.startGroupButtonHidden = true;
    this.submitButtonHidden = true;
    this.saveButtonHidden = false;
  }

  addAddress(){
    var address = <Address>{};
    address.street = this.addressFormGroup.controls.street.value;
    address.city = this.addressFormGroup.controls.city.value;
    address.state = this.addressFormGroup.controls.state.value;
    address.zip = this.addressFormGroup.controls.zip.value;
    this.address = address;
    this.evacueeService.storeAddress(address) // test
  }

  addToGroup(){
    this.message = 'You have added ' + this.firstName.value + ' ' + this.lastName.value + ' to the group! 🎉🎉🎉';
    this.addEvacuee();
    this.openSnackBar(this.message);
    this.addFormButtonHidden = false; 
    this.addFormHidden = true;
  }

  addEvacuee() {
    var evacuee: Evacuee;
    evacuee = this.evacueeInfoFormGroup.value;
    this.evacueeList.push(evacuee)
    this.evacueeService.storeEvacuees(evacuee);    //test:
    this.evacueeCounter += 1;
    this.evacueeInfoFormGroup.reset({veteran: false, outofstate: false, email: '', phone: null});
    console.log(this.evacueeList);
    this.saveGroup();
    this.submitButtonHidden = false;
    this.saveButtonHidden = true;   
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, '', { duration: 1500 })
  }

  editEvacuee(i) {
    this.evacuee = this.evacueeList[i+1]; 
    console.log(this.evacuee);
    this.evacueeInfoFormGroup = this.formBuilder.group({
      firstName: [this.evacuee.firstName, Validators.required],
      lastName: [this.evacuee.lastName, Validators.required],
      email: [this.evacuee.email, Validators.email],
      phone: [this.evacuee.phone],
      sex: [this.evacuee.sex, Validators.required],
      //race: [this.evacuee.race, Validators.required],
      veteran: [this.evacuee.veteran],
      outofstate: [this.evacuee.outofstate],
      age:[this.evacuee.age, Validators.compose([Validators.min(1), Validators.max(110)])] 
    })
    this.evacueeChangeIndex = i+1;//test:
    this.addButtonHidden = true;
    this.submitButtonHidden = true;
    this.updateButtonHidden = false;
    this.cancelButtonHidden = false;
    this.editButtonHidden = true;
    this.deleteButtonHidden = true;
    this.editTitle = true;
    this.addFormButtonHidden = true;
    this.addFormHidden = false;
    this.saveButtonHidden = true;
  }

  updateEvacuee() {
    // local variables:
    this.evacueeList[this.evacueeChangeIndex] = this.evacueeInfoFormGroup.value;
    //local storage:
    let evacueesFromLocalStorage = this.evacueeService.getEvacuees();

    for (let i = 0; i < evacueesFromLocalStorage.length; i++) {
      if (i == this.evacueeChangeIndex) {
        let updatedEvacuee = this.evacueeInfoFormGroup.value;
        this.evacueeService.updateEvacuee(this.evacueeChangeIndex, updatedEvacuee);
      }
    }

    this.message = 'You have successfully updated info about ' + this.firstName.value + ' ' + this.lastName.value + '.';
    this.openSnackBar(this.message);
    this.evacueeInfoFormGroup.reset({veteran: false, outofstate: false, email: '', phone: null});
    this.addButtonHidden = false;
    this.submitButtonHidden = false;
    this.updateButtonHidden = true;
    this.cancelButtonHidden = true;
    this.editButtonHidden = false;
    this.deleteButtonHidden = false;
    this.editTitle = false;
    this.addFormButtonHidden = false;
    this.addFormHidden = true;
    this.saveGroup();
  }
 
  editEvacueeCancel(){
    this.evacueeInfoFormGroup.reset({veteran: false, outofstate: false, email: '', phone: null});
    this.addButtonHidden = false;
    this.submitButtonHidden = false;
    this.updateButtonHidden = true;
    this.cancelButtonHidden = true;
    this.editButtonHidden = false;
    this.deleteButtonHidden = false;
    this.editTitle = false;
    this.addFormButtonHidden = false; 
    this.addFormHidden = true;
  }

  deleteEvacuee(i) {
    this.evacuee = this.evacueeList[i+1]; 
    this.evacueeService.deleteEvacuee(i+1);
    this.message = 'You have deleted ' + this.evacuee.firstName + ' ' + this.evacuee.lastName + ' from the group.';
    this.openSnackBar(this.message); 
    if (i !== -1) {
        this.evacueeList.splice(i+1, 1);
        console.log(this.evacueeList);
    }    
    this.evacueeCounter -= 1;
    this.evacueeInfoFormGroup.reset({veteran: false, outofstate: false, email: '', phone: null});
    this.addButtonHidden = false;
    this.submitButtonHidden = false;
    this.updateButtonHidden = true;
    this.cancelButtonHidden = true;   
    this.saveGroup();
  }

  addFormCancel(){
    this.evacueeInfoFormGroup.reset({veteran: false, outofstate: false, email: '', phone: null});
    this.addButtonHidden = false;
    this.submitButtonHidden = false;
    this.updateButtonHidden = true;
    this.cancelButtonHidden = true;
    this.editButtonHidden = false;
    this.deleteButtonHidden = false;
    this.editTitle = false;
    this.addFormButtonHidden = false; 
    this.addFormHidden = true;
    this.saveButtonHidden = true;
  }

  saveGroup() {
    this.loadData(0, this.pageSize);
  }

  goTo(index: number) {
    this.stepper.selectedIndex = index;
  }

  openQuestionDialog(){
    const dialogRef = this.dialog.open(EvacueeMainQuestionDialogComponent, {
      width: '450px',
      height: '225px',
    });
    dialogRef.afterClosed().subscribe(result => {
      this.goTo(result);
    });
  }

  openWarningDialog(message: String): void {
    const dialogRef = this.dialog.open(EvacueeMainWarningDialogComponent, {
      width: '450px',
      height: '225px',
      data: {message: message}
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }

  openConfirmationDialog(message: String): void {
    const dialogRef = this.dialog.open(EvacueeMainDialogComponent, {
      width: '450px',
      height: '225x',
      data: {name: this.mainUserPlaceholder.firstName, message: message}
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }

  openSummaryDialog(evacueeGroup: EvacueeGroup): void {
    const dialogRef = this.dialog.open(EvacueeSummaryComponent, {
      width: '450px',
      height: '225x',
      data: {evacueeGroup: evacueeGroup}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result){
      console.log(result);
      const evacueeGroupObservable = this.evacueeHttpService.addEvacueeGroup(result)
      evacueeGroupObservable.subscribe((res)=> {
          this.openConfirmationDialog('Your evacuee group has been successfuly pre-registered');
      },
      (error) => {
          this.openWarningDialog(error);
        });    
      }
    });
  }

  submitGroup() {
    //this.evacueeGroup.address = this.address;      
    this.evacueeGroup.address = this.evacueeService.getAddress();      
    for (let index = 0; index < this.evacueeList.length; index++) {
      this.validateEvacuee(this.evacueeList[index]);
    }     
    this.evacueeGroup.evacuees = this.evacueeList; 
    this.evacueeGroup.shelterId = this.shelter.shelterId;
    //this.evacueeGroup.shelterId = this.evacueeService.getShelter().shelterId;

    this.evacueeService.showStorage();
    this.openSummaryDialog(this.evacueeGroup);    
    /*const evacueeGroupObservable = this.evacueeHttpService.addEvacueeGroup(this.evacueeGroup)
    evacueeGroupObservable.subscribe((res)=> {
        console.log(res);
        this.openConfirmationDialog('Your evacuee group has been successfuly pre-registered');
    },
    (error) => {
        this.openWarningDialog(error);
    });    */
  }
  
  validateEvacuee(evacuee: Evacuee) {
      evacuee.covidSymptoms = null;
      if (evacuee.email == "") {
        evacuee.email = null;
      }
      if (evacuee.phone != null) {
        var phoneConvert = evacuee.phone.toString();
        evacuee.phone = phoneConvert;
      } 
      if (evacuee.veteran == false) {
        evacuee.veteran = null;
      } else {
        evacuee.veteran = 'Y';
      }
      if (evacuee.outofstate == false) {
        evacuee.outofstate = null;
      } else {
        evacuee.outofstate = 'Y';
      }
  }
}