import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EvacueeRoutingModule } from './evacuee-routing.module';

// Material Modules
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatStepperModule } from '@angular/material/stepper';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatChipsModule} from '@angular/material/chips';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatListModule} from '@angular/material/list';
import {MatTableModule} from '@angular/material/table';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDividerModule} from '@angular/material/divider';


import { EvacueeMainComponent } from './evacuee-main/evacuee-main.component';
import { ShelterComponent } from './shelter/shelter.component';
import { EvacueeMainDialogComponent } from './evacuee-main/evacuee-main-dialog/evacuee-main-dialog.component';
import { EvacueeSummaryComponent } from './evacuee-summary/evacuee-summary.component';
import { EvacueeMainWarningDialogComponent } from './evacuee-main/evacuee-main-warning-dialog/evacuee-main-warning-dialog.component';
import { EvacueeMainQuestionDialogComponent } from './evacuee-main/evacuee-main-question-dialog/evacuee-main-question-dialog.component';
import { AgmCoreModule } from '@agm/core';
import { ShelterDialogComponent } from './shelter/shelter-dialog/shelter-dialog.component';
import { ShelterWarningDialogComponent } from './shelter/shelter-warning-dialog/shelter-warning-dialog.component';
import { ShelterInfoDialogComponent } from './shelter/shelter-info-dialog/shelter-info-dialog.component';

@NgModule({
  declarations: [EvacueeMainComponent, 
    ShelterComponent, 
    EvacueeMainDialogComponent, 
    EvacueeSummaryComponent, 
    EvacueeMainWarningDialogComponent, 
    EvacueeMainQuestionDialogComponent, 
    ShelterDialogComponent, 
    ShelterWarningDialogComponent, 
    ShelterInfoDialogComponent],
  imports: [
    CommonModule, 
    EvacueeRoutingModule,
    MatButtonModule,
    MatFormFieldModule, 
    MatInputModule,
    MatStepperModule,
    FormsModule, 
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatIconModule,
    MatTooltipModule,
    MatCardModule,
    MatRadioModule,
    MatSelectModule, 
    MatCheckboxModule,
    MatChipsModule,
    MatSnackBarModule,
    MatListModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatDividerModule,
    AgmCoreModule
  ]
})
export class EvacueeModule { }
