import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from 'src/app/shared/dialogdata';

@Component({
  selector: 'app-shelter-warning-dialog',
  templateUrl: './shelter-warning-dialog.component.html',
  styleUrls: ['./shelter-warning-dialog.component.scss']
})
export class ShelterWarningDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ShelterWarningDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
      dialogRef.disableClose = true;
     }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
