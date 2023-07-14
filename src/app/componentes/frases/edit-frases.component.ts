import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Frases } from 'src/app/model/frases';
import { NuevoUsuario } from 'src/app/model/nuevo-usuario';
import { AuthService } from 'src/app/service/auth.service';
import { SFrasesService } from 'src/app/service/s-frases.service';
import { TokenService } from 'src/app/service/token.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-frases',
  templateUrl: './edit-frases.component.html',
  styleUrls: ['./edit-frases.component.css']
})
export class EditFrasesComponent implements OnInit {
  frases: Frases = null;
  spinerBtn: boolean = true;

  autor: string = "";
  frase: string = "";

  seccionId: number = 1;
  usuarioId: number = 2;
  nuevoUsuario: NuevoUsuario[] = [];
  frasesUsuarioId: Frases[] = [];

  constructor(
    private sFrasesService: SFrasesService,
    // private sFrases: SFrasesService,
    private router: Router,
    private authService: AuthService,
    private tokenService: TokenService,
    private activatedRouter: ActivatedRoute,

  ) { }

  ngOnInit(): void {
    this.cargarFrase();
    const id = this.activatedRouter.snapshot.params['id'];
    // console.log("idFrase: " + id)
  }

  cargarFrase() {
    const id = this.activatedRouter.snapshot.params['id'];
    // console.log("idFrase: " + id)
    this.sFrasesService.detail(id).subscribe({
      next:(data)=>{
        this.frases = data;
      },
       error:(err) => {
        Swal.fire("Error al cargar frase" + err);
        this.router.navigate(['']);
      }
    })
  }

  onUpdate() {
    const id = this.activatedRouter.snapshot.params['id'];
    // console.log("idFrase: " + id)

    this.sFrasesService.update(id, this.frases).subscribe({
      next: () => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Frase editada',
          showConfirmButton: false,
          timer: 2000
        }),
        this.router.navigate(['']);
      },
      error: () => {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Error al modificar la frase: '+this.frases,
          showConfirmButton: false,
          timer: 2200
        }),
        this.router.navigate(['']);
      }
    })
  }

  cargarUsuarioId(): void {
    this.authService.lista().subscribe(
      data => {
        this.nuevoUsuario = data;
        this.nuevoUsuario.forEach(nuevo => {
          if (nuevo.nombreUsuario == this.tokenService.getUserName()) {
            this.usuarioId = nuevo.id;
          }
        })
      })
  }
  ///     <<<<VER>>>>

  // cargarFraseUsuarioId(usuarioId: number){
  //   this.sFrases.findAllUsuarioId(usuarioId).subscribe(
  //     data=>{data
  //       this.frasesUsuarioId=JSON.parse(JSON.stringify(data));
  //       this.frasesUsuarioId.forEach(x=>{
  //       if(x.seccionId == this.seccionExp){
  //         this.frase = x.frases; this.autor = x.autor;
  //         console.log("frases: "+x.frases+" autor: "+x.autor+ " id: "+ x.id+"seccionID: "+ x.seccionId+"usuarioId: "+x.usuarioId)
  //       }
  //     })
  //   })
  // }
}
