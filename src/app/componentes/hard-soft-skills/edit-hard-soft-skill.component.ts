import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Hardsskills } from 'src/app/model/hardsskills';
import { SHardSSkillsService } from 'src/app/service/s-hard-sskills.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-hard-soft-skill',
  templateUrl: './edit-hard-soft-skill.component.html',
  styleUrls: ['./edit-hard-soft-skill.component.css']
})
export class EditHardSoftSkillComponent implements OnInit {
  hardsskills: Hardsskills=null;
  spinerBtn:boolean=true;

  constructor(
    private sHardSSkillsService:SHardSSkillsService,
    private activatedRouter: ActivatedRoute,
    private router: Router
    )
    {}

       ngOnInit(): void {
      this.cargarHardsskills();
    }

  cargarHardsskills(){
    const id = this.activatedRouter.snapshot.params['id'];
    this.sHardSSkillsService.detail(id).subscribe({
      next:(data)=>{this.hardsskills = data},
      error:(err) =>{Swal.fire("Error al cargar hardsskills"+ err),
         this.router.navigate([''])}
    })
  }

    onUpdate(): void{
      const id = this.activatedRouter.snapshot.params['id'];
      this.sHardSSkillsService.update(id, this.hardsskills).subscribe({
       next:()=>{
        // console.log("hardsskills editada: "+this.hardsskills.nombre ),
       Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'hardsskills editada: '+this.hardsskills.nombre,
        showConfirmButton: false,
        timer: 1800
      }),
          this.router.navigate([''])},
      error:() => {
          Swal.fire("Error al modificar la skill");
          this.router.navigate([''])
        }
        })
    }

}
