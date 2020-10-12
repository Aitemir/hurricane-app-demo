import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AgmCoreModule } from '@agm/core';

//Material Modules:
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import {MatCardModule} from '@angular/material/card';

//storage service: 
import { StorageServiceModule } from 'ngx-webstorage-service';
import { EvacueeService } from './evacuee/evacuee.service';
import { HttpClientModule } from '@angular/common/http';
import { WelcomeComponent } from './welcome/welcome.component';
import { ClipboardModule } from '@angular/cdk/clipboard'
import {MatDialogModule} from '@angular/material/dialog';
import {} from 'googlemaps';
import { AboutUsDialogComponent } from './about-us-dialog/about-us-dialog.component';
import { WrongRouteComponent } from './wrong-route/wrong-route.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    AboutUsDialogComponent,
    WrongRouteComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatToolbarModule,
    MatMenuModule,
    StorageServiceModule,
    HttpClientModule,
    ClipboardModule,
    MatCardModule,
    MatDialogModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAaQmjmK4Z1QvTrwR6VRRbRsEF0gi9lARI',
      libraries: ['geometry']
    })
  ],
  providers: [EvacueeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
