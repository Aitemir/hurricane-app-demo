import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-shelter-info-dialog',
  templateUrl: './shelter-info-dialog.component.html',
  styleUrls: ['./shelter-info-dialog.component.scss']
})
export class ShelterInfoDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ShelterInfoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
     }

  ngOnInit(): void {
  }
  
  copyAddress(){
    let value = this.data.address;
    let selBox = document.createElement('textarea');
      selBox.style.position = 'fixed';
      selBox.style.left = '0';
      selBox.style.top = '0';
      selBox.style.opacity = '0';
      selBox.value = value;
      document.body.appendChild(selBox);
      selBox.focus();
      selBox.select();
      document.execCommand('copy');
      document.body.removeChild(selBox);
    }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
