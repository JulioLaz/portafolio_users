import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NuevoUsuario } from 'src/app/model/nuevo-usuario';
import { Persona } from 'src/app/model/persona.model';
import { AuthService } from 'src/app/service/auth.service';
import { EnvioUsuarioIdService } from 'src/app/service/envio-usuario-id.service';
import { PersonaService } from 'src/app/service/persona.service';
import { TokenService } from 'src/app/service/token.service';
@Component({
  selector: 'app-encabezado',
  templateUrl: './encabezado.component.html',
  styleUrls: ['./encabezado.component.css']
})
export class EncabezadoComponent implements OnInit {

  persona: Persona = new Persona(null, "", "", "", "", "", "", "", "");
  personas: Persona[] = [];
  valorPorDefecto = 'USUARIO';

  isLogged = false;
  isLoggedDel: boolean = false;
  nuevoUsuario: NuevoUsuario[] = [];
  userId: number;
  nombre: string;

  verSeleccion: number;
  value: number;

  email: any;
  correo: any;
  redes_up:boolean=false;
  correo_up:boolean=false;

  imagen_user: string = '/assets/julio.png';

  // img_base64_send_pdf:any=this.getBase64ImageFromURL(this.persona.img);
  // img_base64_send_pdf:any=this.getBase64ImageFromURL(this.persona.img);

  constructor(
    private router: Router,
    private tokenservice: TokenService,
    private authService: AuthService,
    public personaService: PersonaService,
    private envioUsuarioIdService: EnvioUsuarioIdService,
  ) { }

  ngOnInit(): void {
    this.token();
    this.cargarId();
    this.cargarPersonas();
  }

  token() {
    if (this.tokenservice.getToken()) {
      this.isLogged = true;
    } else {
      this.isLogged = false
    }
    // console.log("username: "+this.tokenservice.getUserName())
  }
  // getBase64ImageFromURL(url: string) {
  //   return new Promise((resolve, reject) => {
  //     var img = new Image();
  //     // img.setAttribute("crossOrigin", "anonymous");
  //     img.setAttribute("crossOrigin",'use-credentials');

  //     img.onload = () => {
  //       var canvas = document.createElement("canvas");
  //       canvas.width = img.width;
  //       canvas.height = img.height;

  //       var ctx = canvas.getContext("2d");
  //       ctx.drawImage(img, 0, 0);

  //       var dataURL = canvas.toDataURL("image/png");

  //       resolve(dataURL);
  //     };
  //     img.onerror = error => {
  //       reject(error);
  //     };
  //     img.src = url;
  //   });
  // }


  habilitarDelUser(userId: number) {
    if (userId == 1) {
      this.isLoggedDel = true;
    } else {
      this.isLoggedDel = false
    }
    console.log("id usuario: "+this.userId + " isLoggedDel:  "+this.isLoggedDel+ " isLogged: "+ this.isLogged)
  }

  cargarId() {
    this.authService.lista().subscribe(
      data => {
        this.nuevoUsuario = data;
        this.nuevoUsuario.forEach(nuevo => {
          if (nuevo.nombreUsuario == this.tokenservice.getUserName()) {
            console.log(" desde if: " + nuevo.nombreUsuario + " -  id: " + nuevo.id);
            this.userId = nuevo.id;
            this.nombre = nuevo.nombre;
            this.habilitarDelUser(this.userId);
            this.cargarPersona(this.userId);
            return
          } if (this.verSeleccion) {
            this.cargarPersona(this.verSeleccion);
            console.log("Persona: " + this.verSeleccion);

          } if (!this.tokenservice.getToken()) {
            this.userId=1;
            this.cargarPersona(1);
            console.log("Persona: 1");

          }

        })
      })
  }

  cargarPersona(id: number): void {
    this.personaService.detail(id).subscribe((data) => {
      this.persona = data;
    });

    this.cargarEmail(id);
    // console.log("Persona: " + JSON.stringify(this.persona))

  }

  cargarPersonas(): void {
    this.personaService.lista().subscribe((data) => {
      this.personas = data;
      // console.log("Persona: " + JSON.stringify(this.personas))
    })
  }


  onLogOut(): void {
    this.tokenservice.logOut();
    window.location.reload();
  }
  login() {
    this.router.navigate(['/login'])
  }
  newUser(): void {
    this.router.navigateByUrl('/nuevousuario');
  }

  sendEmail(): void {
    this.router.navigateByUrl('/sendemail');
  }

  delUser(): void {
    this.router.navigateByUrl('/delusuario');
  }

  modal_up(): void {
    this.router.navigateByUrl('/modal');
  }



  btnSubmit() {
    ('loading');
    setTimeout(function () {
      ('reset');
    }, 8000);

  }

  onValue_new(id: any, nombre: string, apellido: string) {
    this.valorPorDefecto = `${nombre} ${apellido}`;
    this.verSeleccion = parseInt(id, 10);
    console.log("Value: " + this.verSeleccion);
    this.envioUsuarioIdService.selecionUsuarioId = this.verSeleccion;
    this.envioUsuarioIdService.cargadorUsuarioId.emit({
      data: this.verSeleccion
    });
    this.userId=this.verSeleccion
    this.cargarPersona(this.verSeleccion);
    if(id==1){
      this.redes_up=true
      this.correo_up=true
    }else{
      this.correo_up=true;
      this.redes_up=false
    }

  }

  cargarEmail(id: string | number): void {
    this.authService.lista().subscribe(
      data => {
        data
        this.email = (JSON.stringify(data));
        const objetoJSON_00 = JSON.parse(JSON.stringify(data));
        for (let i = 0; i < objetoJSON_00.length; i++) {
          const objetoJSON_new = JSON.parse(JSON.stringify(data[i]));
          if (objetoJSON_new.id == id) {
            console.log("desde if email: " + objetoJSON_new.email);
            this.correo = objetoJSON_new.email
          }
        }
      }
    )
  }
}


