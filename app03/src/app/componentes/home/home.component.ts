import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { DeviceMotion, DeviceMotionAccelerationData, DeviceMotionAccelerometerOptions } from '@ionic-native/device-motion/ngx';
import { Vibration } from '@ionic-native/vibration/ngx';
import { Flashlight } from '@ionic-native/flashlight/ngx';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  alarma: boolean;
  x:string;
  y:string;
  z: string;
  timeStamp:string;
  id: any;
  seMovio:boolean;

  constructor(
    public navCtrl: NavController, 
    public deviceMotion: DeviceMotion, 
    private vibration: Vibration,
    private flashlight: Flashlight) {

  	let alarm = localStorage.getItem('alarma');
    this.x = "-";
    this.y = "-";
    this.z = "-";
    this.timeStamp = "-"; 

  	if(alarm != null)
  	{
  		this.alarma = true;
  	}
  	else{
  		this.alarma = false;
  	}

  }

  ngOnInit() {}

  activar(){
    this.alarma = true;
    try{
      this.seMovio = false;
      // Watch device acceleration
      var option: DeviceMotionAccelerometerOptions = {frequency: 5100 };
      this.id= this.deviceMotion.watchAcceleration(option).subscribe((result: DeviceMotionAccelerationData) =>
      {
          this.x= "" + result.x;
          this.y= "" + result.y;
          this.z= "" + result.z;
          this.timeStamp= ""+result.timestamp;

          //izquierda -> estan hurtando el dispositivo
          if(result.x>8.6  && result.x<9.9){
            this.reproducirAudio('izquierda');
            this.seMovio = true;
          }

          //derecha -> que estas por hacer?
          if(result.x<-8.5 && result.x>-9.9){
            this.reproducirAudio('derecha');
            this.seMovio = true;
          }

          //vertical -> larga eso
          if(result.y<9.9 && result.y>8.3){
            this.encenderLinterna();
            this.reproducirAudio('vertical');
            setTimeout(function() {
              this.apagarLinterna();
            }, 5000);
            this.seMovio = true;
          }

          //horizontal -> alarma, alarma
          if(result.z<9.8 && result.z>9.6 && this.seMovio){ //result.y < 9.9 && result.y > 9.7
            this.vibrar(5000);
            this.reproducirAudio('horizontal');
          }
      })
    }
    catch(error){
      alert("Error " + error); 
    }
  }


  desactivar(){
    this.alarma = false;
    this.id.unsubscribe();
    this.apagarLinterna();
  }

  vibrar(time){ //time = 1000 -> un segundo
    this.vibration.vibrate(time);
  }

  encenderLinterna(){
    this.flashlight.switchOn();
    /*setTimeout(function() {
      alert("voy a apagar la linterna");
      this.flashlight.switchOff();
    }, 5000);*/
  }

  apagarLinterna(){
    if(this.flashlight.isSwitchedOn())
    {
      this.flashlight.switchOff();
    }
  }

  reproducirAudio(nom_audio) {
    const audio = new Audio('assets/sounds/' + nom_audio + '.mp3');
    audio.play();
  }

}
