import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Idiomas } from 'src/app/model/idiomas';
import { NuevoUsuario } from 'src/app/model/nuevo-usuario';
import { AuthService } from 'src/app/service/auth.service';
import { SIdiomasService } from 'src/app/service/s-idiomas.service';
import { TokenService } from 'src/app/service/token.service';
@Component({
  selector: 'app-new-idiomas',
  templateUrl: './new-idiomas.component.html',
  styleUrls: ['./new-idiomas.component.css']
})
export class NewIdiomasComponent implements OnInit {

  nombre: string = "";
  porcentaje: string = "";
  imgURL: string = "";
  usuario: string = "";

  usuarioId: number;
  nuevoUsuario: NuevoUsuario[] = [];

  spinerBtn: boolean = true;
  personas: any;
  id: number;

  constructor(
    public activatedRouter: ActivatedRoute,
    private sIdiomasService: SIdiomasService,
    private router: Router,
    private authService: AuthService,
    private tokenService: TokenService,
  ) { }

  ngOnInit(): void {
    this.cargarUsuarioId();
  }

  onCreate(): void {
    const idiomas = new Idiomas(this.nombre, this.porcentaje, this.imgURL, this.usuarioId);
    this.sIdiomasService.save(idiomas).subscribe({
      next: () =>{alert("Idioma creado correctamente"), this.router.navigate([''])},
      error: () =>{alert("falló"),this.router.navigate([''])},
      complete: () => console.info('complete')
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
