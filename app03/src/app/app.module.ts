import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire'; 
import { AngularFireAuthModule } from '@angular/fire/auth';
import { LoginComponent } from './componentes/login/login.component';
import { HomeComponent } from './componentes/home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SplashComponent } from './componentes/splash/splash.component';
import { DeviceMotion, DeviceMotionAccelerationData } from '@ionic-native/device-motion/ngx';
import { Vibration } from '@ionic-native/vibration/ngx';
import { Flashlight } from '@ionic-native/flashlight/ngx';

/*
para la linterna: https://ionicframework.com/docs/native/flashlight   
para vibrar:   https://ionicframework.com/docs/native/vibration   

*/

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    SplashComponent
    ],
  entryComponents: [],
  imports: [
  	BrowserModule, 
  	IonicModule.forRoot(), 
    FormsModule,
    ReactiveFormsModule,
  	AppRoutingModule,
  	AngularFireAuthModule,
  	AngularFireModule.initializeApp(environment.firebase)
  	],
  providers: [
    StatusBar,
    Vibration,
    SplashScreen, 
    Flashlight,
    DeviceMotion,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
