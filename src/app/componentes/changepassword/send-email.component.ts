import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmailValuesDTO } from 'src/app/model/email-values-dto';
import { LoginUsuario } from 'src/app/model/login-usuario'
import { AuthService } from 'src/app/service/auth.service';
import { EmailPasswordService } from 'src/app/service/email-password.service';
import { TokenService } from 'src/app/service/token.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-send-email',
  templateUrl: './send-email.component.html',
  styleUrls: ['./send-email.component.css']
})
export class SendEmailComponent implements OnInit {

  mailTo: string;
  dto: EmailValuesDTO;
  mail:string;

  isLogged = false;
  isLoginFail = false;
  loginUsuario!: LoginUsuario;
  nombreUsuario!: string;
  password!: string;
  roles: string[] = [];
  errMsj!: string;
  spinerBtn: boolean = true;
  login: any;

  constructor(
    private tokenService: TokenService,
    private authService: AuthService,
    private router: Router,
    private emailPasswordService: EmailPasswordService,
  ) { }

  ngOnInit(): void {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
      this.isLoginFail = false;
      this.roles = this.tokenService.getAuthorities();
    }
  }

  onSendEmail(): void {

    if((this.mail)!==""){

      this.dto = new EmailValuesDTO(this.mailTo);
      this.emailPasswordService.sendemail(this.dto).subscribe({
        next:(data)=>{
          // console.log(JSON.stringify(data));
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Correo enviado: ',
            showConfirmButton: false,
            timer: 1500
          })
        },
        error:(err) => {
          this.spinerBtn = true;

          // console.log(JSON.stringify(err.error.mensaje));
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: err.error.mensaje,
            showConfirmButton: true,
            // timer: 1500
          })
        },
        complete:()=>{
          // console.log("COMPLETE"),
          this.router.navigate(['']);
          setTimeout(() => {location.reload()}, 1000)
        }
      })
    }else{
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: "Falta el email",
        showConfirmButton: true,
        timer: 1500
      })
    }
  }

}
