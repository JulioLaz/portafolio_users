import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Experiencia } from 'src/app/model/experiencia';
import { SExperienciaService } from 'src/app/service/s-experiencia.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-experiencia',
  templateUrl: './edit-experiencia.component.html',
  styleUrls: ['./edit-experiencia.component.css']
})
export class EditExperienciaComponent implements OnInit {
  expLab: Experiencia = null;
  spinerBtn: boolean = true;

  constructor(private sExperiencia: SExperienciaService, private activatedRouter: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.cargarExperiencia();
  }

  cargarExperiencia() {
    const id = this.activatedRouter.snapshot.params['id'];
    this.sExperiencia.detail(id).subscribe({
      next:(data)=>{this.expLab = data},
      error:(err)=>{Swal.fire("Error al cargar experiencia"+ err),
      this.router.navigate([''])}
    }
    )}

  onUpdate(): void {
    const id = this.activatedRouter.snapshot.params['id'];
    this.sExperiencia.update(id, this.expLab).subscribe({
      next: () => {
        // console.log("Educacion editada: "+this.expLab.nombreE ),
        Swal.fire({
         position: 'center',
         icon: 'success',
         title: 'Educacion editada: '+this.expLab.nombreE,
         showConfirmButton: false,
         timer: 1800
        }),
        this.router.navigate([''])},
      error: (err) => {
        Swal.fire("Error al modificar experiencia" + err),
        this.router.navigate([''])
      }
    })

  }
}
