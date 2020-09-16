import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EvacueeMainComponent } from './evacuee-main/evacuee-main.component';
import { ShelterComponent } from './shelter/shelter.component';
import { EvacueeSummaryComponent } from './evacuee-summary/evacuee-summary.component';


const routes: Routes = [
  {
    path: '',
    component: ShelterComponent
  },
  {
    path: 'add-group',
    component: EvacueeMainComponent
  },
  {
    path: 'status',
    component: EvacueeSummaryComponent
  }
]; 

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EvacueeRoutingModule { }