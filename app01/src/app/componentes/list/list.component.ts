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

  constructor(private camera: Camera, private camService: CamaraService) { 

    this.usuario = JSON.parse(localStorage.getItem('user'));
    this.sala = JSON.parse(localStorage.getItem('sala'));

    this.firebase.database().ref(this.sala).child("usuarios").child(this.usuario.correo.replace(".", "")).on("value", (snapshot) => {

      let img = snapshot.toJSON();
      console.log(img);
      if (!img) { img = { child: "" }; }

      this.ObtenerFotos();
    });
    
  }

  ngOnInit() {
  	  console.log("inicio");
    this.firebase.database().ref('users/4').set({
      'correo': 'anonimo@gmail.com',
      'clave': 4444,
      'perfil': 'usuario',
      'sexo': 'masculino'
    });
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
    } catch (error) {

      // this.presentToast(error);
      alert(error);
    }
  }

  
  ObtenerFotos() {

    let fotosRef = this.firebase.database().ref(this.sala);
    console.log(fotosRef.key);

    fotosRef.on("value", (snap) => {

      let data = snap.val();
      this.fotos = [];
      let contador = 0;

      for (let item in data) {

        this.fotos.push(data[item]);
        this.fotos[contador].referencia = item
        contador++;
      }

      this.fotos.reverse();
      console.log(this.fotos);
      //this.ocultarSpinner = true;
    })
  }


}
