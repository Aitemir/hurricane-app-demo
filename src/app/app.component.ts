import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AboutUsDialogComponent } from './about-us-dialog/about-us-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'hurricane-app';

  constructor(public dialog: MatDialog) {}

  openAboutDialog() {
    const dialogRef = this.dialog.open(AboutUsDialogComponent, {
      width: '450px',
      height: '225x'
    });
    dialogRef.afterClosed().subscribe(_ => {});
  }
}