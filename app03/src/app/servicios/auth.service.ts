import { Injectable } from '@angular/core';
import { Router } from  "@angular/router";
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private AFauth: AngularFireAuth, private router: Router) { }

  login(email: string, password: string){
     this.AFauth.auth.signInWithEmailAndPassword(email, password).then(res =>{
       console.log(res);
       this.router.navigate(['home']);
     }).catch(function(error){
       console.log("Error logeando: " + error);
       alert("Usuario o contraseña incorrectos");
     })
  }
}
