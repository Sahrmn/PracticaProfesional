import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { CamaraService } from '../../servicios/camara.service';
import * as firebase from "firebase";
import { ImagePicker, ImagePickerOptions } from '@ionic-native/image-picker';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {

  public nombreArchivo = '';
  public URLPublica = '';

  public firebase = firebase;
  public usuario;
  public sala;
  public fotos = [];
  public color_sala;
  spinner: boolean = true;

  constructor(private camera: Camera, private camService: CamaraService) { 

    this.usuario = JSON.parse(localStorage.getItem('user'));
    this.sala = JSON.parse(localStorage.getItem('sala'));

    if(this.sala == 'cosas_lindas')
    {
      this.color_sala = true;
    }
    else{
      this.color_sala = false;
    }

   
  }

  ngOnInit() {
  	/*  console.log("inicio");
    //crear usuarios
    this.firebase.database().ref('users/admin@gmailcom').set({
      'correo': 'admin@gmail.com',
      'perfil': 'admin',
      'sexo': 'femenino'
    });*/

    this.ObtenerFotos();

    localStorage.setItem('sala', this.color_sala);
    //console.log(localStorage.getItem('sala'));
    //console.log(this.sala);

  }

  async abrirCamara() {

    let date = new Date();
    let imageName = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}-${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}-${date.getMilliseconds()}`;

    try {

      let options: CameraOptions = {
        quality: 50,
        targetHeight: 600,
        targetWidth: 600,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE
      };

      let result = await this.camera.getPicture(options);

      let image = `data:image/jpeg;base64,${result}`;
      let pictures = this.firebase.storage().ref(`${this.sala}/${imageName}`);

      pictures.putString(image, "data_url").then(() => {

        pictures.getDownloadURL().then((url) => {

          let baseRef = this.firebase.database().ref(this.sala);
          baseRef.push({ "usuario": this.usuario.correo, "url": url, "votos": 0 });
        });
      });
      this.ObtenerFotos();

    } catch (error) {

      alert(error);
    }
  }

  
  ObtenerFotos() {

    let votos;
    this.firebase.database().ref(this.sala)
    .once("value", (snap) => {

      let data = snap.val();
      this.fotos = [];
      let contador = 0;

      for (let item in data) {

        this.fotos.push(data[item]);
        this.fotos[contador].referencia = item
        contador++;
      }

      this.fotos.reverse();
      //console.log(this.fotos);
      this.spinner = false;
      localStorage.setItem('grafica', JSON.stringify(this.fotos));
      var element = <HTMLInputElement> document.getElementById('btn-grafico');
      element.classList.remove('ocultar');
    });
  }



  votar(imgRef){
    let referencia = imgRef.referencia;
    let child;
    let dbRefImg = this.firebase.database().ref(this.sala).child(referencia);
    let dbRefUser = this.firebase.database().ref("users").child(this.usuario.correo.replace(".", ""));
    let votos;

    dbRefUser.child('votos').once("value", (snapshot) => {

      child = snapshot.toJSON();
      //console.log(child);
    }).then(() => {
      
      var voto = false;
      for (var i in child) {
        if (i == referencia) {
          voto = child[i].voto;
          break;
          //console.log(child[i].voto);
        }
      }

      if (!voto) {

        dbRefImg.once('value', function (snapshot) {

          votos = snapshot.toJSON();
          //console.log(votos);

        }).then(() => {
          dbRefImg.update({ votos: votos.votos + 1 }).then(() => {
            for (var i = this.fotos.length - 1; i >= 0; i--) {
              if(this.fotos[i].referencia == referencia)
              {
                this.fotos[i].votos++;
                break;
              }
            }
            dbRefUser.child('votos').child(referencia).set({
              'voto': true
            });

          });
        })
      } else {
        //console.log("Esa imagen ya la has votado...");
        dbRefImg.once('value', function (snapshot) {

          votos = snapshot.toJSON();
          //console.log(votos);

        }).then(() => {
          dbRefImg.update({ votos: votos.votos - 1 }).then(() => {
            for (var i = this.fotos.length - 1; i >= 0; i--) {
              if(this.fotos[i].referencia == referencia)
              {
                this.fotos[i].votos--;
                break;
              }
            }
            dbRefUser.child('votos').child(referencia).set({
              'voto': false
            });

          });
        })

      }


    });


  }




}
