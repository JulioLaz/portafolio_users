import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NuevoUsuario } from 'src/app/model/nuevo-usuario';
import { Proyectos } from 'src/app/model/proyectos';
import { AuthService } from 'src/app/service/auth.service';
import { SProyectosService } from 'src/app/service/s-proyectos.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-new-proyecto',
  templateUrl: './new-proyecto.component.html',
  styleUrls: ['./new-proyecto.component.css']
})
export class NewProyectoComponent implements OnInit {
  proyecto: string="";
  descripcion: string="";
  fecha: string="";
  imgProyecto: string="";
  imgLenguajes: string="";
  urlProyecto: string="";

  usuarioId: number;
  nuevoUsuario: NuevoUsuario[] = [];

  spinerBtn:boolean=true;

  constructor(
    public activatedRouter: ActivatedRoute,
    private sProyectosService: SProyectosService,
    private router: Router,
    private authService: AuthService,
    private tokenService: TokenService,
    ) { }

  ngOnInit(): void {
    this.cargarUsuarioId();
  }

  onCreate(): void{
    const proyectos = new Proyectos(this.proyecto, this.descripcion,this.fecha,this.imgProyecto,this.imgLenguajes,this.urlProyecto,this.usuarioId);
    this.sProyectosService.save(proyectos).subscribe({
      next: () =>{alert("Proyecto añadido correctamente"), this.router.navigate([''])},
      error: () =>{alert("falló al crear proyecto"),this.router.navigate([''])},
      complete: () => console.info('complete proyecto')}
    )
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
