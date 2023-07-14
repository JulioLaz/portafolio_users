import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Hardsskills } from 'src/app/model/hardsskills';
import { NuevoUsuario } from 'src/app/model/nuevo-usuario';
import { AuthService } from 'src/app/service/auth.service';
import { SHardSSkillsService } from 'src/app/service/s-hard-sskills.service';
import { TokenService } from 'src/app/service/token.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-hard-soft-skill',
  templateUrl: './new-hard-soft-skill.component.html',
  styleUrls: ['./new-hard-soft-skill.component.css']
})

export class NewHardSoftSkillComponent implements OnInit {
  nuevoUsuario: NuevoUsuario[] = [];
  spinerBtn:boolean=true;
  nombre: string;
  porcentaje: string;
  imgURL: string;
  usuarioId:number;

  constructor(
    private sHardSSkillsService: SHardSSkillsService,
    private router: Router,
    private tokenService: TokenService,
    private authService: AuthService
    ) { }

  ngOnInit(): void {
    this.cargarUsuarioId();
  }

  onCreate(): void {
    const skill = new Hardsskills(this.nombre, this.porcentaje, this.imgURL,this.usuarioId);
    this.sHardSSkillsService.save(skill).subscribe({
      next: () => {
        // console.log("skill añadida"),
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'skill añadida correctamente',
            showConfirmButton: false,
            timer: 1500
          }),
          this.router.navigate([''])
      },
      error: (e: string) => {
        // console.log("Falló"),
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No se pudo eliminar!',
            footer: 'error: ' + e
          })
      },
      complete: () => console.log('complete')
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
}
