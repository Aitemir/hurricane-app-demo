import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from 'src/app/shared/dialogdata';
import { EvacueeService } from '../evacuee.service';
import { Evacuee } from 'src/app/shared/evacuee.model';
import { NgModel } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-evacuee-summary',
  templateUrl: './evacuee-summary.component.html',
  styleUrls: ['./evacuee-summary.component.scss']
})
export class EvacueeSummaryComponent implements OnInit {
  
  evacuees: Evacuee [] = [];
  displayedColumns: string[] = ['evacuee', 'select'];
  dataSource: MatTableDataSource<Evacuee>;
  selection = new SelectionModel<any>(true, []);

  constructor(public dialogRef: MatDialogRef<EvacueeSummaryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private evacueeService: EvacueeService) { }

  ngOnInit(): void {
    this.evacuees = this.data.evacueeGroup.evacuees;
    console.log(this.evacuees);
    this.dataSource = new MatTableDataSource<Evacuee>(this.evacuees);
  }
  
  onNoClick(): void {
    this.dialogRef.close();
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  checkboxLabel(row?: Evacuee): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.firstName + 1}`;
  }

  call() {
    console.log(this.selection.selected);
    let evacuees: Evacuee [] = this.selection.selected; 
    for (let i = 0; i < evacuees.length; i++) {
      this.evacuees[i].covidSymptoms = 'Y';
    }   
    this.dialogRef.close(this.data.evacueeGroup);
  }
}