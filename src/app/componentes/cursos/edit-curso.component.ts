import { Component, OnInit } from '@angular/core';
import { deleteObject, getStorage, ref } from '@angular/fire/storage';
import { ActivatedRoute, Router } from '@angular/router';
import { Cursos } from 'src/app/model/cursos';
import { NuevoUsuario } from 'src/app/model/nuevo-usuario';
import { Persona } from 'src/app/model/persona.model';
import { AuthService } from 'src/app/service/auth.service';
import { ImgService } from 'src/app/service/img.service';
import { PersonaService } from 'src/app/service/persona.service';
import { SCursosService } from 'src/app/service/s-cursos.service';
import { TokenService } from 'src/app/service/token.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-curso',
  templateUrl: './edit-curso.component.html',
  styleUrls: ['./edit-curso.component.css']
})
export class EditCursoComponent implements OnInit {

  cursos: Cursos = null;
  spinerBtn: boolean = true;


  constructor(
    private router: Router,
    private activatedRouter: ActivatedRoute,
    private sCursos: SCursosService,

  ) { }

  ngOnInit(): void {
this.cargarCursos();

    // this.authService.lista().subscribe(
    //   data => {
    //     this.nuevoUsuario = data;
    //     this.nuevoUsuario.forEach(nuevo => {
    //       if (nuevo.nombreUsuario == this.tokenService.getUserName()) {
    //         console.log(" desde if: " + nuevo.nombreUsuario + " -  id: " + nuevo.id + "this.tokenService.getUserName(): " + this.tokenService.getUserName());
    //         this.id = nuevo.id;
    //         this.cargarPersona();
    //       }
    //     });
    //   }
    // )
  }

  // cargarPersona(): void {
  //   this.personaService.detail(this.id).subscribe((data) => {
  //     this.personas = data;
  //     this.imagen = data.img;
  //   })
  // }

  // cargarCursos(): void {
  //   this.sCursos.detail(this.id).subscribe((data) => {
  //     this.cursos = data;
  //     this.imgCurso = data.imgCurso;
  //     this.descripcion = data.descripcion;
  //   })
  // }
  cargarCursos() {
    const id = this.activatedRouter.snapshot.params['id'];
    this.sCursos.detail(id).subscribe({
      next: (data) => { this.cursos = data },
      error: (err) => {
        Swal.fire("Error al cargar Curso" + err),
        this.router.navigate([''])
      }
    })
  }
  // onUpdate(): void {
  //   this.cursos.imgCurso = this.imgService.url;
  //   this.sCursos.update(this.id, this.cursos).subscribe({
  //     next: () => {
  //       Swal.fire({
  //         position: 'center',
  //         icon: 'success',
  //         title: "Persona editada: " + this.cursos.curso + " id: " + this.id,
  //         showConfirmButton: false,
  //         timer: 2000
  //       }),
  //         console.log("Persona editada: " + this.cursos.curso + " id: " + this.id);
  //       this.router.navigate(['']);
  //     },
  //     error: (err) => {
  //       alert("Error al modificar la datos de la persona id: " + this.id + " persona: " + this.cursos.curso + " error: " + err);
  //       this.router.navigate(['']);
  //     }
  //   })
  // }

  onUpdate(): void {
    const id = this.activatedRouter.snapshot.params['id'];
    this.sCursos.update(id, this.cursos).subscribe({
      next: () => {
        // console.log("Curso editado: " + this.cursos.curso),
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Proyecto editado: ' + this.cursos.curso,
            showConfirmButton: false,
            timer: 1800
          }),
          this.router.navigate([''])
        },
        error: () => {
          Swal.fire("Error al modificar la proyecto");
          this.router.navigate([''])
        }
      })
    }

    // uploadImg($event: any) {
    //   this.isSpiner = true;
    //   this.delImg();
    //   const name = "usuario_" + this.cursos.curso + "_" + this.id;
    //   this.imgService.uploadImg($event, name);
    //   console.log("desde edit-about-component.ts: " + name)
    // }




  // delImg() {
  //   const name = "usuario_" + this.cursos.curso + "_" + this.id;
  //   const storage = getStorage();
  //   // Create a reference to the file to delete
  //   const desertRef = ref(storage, `imagen/` + name);

  //   // Delete the file
  //   deleteObject(desertRef).then(() => {

  //     console.log("delete img: " + desertRef)
  //   }).catch((error) => {
  //     console.log('Error al cargar imagen: ' + error)
  //   });
  // }

}
