import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Proyectos } from 'src/app/model/proyectos';
import { SProyectosService } from 'src/app/service/s-proyectos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-proyecto',
  templateUrl: './edit-proyecto.component.html',
  styleUrls: ['./edit-proyecto.component.css']
})
export class EditProyectoComponent implements OnInit {
  proyectos: Proyectos = null;
  spinerBtn: boolean = true;

  constructor(
    private sProyectosService: SProyectosService,
    private activatedRouter: ActivatedRoute,
    private router: Router
    ){ }

  ngOnInit(): void {
    this.cargarProyecto();
  }

  cargarProyecto() {
    const id = this.activatedRouter.snapshot.params['id'];
    this.sProyectosService.detail(id).subscribe({
      next: (data) => { this.proyectos = data },
      error: (err) => {
        Swal.fire("Error al cargar Proyecto" + err),
        this.router.navigate([''])
      }
    })
  }

  onUpdate(): void {
    const id = this.activatedRouter.snapshot.params['id'];
    this.sProyectosService.update(id, this.proyectos).subscribe({
      next: () => {
        // console.log("Proyecto editado: " + this.proyectos.proyectos),
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Proyecto editado: ' + this.proyectos.proyectos,
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
}
