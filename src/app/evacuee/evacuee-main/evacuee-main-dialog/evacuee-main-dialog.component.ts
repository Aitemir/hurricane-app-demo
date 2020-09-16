import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from 'src/app/shared/dialogdata';
import { EvacueeService } from '../../evacuee.service';

@Component({
  selector: 'app-evacuee-main-dialog',
  templateUrl: './evacuee-main-dialog.component.html',
  styleUrls: ['./evacuee-main-dialog.component.scss']
})
export class EvacueeMainDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<EvacueeMainDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private evacueeService: EvacueeService,) {
      dialogRef.disableClose = true;
     }

  ngOnInit(): void {
  }
  
  onNoClick(): void {
    this.dialogRef.close();
    this.evacueeService.removeLocalStorageData();
  }
}