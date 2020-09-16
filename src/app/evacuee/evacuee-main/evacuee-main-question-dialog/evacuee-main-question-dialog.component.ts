import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-evacuee-main-question-dialog',
  templateUrl: './evacuee-main-question-dialog.component.html',
  styleUrls: ['./evacuee-main-question-dialog.component.scss']
})
export class EvacueeMainQuestionDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<EvacueeMainQuestionDialogComponent>) {
    dialogRef.disableClose = true;
   }

  ngOnInit(): void {
  }

  onNoClick(index: number): void {
    this.dialogRef.close(index);
  }

}
