import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { LoginUsuario } from 'src/app/model/login-usuario';
import { Persona } from 'src/app/model/persona.model';
import { AuthService } from 'src/app/service/auth.service';
import { PersonaService } from 'src/app/service/persona.service';
import { TokenService } from 'src/app/service/token.service';
import { NuevoUsuario } from 'src/app/model/nuevo-usuario';
import { Rol } from 'src/app/model/rol';
import { Usuario } from 'src/app/model/usuario';
import { EnvioUsuarioIdService } from 'src/app/service/envio-usuario-id.service';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { HttpClient } from '@angular/common/http';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})

export class AboutComponent implements OnInit {
  persona: Persona = new Persona(null, "", "", "", "", "", "", "", "");
  nuevoUsuario: NuevoUsuario[] = [];
  usuario: NuevoUsuario[] = [];
  imagen: string;
  nombre: string;
  id: number;
  rol: Rol[] = [];
  userId: Usuario[] = [];
  img:string;
  imgExist:boolean=true;

  //////
  isLogged = false;
  isLoginFail = false;
  loginUsuario!: LoginUsuario;
  nombreUsuario!: string;
  password!: string;
  roles: string[] = [];
  errMsj!: string;
  spinerBtn: boolean = true;
  /////
  imagen_fondo:string='/assets/fondo_celeste.png';
  imagen_user:string='/assets/julio.png';
//////

  title_a:string;
  title_b:string;
  title_c:string;
  condicion_title_b:boolean=false;
  condicion_title_c:boolean=false;

  constructor(
    private tokenService: TokenService,
    public personaService: PersonaService,
    private authService: AuthService,
    public envioUsuarioIdService: EnvioUsuarioIdService,
    private http: HttpClient
  ) { }


  ngOnInit(): void {
    this.token();
    this.id = 1;
    this.cargarPersona(1);
    this.cargarId();
    this.cargarUsuario();
    this.envioUsuarioIdService.cargadorUsuarioId.subscribe(
      data=>{
        this.cargarPersona(data.data);
        // console.log("RECIBEINDO DATA DESDE ABOUT: "+data.data)
      }
      )
  }

  token() {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
  }

  cargarRoles() {
    this.authService.listaRol().subscribe(
      data => {
        this.rol = JSON.parse(JSON.stringify(data));
        this.rol.forEach(e => console.log(e.id + "typeof: " + typeof e.id + typeof this.rol));
        this.rol.forEach(i => i.id);
        // console.log("Rol: " + JSON.stringify(this.rol));
        // console.log("Data: " + (JSON.stringify(data)));
      }
    )
  }

  cargarId() {
    this.authService.lista().subscribe(
      data => {
        this.nuevoUsuario = data;
        this.nuevoUsuario.forEach(nuevo => {
          if (nuevo.nombreUsuario == this.tokenService.getUserName()) {
            // console.log(" desde if: " + nuevo.nombreUsuario + " -  id: " + nuevo.id);
            this.id = nuevo.id;
            this.cargarPersona(this.id);
          }
        })
      }
    )
  };

  cargarPersona(id: number): void {
    this.personaService.detail(id).subscribe((data) => {
      this.persona = data;
      if (this.persona.title.includes('&')) {
        this.condicion_title_b=true;
        const partes: string[] = this.persona.title.split('&');
        this.title_a = partes[0].trim();
        this.title_b= partes[1].trim();
        if (partes.length>2){
          this.condicion_title_c=true;
          this.title_c= partes[2].trim();
        }
      } else {
        this.condicion_title_b=false;
        this.title_a = this.persona.title;
      }
      this.img=(JSON.stringify(this.persona.img));
      if((JSON.stringify(this.persona.img)).length<3){
        this.img="../../../assets/julio.png";
        this.imgExist=false;
      }else{
        this.img=this.persona.img;
        // console.log('imagen  url'+ this.img);
      }
    })
  }

  downloadImage(imagenn) {
    const imageUrl = imagenn;

    this.http.get(imageUrl, { responseType: 'blob' }).subscribe((blob: Blob) => {
      const downloadLink = document.createElement('a');
      downloadLink.href = window.URL.createObjectURL(blob);
      downloadLink.download = 'imagen.jpg';
      downloadLink.click();
    });
  }


  cargarUsuario(): void {
    this.authService.lista().subscribe((data) => {
      this.usuario = data;
      this.usuario.forEach(nuevo => {
        if (nuevo.id == this.id) {
          // console.log("usuario: "+ nuevo.nombre)
        }
      })
    })
  }

  cargarIdXNombre() {
    const nombre: String = "A";
    // console.log("cargarIdXNombre Nombre: " + nombre)
    this.authService.nombreXid(nombre).subscribe(
      data => {
        this.userId = data;
        // console.log(this.userId);
        // console.log("cargarIdXNombre: " + typeof data + JSON.stringify(data));
      }
    )
  }

}
