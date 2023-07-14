import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {LoginUsuario} from 'src/app/model/login-usuario'
import { AuthService } from 'src/app/service/auth.service';
import { TokenService } from 'src/app/service/token.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent implements OnInit {


isLogged=false;
isLoginFail=false;
loginUsuario!:LoginUsuario;
nombreUsuario!: string;
password!: string;
roles: string[]=[];
errMsj!:string;
spinerBtn:boolean=true;
login:any;



  constructor(
    private tokenService: TokenService,
    private authService: AuthService,
    private router: Router,
    ) { }

  ngOnInit(): void {
    if(this.tokenService.getToken()){
      this.isLogged=true;
      this.isLoginFail=false;
      this.roles=this.tokenService.getAuthorities();
    }
}
  onLogin():void{

    this.loginUsuario = new LoginUsuario(this.nombreUsuario, this.password);

     this.authService.login(this.loginUsuario).subscribe({
      next: (data) => {
        this.isLogged=true,
        this.isLoginFail=false,
        this.tokenService.setToken(data.token),
        this.tokenService.setUserName(data.nombreUsuario),
        this.tokenService.setAuthorities(data.authorities),
        this.roles=data.authorities,
        this.router.navigate(['']),
        this.login =  this.loginUsuario.password,
        this.nombreUsuario = data.nombreUsuario
        // console.log("token: "+ JSON.stringify(data))
        // console.log("token data.authorities: "+ JSON.stringify(data.authorities))
      },

    error: (err) => {
      this.isLogged=false,
      this.isLoginFail=true,
      this.errMsj=err.error.mensaje,
      this.errMsj = (JSON.stringify(err.error.mensaje))
      // console.log('desde LOGIN: '+this.errMsj);
      if(this.errMsj!=undefined){
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: this.errMsj,
          showConfirmButton: true,
        })
      }else{
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'PASSWORD error',
          showConfirmButton: true,
        })
      }
    this.spinerBtn=true;
    }
    })
  }

  newUser():void{
    this.router.navigateByUrl('/nuevousuario');
  }

  sendEmail():void{
    this.router.navigateByUrl('/sendemail');
  }
}
