import { JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChangePasswordDTO } from 'src/app/model/change-password-dto';
import { EmailValuesDTO } from 'src/app/model/email-values-dto';
import {LoginUsuario} from 'src/app/model/login-usuario'
import { AuthService } from 'src/app/service/auth.service';
import { EmailPasswordService } from 'src/app/service/email-password.service';
import { TokenService } from 'src/app/service/token.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  confirmPassword:string;
  password:string;
  tokenPassword:string;
  dto: ChangePasswordDTO;


  isLogged=false;
  isLoginFail=false;
  loginUsuario!:LoginUsuario;
  nombreUsuario!: string;
  // password!: string;
  roles: string[]=[];
  errMsj!:string;
  spinerBtn:boolean=true;
  login:any;

    constructor(
      private tokenService: TokenService,
      private authService: AuthService,
      private router: Router,
      private emailPasswordService: EmailPasswordService,
      private activatedRoute: ActivatedRoute,
      ) { }

    ngOnInit(): void {
      if(this.tokenService.getToken()){
        this.isLogged=true;
        this.isLoginFail=false;
        this.roles=this.tokenService.getAuthorities();
      }
  }

  onChangePassword(): void {
    if(this.password !== this.confirmPassword){
      this.spinerBtn=true;
      Swal.fire({
          position: 'center',
          icon: 'error',
          title: "Error: No son iguales las contraseña",
          showConfirmButton: true,
          timer: 2000
        });

        return
    }else{
    this.tokenPassword = this.activatedRoute.snapshot.params['tokenPassword'];
    this.dto = new ChangePasswordDTO(this.password,this.confirmPassword,this.tokenPassword);
    this.emailPasswordService.changepassword((this.dto)).subscribe({
      next:(data)=>{
      // console.log(JSON.stringify(data));
       Swal.fire({
         position: 'center',
         icon: 'success',
         title: 'Haz creado tu nueva contraseña',
         showConfirmButton: false,
         timer: 1500
       }),
       this.router.navigate(['/login'])
     },
     error:(err) => {
      this.spinerBtn=true;

      //  console.log("ERROR "+JSON.stringify(err));
       Swal.fire({
         position: 'center',
         icon: 'error',
         title: "ERROR en changePassword: "+err.error.mensaje,
         showConfirmButton: true,
        //  timer: 1500
       })
     },
     complete:()=>{
      //  console.log("COMPLETE"),
       this.router.navigate( ['']);
       setTimeout(() => {location.reload()}, 1000)
     }
   })
  }}

}
