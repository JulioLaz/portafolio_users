import { Component, OnInit } from '@angular/core';
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

  loader: boolean;

  persona: Persona = new Persona(null, "", "", "", "", "", "", "", "");
  personas: Persona[] = [];
  valorPorDefecto = 'USUARIO';

  isLogged = false;
  isLoggedDel: boolean = false;
  nuevoUsuario: NuevoUsuario[] = [];
  userId: number;
  nombre: string;
  cargando_datos: boolean = true;
  cargando_user: boolean = false;
  cargando_users: boolean = false;
  cargando_user_id: boolean = false;
  cargando_user_mail: boolean = false;
  cargando_info_user: string;
  cargando_info_user_id: string;
  cargando_info_user_mail: string;

  verSeleccion: number;
  value: number;

  email: any;
  correo: any;
  redes_up: boolean = false;
  correo_up: boolean = false;

  imagen_user: string = '/assets/julio.png';

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
  ///////////////////////////////////
  progressValue: number = 10;

  updateProgress(value: number) {
    this.progressValue += value;
    if (this.progressValue < 0) {
      this.progressValue = 0;
    } else if (this.progressValue > 100) {
      this.progressValue = 100;
    }
  }
  ///////////////////////////////////
  token() {
    if (this.tokenservice.getToken()) {
      this.isLogged = true;
    } else {
      this.isLogged = false
    }
  }

  habilitarDelUser(userId: number) {
    if (userId == 1) {
      this.isLoggedDel = true;
    } else {
      this.isLoggedDel = false
    }
    console.log("id usuario: " + this.userId + " isLoggedDel:  " + this.isLoggedDel + " isLogged: " + this.isLogged)
  }

  cargarId() {

    this.authService.lista().subscribe(
      data => {
        this.nuevoUsuario = data;
        if (!this.tokenservice.getToken()) {
          console.log("Persona: 1");
          this.cargando_users = true;

          this.progressValue = 20;
          console.log("this.progressValue desde cargarId(): ", this.progressValue)
          this.cargando_info_user = `Cargando datos de Julio A. Lazarte`;
          return this.userId = 1, this.cargarPersona(1)
        }
        this.nuevoUsuario.forEach(nuevo => {

          if (nuevo.nombreUsuario == this.tokenservice.getUserName()) {
            console.log(" desde if: " + nuevo.nombreUsuario + " -  id: " + nuevo.id);
            this.userId = nuevo.id;
            this.nombre = nuevo.nombre;
            this.habilitarDelUser(this.userId);
            this.cargarPersona(this.userId);
            console.log('desde encabezado: ', this.nombre)
          } else if (this.verSeleccion) {
            this.cargarPersona(this.verSeleccion);
            console.log("Persona: " + this.verSeleccion);

          }
        })
      })
  }

  cargarPersona(id: number): void {

    console.log("this.progressValue desde cargarPersona(): ", this.progressValue)
    this.personaService.detail(id).subscribe((data) => {
      this.persona = data;
      this.progressValue += 30;
      console.log("this.progressValue desde cargarPersona(): ", this.progressValue)
      this.cargarEmail(id);
      // return;
    });
    // this.cargarEmail(id);
    // return;
    // console.log("Persona: " + JSON.stringify(this.persona))

  }

  cargarPersonas(): void {
    this.personaService.lista().subscribe((data) => {
      this.personas = data;
      console.log("Persona: cargatodos los datos. habilitar console para ver todo ");
      // console.log("Persona: " + JSON.stringify(this.personas));
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
      ('reset')
    }, 8000);
  }

  onValue_new(id: any, nombre: string, apellido: string) {
    this.cargando_datos = true;
    this.valorPorDefecto = `${nombre} ${apellido}`;
    this.verSeleccion = parseInt(id, 10);
    console.log("Value: " + this.verSeleccion);
    this.envioUsuarioIdService.selecionUsuarioId = this.verSeleccion;
    this.envioUsuarioIdService.cargadorUsuarioId.emit({
      data: this.verSeleccion
    });
    this.cargando_user_id = true;
    this.cargando_users = false;
    this.progressValue = 20;
    this.cargando_info_user_id = `Cargando usuario ${this.valorPorDefecto}`;

    this.userId = this.verSeleccion;
    this.cargarPersona(this.verSeleccion);
    if (id == 1) {
      this.redes_up = true
      this.correo_up = true
    } else {
      this.correo_up = true;
      this.redes_up = false
    }
    console.log("this.progressValue desde onValue_new(): ", this.progressValue)
  }

  cargarEmail(id: number): void {
    console.log("this.progressValue desde email(): ", this.progressValue)
    this.cargando_info_user_mail = `Cargando email`;
    this.progressValue += 0;
    console.log("this.progressValue desde email(): ", this.progressValue)
    this.cargando_user_mail = true;

    this.authService.getIdUsuario(id).subscribe(
      data => {
        data
        this.correo = (JSON.parse(JSON.stringify(data))).email;
        this.progressValue += 10;

        console.log("desde cargarEmail: " + this.correo);

        console.log("this.progressValue desde email(): ", this.progressValue)
        // this.progressValue = 100;
        if (this.valorPorDefecto == 'USUARIO') {
          // this.cargando_datos = false;
          setTimeout(() => {
            let progressValues = this.progressValue;
            const incrementInterval = setInterval(() => {
              progressValues += 10;
              this.progressValue = progressValues;
              console.log('Incremento:', progressValues);

              if (progressValues >= 100) {
                clearInterval(incrementInterval);
                this.cargando_user_id = false;
                this.cargando_user_mail = false;
                this.cargando_datos = false;
              }
            }, 3000)}, 8000);
        }else{
          setTimeout(() => {
            let progressValues = this.progressValue;
            const incrementInterval = setInterval(() => {
              progressValues += 10;
              this.progressValue = progressValues;
              console.log('Incremento:', progressValues);

              if (progressValues >= 100) {
                clearInterval(incrementInterval);
                this.cargando_user_id = false;
                this.cargando_user_mail = false;
                this.cargando_datos = false;
              }

            }, 200)}, 1000);
        }
      }
    )

  }
}


