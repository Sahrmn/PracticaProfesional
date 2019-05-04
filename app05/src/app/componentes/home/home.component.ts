import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../servicios/auth.service";
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import * as firebase from "firebase";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  public firebase = firebase;
  jugador1: string;
  jugador2: string;
  partidos;


  constructor() { 

  }

  ngOnInit() {
    this.traerPartidos();
  }

  
  crearPartido(){
    let date = new Date();
    let fecha = `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`;
    let nombre = fecha + `-${date.getHours()}-${date.getMinutes()}`;
    this.firebase.database().ref('partidos/' + nombre).set({
      'fecha': fecha,
      'jugador1': this.jugador1,
      'jugador2': this.jugador2,
      'resultado_j1': 0,
      'resultado_j2': 0,
      'foto': "",
      'video': ""
    });
    console.log("Partido creado");
  }

  traerPartidos(){
    this.firebase.database().ref('partidos')
    .once("value", (snap) => {

      let data = snap.val();
      this.partidos = new Array();
      for (let item in data) {
        this.partidos.push(data[item]);
        
      }
        console.log(this.partidos);
      /* 
      spinner
      var element = <HTMLInputElement> document.getElementById('btn-grafico');
      element.classList.remove('ocultar');
      */
    });
  }





  
}
