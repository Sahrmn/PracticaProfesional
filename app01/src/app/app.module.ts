import { NgModule, NgZone } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy, RouterModule } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

//
import { environment } from '../environments/environment';
import { LoginComponent } from './componentes/login/login.component';  
import { HomeComponent } from './componentes/home/home.component';  
import { AngularFireModule } from '@angular/fire'; 
import { AngularFireAuthModule } from '@angular/fire/auth';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SplashComponent } from './componentes/splash/splash.component';

/*

reducir tiempo de carga: https://blog.ng-classroom.com/blog/ionic2/ionic-page-and-lazy-loading/

generar splash e icon: https://blog.ng-classroom.com/blog/tips/preparando-iconos-splashscreen/
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
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
