import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginModalComponent } from './components/login-modal/login-modal.component';
import { ReleasesComponent } from './components/releases/releases.component';
import { HomeComponent } from './components/home/home.component';
import { TypePipe } from './pipes/type.pipe';

@NgModule({
  declarations: [
    AppComponent,
    LoginModalComponent,
    ReleasesComponent,
    HomeComponent,
    TypePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
