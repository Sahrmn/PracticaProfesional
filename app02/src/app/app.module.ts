import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

//
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire'; 
import { AngularFireAuthModule } from '@angular/fire/auth';
import { LoginComponent } from './componentes/login/login.component';
import { HomeComponent } from './componentes/home/home.component';
import { JuegoComponent } from './componentes/juego/juego.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SplashComponent } from './componentes/splash/splash.component';

//sonidos
//https://text-to-speech-demo.ng.bluemix.net/


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    SplashComponent,
    JuegoComponent
  ],
  entryComponents: [],
  imports: [
  	BrowserModule, 
  	IonicModule.forRoot(), 
  	AppRoutingModule,
  	AngularFireAuthModule,
    ReactiveFormsModule,
    FormsModule,
  	AngularFireModule.initializeApp(environment.firebase)
  	],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
