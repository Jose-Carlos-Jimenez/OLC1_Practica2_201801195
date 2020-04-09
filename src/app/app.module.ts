import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PrincipalComponent } from './principal/principal.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu'
import {MatIconModule} from '@angular/material/icon'
import { EditoresComponent } from './editores/editores.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { UploadService } from './services/upload.service';

@NgModule({
  declarations: [
    AppComponent,
    PrincipalComponent,
    EditoresComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    HttpClientModule
  ],
  providers: [UploadService],
  bootstrap: [AppComponent],
})
export class AppModule { }
