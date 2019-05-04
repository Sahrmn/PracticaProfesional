import { Component, OnInit } from '@angular/core';
//import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { BarcodeScannerOptions, BarcodeScanner } from "@ionic-native/barcode-scanner/ngx";
import * as firebase from "firebase";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  firebase = firebase;
  scannedData: string = ""//= "ae338e4e0cbb4e4bcffaf9ce5b409feb8edd5172";
  valor: number = 0;
  barcodeScannerOptions: BarcodeScannerOptions;
  codigo1 = ['8c95def646b6127282ed50454b73240300dccabc', 10];
  codigo2 = ['ae338e4e0cbb4e4bcffaf9ce5b409feb8edd5172', 50];
  codigo3 = ['2786f4877b9091dcad7f35751bfcf5d5ea712b2f', 100];
  codigos: [];

  constructor(private barcodeScanner: BarcodeScanner) { 
  	this.barcodeScannerOptions = {
      showTorchButton: true,
      showFlipCameraButton: true
    };

  }

  ngOnInit() {
  	//console.log(this.codigo1);

  	//this.traerCodigos();
  	/*
  	this.firebase.database().ref('qr/8c95def646b6127282ed50454b73240300dccabc').set({
      'valor': 10,
      'usado': false,
      'codigo': "8c95def646b6127282ed50454b73240300dccabc"
    });
    this.firebase.database().ref('qr/ae338e4e0cbb4e4bcffaf9ce5b409feb8edd5172').set({
      'valor': 50,
      'usado': false,
      'codigo': "ae338e4e0cbb4e4bcffaf9ce5b409feb8edd5172"
    });
    this.firebase.database().ref('qr/2786f4877b9091dcad7f35751bfcf5d5ea712b2f').set({
      'valor': 100,
      'usado': false,
      'codigo': "2786f4877b9091dcad7f35751bfcf5d5ea712b2f"
    });
    */
  }
  

  scanCode(callback) {
    this.barcodeScanner
      .scan()
      .then(barcodeData => {
        //alert("Barcode data " + JSON.stringify(barcodeData));
        this.scannedData = barcodeData.text;

        //alert(this.scannedData);
	    this.firebase.database().ref('qr')
	    .once("value", (snap) => {

	      let data = snap.val();
	      for (let item in data) {
	        alert("Codigo escaneado: " + this.scannedData + " - Codigo db: " + item + "/" + data[item].codigo);
          alert("Codigo escaneado: " + typeof(this.scannedData) + " - Codigo db: " + typeof(item) + "/" + typeof(data[item].codigo));
	        //if(this.scannedData == data[item].codigo)
	        if(JSON.stringify(this.scannedData) == JSON.stringify(item))
	        {
	        	if(data[item].usado == false)
	        	{
	        		alert("Cargaste credito");
	        		this.valor += data[item].valor;
	        		this.firebase.database().ref('qr/'+ item).update({usado: true});
	        		break;
	        	}
	        	else
	        	{
	        		//mensaje de que ya uso ese codigo
	        		alert("Ya usaste ese código");
	        		break;
	        	}
	        }
	      }
	      
	    });


      })
      .catch(err => {
        console.log("Error", err);
      });
     
  }


  /*
  verificoCodigo(){
  	if(this.scannedData == this.codigo1[0])
  	{
  		this.valor += 10;
  		console.log("cargué 10");
  	}
  	else if(this.scannedData == this.codigo2[0])
  	{
  		this.valor += 50;
  		console.log("cargué 50");
  	}
  	else if(this.scannedData == this.codigo3[0])
  	{
  		this.valor += 100;
  		console.log("cargué 100");
  	}
  }
  */

  traerCodigos(){
  	this.firebase.database().ref('qr')
	    .once("value", (snap) => {

	      let data = snap.val();
	      for (let item in data) {
	        //alert("escaneado: " + this.scannedData);
	        alert("item: "+ data[item].codigo);
	        console.log(data[item].codigo);
	        console.log(typeof(data[item].codigo));
	        console.log(data[item].codigo == "8c95def646b6127282ed50454b73240300dccabc");
	      }
	      
	    });
  }


  limpiar(){
  	this.valor = 0;
  	this.firebase.database().ref('qr/'+ this.codigo1[0]).update({usado: false});
  	this.firebase.database().ref('qr/'+ this.codigo2[0]).update({usado: false});
  	this.firebase.database().ref('qr/'+ this.codigo3[0]).update({usado: false});
  }






}
