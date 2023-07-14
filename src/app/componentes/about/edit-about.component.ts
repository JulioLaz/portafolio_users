import { Component, OnInit } from '@angular/core';
import { deleteObject, getStorage, ref } from '@angular/fire/storage';
import { Router } from '@angular/router';
import { NuevoUsuario } from 'src/app/model/nuevo-usuario';
import { Persona } from 'src/app/model/persona.model';
import { AuthService } from 'src/app/service/auth.service';
import { ImgService } from 'src/app/service/img.service';
import { PersonaService } from 'src/app/service/persona.service';
import { TokenService } from 'src/app/service/token.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-about',
  templateUrl: './edit-about.component.html',
  styleUrls: ['./edit-about.component.css']
})

export class EditAboutComponent implements OnInit {
  personas: Persona = null;
  spinerBtn: boolean = true;
  id: number;
  nuevoUsuario: NuevoUsuario[] = [];
  isSpiner: boolean = false;
  imagen: string;

  constructor(
    private personaService: PersonaService,
    private router: Router,
    private tokenService: TokenService,
    private authService: AuthService,
    public imgService: ImgService
  ) { }

  ngOnInit(): void {

    this.authService.lista().subscribe(
      data => {
        this.nuevoUsuario = data;
        this.nuevoUsuario.forEach(nuevo => {
          if (nuevo.nombreUsuario == this.tokenService.getUserName()) {
            // console.log(" desde if: " + nuevo.nombreUsuario + " -  id: " + nuevo.id + "this.tokenService.getUserName(): " + this.tokenService.getUserName());
            this.id = nuevo.id;
            this.cargarPersona();
          }
        });
      }
    )
  }

  cargarPersona(): void {
    this.personaService.detail(this.id).subscribe((data) => {
      this.personas = data;
      this.imagen = data.img;
      // console.log('imagen url:'+this.imagen )
    })
  }

  onUpdate(): void {
    // this.personas.img = this.imgService.url;  !!!  FIREBASE IMAGENES  !!!
    this.personaService.update(this.id, this.personas).subscribe({
      next: () => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: "Persona editada: " + this.personas.nombre + " id: " + this.id,
          showConfirmButton: false,
          timer: 2000
        }),
          console.log("Persona editada: " + this.personas.nombre + " id: " + this.id);
        this.router.navigate(['']);
      },
      error: (err) => {
        alert("Error al modificar la datos de la persona id: " + this.id + " persona: " + this.personas.nombre + " error: " + err);
        this.router.navigate(['']);
      }
    }
    )
  }


  //  FIREBASE IMAGENES //

  // uploadImg($event: any) {
  //   const imagen_cargada:any=($event); // const imagen_cargada:any=this.getBase64ImageFromURL($event);
  //   this.isSpiner = true;
  //   this.delImg();
  //   const name = "usuario_" + this.personas.nombre + "_" + this.personas.apellido + "_" + this.id;
  //   this.imgService.uploadImg(imagen_cargada, name);
  //   console.log("desde edit-about-component.ts: " + name)
  // }

  // delImg() {
  //   const name = "usuario_" + this.personas.nombre + "_" + this.personas.apellido + "_" + this.id;
  //   const storage = getStorage();
  //   const desertRef = ref(storage, `imagen/` + name);  // Create a reference to the file to delete

  //   // Delete the file
  //   deleteObject(desertRef).then(() => {
  //     console.log("delete img: " + desertRef)
  //   }).catch((error) => {
  //     console.log('Error al cargar imagen: ' + error)
  //   });
  // }

}
