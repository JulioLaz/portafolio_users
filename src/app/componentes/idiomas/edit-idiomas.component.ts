import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Idiomas } from 'src/app/model/idiomas';
import { SIdiomasService } from 'src/app/service/s-idiomas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-idiomas',
  templateUrl: './edit-idiomas.component.html',
  styleUrls: ['./edit-idiomas.component.css']
})

export class EditIdiomasComponent implements OnInit {
  idiomas: Idiomas=null;
  spinerBtn:boolean=true;

  constructor(
    private sIdiomasService:SIdiomasService,
    private activatedRouter: ActivatedRoute,
    private router: Router
    )
    {}

    ngOnInit(): void {
      this.cargarIdioma()
    }

    cargarIdioma(){
      const id = this.activatedRouter.snapshot.params['id'];
      this.sIdiomasService.detail(id).subscribe({
          next:(data)=>{this.idiomas = data},
          error:(err) =>{Swal.fire("Error al cargar idioma"+ err),
             this.router.navigate([''])}
        })
      }

    onUpdate(): void{
      const id = this.activatedRouter.snapshot.params['id'];
      this.sIdiomasService.update(id, this.idiomas).subscribe({
       next:()=>{
        console.log("idioma editado: "+this.idiomas.nombre ),
       Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'idioma editado: '+this.idiomas.nombre,
        showConfirmButton: false,
        timer: 1800
      }),
          this.router.navigate([''])},
      error:() => {
          Swal.fire("Error al modificar idioma");
          this.router.navigate([''])
        }
        })
    }

}

