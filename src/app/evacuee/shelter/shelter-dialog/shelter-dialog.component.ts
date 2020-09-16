import { Component, OnInit, Inject, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Shelter } from 'src/app/shared/shelter.model';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-shelter-dialog',
  templateUrl: './shelter-dialog.component.html',
  styleUrls: ['./shelter-dialog.component.scss']
})
export class ShelterDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ShelterDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    dialogRef.disableClose = true;
   }  

  distance_miles = this.data.distance * 0.001;
  distance = this.distance_miles.toFixed(1);

  ngOnInit(): void {
  }

  onNoClick(index: number): void {
    this.dialogRef.close(index);
  }

}