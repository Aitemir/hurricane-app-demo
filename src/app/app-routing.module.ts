import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EvacueeModule } from './evacuee/evacuee.module';
import { WelcomeComponent } from './welcome/welcome.component';


const routes: Routes = [
  {
    path: 'evacuee',
    loadChildren: ()=> EvacueeModule
  },
  {
    path: '',
    component: WelcomeComponent,
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
