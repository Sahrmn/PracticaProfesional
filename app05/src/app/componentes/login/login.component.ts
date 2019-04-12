import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../servicios/auth.service";
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  formulario = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });

  constructor(private authService: AuthService, private formB: FormBuilder) { 

  this.formulario = formB.group({
      email: [null, Validators.compose([Validators.required, Validators.email])],
      password: [null, Validators.compose([Validators.required, Validators.minLength(6)])]
    })

  }

  ngOnInit() {}

  onSubmitLogin(formValues){
    this.authService.login(formValues.email, formValues.password);
  }

  rellenarDatos(){
    this.formulario.patchValue({
      email: "tester@gmail.com",
      password: "555555"
    });
  }




  
}
