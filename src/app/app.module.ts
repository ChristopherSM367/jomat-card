import { NgModule, isDevMode ,NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms'; 

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//Modulos
import { ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'
import { ToastrModule } from 'ngx-toastr';
import { QRCodeModule } from 'angularx-qrcode';

//Componentes
import { NavbarComponent } from './componentes/navbar/navbar.component';
import { ListUsersComponent } from './componentes/list-users/list-users.component';
import { AddEditUserComponent } from './componentes/add-edit-user/add-edit-user.component';
import { ProgressBarComponent } from './shared/progress-bar/progress-bar.component';
import { HomeComponent } from './componentes/home/home.component';
import { QrCodeComponent } from './componentes/qr-code/qr-code.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { AllDataComponent } from './componentes/all-data/all-data.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ListUsersComponent,
    AddEditUserComponent,
    ProgressBarComponent,
    HomeComponent,
    QrCodeComponent,
    AllDataComponent,
 
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule, 
    ToastrModule.forRoot(), 
    QRCodeModule, 
    ServiceWorkerModule.register('ngsw-worker.js', {
  enabled: !isDevMode(),
  // Register the ServiceWorker as soon as the application is stable
  // or after 30 seconds (whichever comes first).
  registrationStrategy: 'registerWhenStable:30000'
})
    
  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
