import { Injectable } from '@angular/core';
import { Router } from  "@angular/router";
import { AngularFireAuth } from  "@angular/fire/auth";
import { Usuario } from '../clases/usuario';
import { auth } from 'firebase/app';
import { AngularFirestore, AngularFirestoreModule } from "@angular/fire/firestore"; 
import { AngularFireModule } from '@angular/fire'; 

//import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
//import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {


  constructor(private AFauth: AngularFireAuth, public router: Router, public firestore: AngularFirestore) {

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
       //console.log(res);  
       this.guardarUsuario();     
       this.router.navigate(['home']);
     }).catch(function(error){
       console.log("Error logeando: " + error);
       alert("Usuario o contraseña incorrectos");
     })
  }

  guardarUsuario(){
    this.AFauth.authState.subscribe(user => {
      //console.log(user);
      if (user) {
        let user_auth: any = user;
        let usuario: Usuario = new Usuario();
        usuario.correo = user.email;
        localStorage.setItem('user', JSON.stringify(usuario));
      } else {
        localStorage.setItem('user', null);
      }
      //console.log(JSON.parse(localStorage.getItem('user')));
      
      //let u = JSON.parse(localStorage.getItem('user'));
      //console.log(u.email);
    }) 
  }

  public getUsers() {
    return this.firestore.collection('users').snapshotChanges();
  }

  private setearUser(){
    //let usuarios = this.getUsers();


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
