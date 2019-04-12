import { Injectable } from '@angular/core';
import { Router } from  "@angular/router";
import { AngularFireAuth } from  "@angular/fire/auth";

import { auth } from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(private AFauth: AngularFireAuth, private router: Router) {

  //this.afAuth.authState.subscribe(user => {
   // console.log(user);
      /*if (user) {
        this.user = user;
        localStorage.setItem('user', JSON.stringify(this.user));
      } else {
        localStorage.setItem('user', null);
      }
    }) */
  }

  //funcion logear
  login(email: string, password: string){
     this.AFauth.auth.signInWithEmailAndPassword(email, password).then(res =>{
       console.log(res);
       this.router.navigate(['home']);
     }).catch(err => console.log("error: " + err))
  }


/*
  //logout
  logout(){
    await this.afAuth.auth.signOut();
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  //ver si el usuario esta logeado
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return user !== null;
  }*/


}
