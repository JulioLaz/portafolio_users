import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NuevoUsuario } from 'src/app/model/nuevo-usuario';
import { AuthService } from 'src/app/service/auth.service';
import { PersonaService } from 'src/app/service/persona.service';
import { SEducacionService } from 'src/app/service/s-educacion.service';
import { SExperienciaService } from 'src/app/service/s-experiencia.service';
import { SFrasesService } from 'src/app/service/s-frases.service';
import { SHardSSkillsService } from 'src/app/service/s-hard-sskills.service';
import { SIdiomasService } from 'src/app/service/s-idiomas.service';
import { SProyectosService } from 'src/app/service/s-proyectos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-delete-usuario',
  templateUrl: './delete-usuario.component.html',
  styleUrls: ['./delete-usuario.component.css']
})
export class DeleteUsuarioComponent implements OnInit {
  usuario: NuevoUsuario[] = [];

  constructor(
    public personaService: PersonaService,
    private authService: AuthService,
    private router: Router,
    private sEducacion: SEducacionService,
    private sFrases: SFrasesService,
    private sExperiencia: SExperienciaService,
    private sHardSSkillsService: SHardSSkillsService,
    private sIdiomasService: SIdiomasService,
    private sProyectosService: SProyectosService,
  ) { }

  ngOnInit(): void {
    this.cargarUsuario();
  }


  cargarUsuario(): void {
    this.authService.lista().subscribe((data) => {
      this.usuario = data;
          // console.log("usuario: "+ JSON.stringify(this.usuario))
    })
  }

  delete(id?: number) {
    if (id != undefined) {
      this.authService.delete(id).subscribe({
        next: () => { console.log("Usuario eliminado id: "+ id),
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Usuario Eliminado',
          showConfirmButton: false,
          timer: 1800
        })
        // ,this.router.navigate([''])
      },
        error: () => { alert("No se pudo borrar el usuario"), this.router.navigate(['']) },
        complete: () => { console.info('complete') }
      })
      this.personaService.delete(id).subscribe({
        next: () => { console.log("Persona eliminada id: "+ id)
        // ,this.router.navigate([''])
      },
        error: () => { alert("No se pudo borrar la persona"), this.router.navigate(['']) },
        complete: () => { console.info('complete') }
      })
      this.sEducacion.deleteUsuarioId(id).subscribe({
        next: () => { console.log("Educacion eliminada usuarioId: "+ id)
        // , this.router.navigate([''])
      },
        error: () => { alert("No se pudo borrar la Educacion"+ id), this.router.navigate(['']) },
        complete: () => { console.info('complete') }
      })
    }
      this.sExperiencia.deleteUsuarioId(id).subscribe({
        next: () => { console.log("Experiencia eliminada usuarioId: "+ id)
        // , this.router.navigate([''])
      },
        error: () => { alert("No se pudo borrar la Experiencia"+ id), this.router.navigate(['']) },
        complete: () => { console.info('complete') }
      })

      this.sFrases.deleteUsuarioId(id).subscribe({
        next: () => { console.log("Frases eliminada usuarioId: "+ id)
        // , this.router.navigate([''])
      },
        error: () => { alert("No se pudo borrar la Frases"+ id), this.router.navigate(['']) },
        complete: () => { console.info('complete') }
      })

      this.sHardSSkillsService.deleteUsuarioId(id).subscribe({
        next: () => { console.log("HardSSkills eliminada usuarioId: "+ id)
        // , this.router.navigate([''])
      },
        error: () => { alert("No se pudo borrar la HardSSkills"+ id), this.router.navigate(['']) },
        complete: () => { console.info('complete') }
      })

      this.sIdiomasService.deleteUsuarioId(id).subscribe({
        next: () => { console.log("Idiomas eliminado usuarioId: "+ id)
        // , this.router.navigate([''])
      },
        error: () => { alert("No se pudo borrar el Idiomas"+ id), this.router.navigate(['']) },
        complete: () => { console.info('complete') }
      })

      this.sProyectosService.deleteUsuarioId(id).subscribe({
        next: () => { console.log("Proyecto eliminado usuarioId: "+ id)
        // , this.router.navigate([''])
      },
        error: () => { alert("No se pudo borrar el Proyecto"+ id), this.router.navigate(['']) },
        complete: () => { console.info('complete') }
      })
      location.reload();
  }
}
