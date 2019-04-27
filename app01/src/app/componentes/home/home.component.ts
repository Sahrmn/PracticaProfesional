import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from  '../../servicios/auth.service';
import { Usuario } from '../../clases/usuario';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  @Output() public SeleccionDeTipoDeFoto: EventEmitter<any> = new EventEmitter<any>();
  mostrar: boolean;
  tipo_cosas: boolean;

  constructor(public router: Router, private  authService:  AuthService) { }

  ngOnInit() {
    this.verTodos(this.guardarDatosUser);
  }

  listarLindas(){
  	this.mostrar = true;
  	this.tipo_cosas = true;
  	this.SeleccionDeTipoDeFoto.emit(true);
  	//this.router.navigate(['/lista']);
    localStorage.setItem('sala', JSON.stringify('cosas_lindas'));
  }

  listarFeas(){
  	this.mostrar = true;
  	this.tipo_cosas = false;
  	this.SeleccionDeTipoDeFoto.emit(false);
  	//this.router.navigate(['/lista']);
    localStorage.setItem('sala', JSON.stringify('cosas_feas'));
  }

  verTodos(callback){
    let usuarios: any;
    this.authService.getUsers().subscribe(data => {
      //console.log(data);
      usuarios = data.map(e => {
        return {
          id: e.payload.doc.id,
          data: e.payload.doc.data()
        } as any;
      });
      //console.log(usuarios);
      //console.log(this.usuarios[0].data.correo); //para recuperar los datos
      setTimeout(function(){
        callback(usuarios);
      });

    });
  }

  async guardarDatosUser(todos){    
    //console.log(todos);
    let local = JSON.parse(localStorage.getItem('user'));
    let datos: any[];
    datos = todos.filter(user => user.data.correo === local.correo);
    //console.log(todos[0].data.correo);
    //console.log(local.correo);
    //console.log(datos[0].data);
    let userCompleto: Usuario = new Usuario();
    userCompleto.correo = datos[0].data.correo;
    //userCompleto.id = datos.id;
    userCompleto.perfil = datos[0].data.perfil;
    userCompleto.sexo = datos[0].data.sexo;
    localStorage.setItem('user', JSON.stringify(userCompleto));
    //console.log(JSON.parse(localStorage.getItem('user')));
  }


}
