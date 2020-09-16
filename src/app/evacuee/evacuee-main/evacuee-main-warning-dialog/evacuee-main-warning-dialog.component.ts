import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from 'src/app/shared/dialogdata';

@Component({
  selector: 'app-evacuee-main-warning-dialog',
  templateUrl: './evacuee-main-warning-dialog.component.html',
  styleUrls: ['./evacuee-main-warning-dialog.component.scss']
})
export class EvacueeMainWarningDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<EvacueeMainWarningDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
      dialogRef.disableClose = true;
     }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
