import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Educacion } from 'src/app/model/educacion';
import { Frases } from 'src/app/model/frases';
import { NuevoUsuario } from 'src/app/model/nuevo-usuario';
import { AuthService } from 'src/app/service/auth.service';
import { EnvioUsuarioIdService } from 'src/app/service/envio-usuario-id.service';
import { SEducacionService } from 'src/app/service/s-educacion.service';
import { SFrasesService } from 'src/app/service/s-frases.service';
import { TokenService } from 'src/app/service/token.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-educacion',
  templateUrl: './educacion.component.html',
  styleUrls: ['./educacion.component.css']
})
export class EducacionComponent implements OnInit {
  educacion: Educacion[] = [];
  nuevoUsuario: NuevoUsuario[] = [];
  frasesUsuarioId: Frases[] = [];
  usuarioId: number;

  id: number = 1;
  idFrases: number;
  seccionEdu: number = 1;
  frase: String;
  autor: String;
  existeFrase: boolean;

  constructor(
    private router: Router,
    private sFrases: SFrasesService,
    private sEducacion: SEducacionService,
    private tokenService: TokenService,
    private authService: AuthService,
    public envioUsuarioIdService: EnvioUsuarioIdService,
  ) { }

  isLogged = false;

  ngOnInit(): void {
    this.token();
    this.cargarUsuarioId();
    this.envioUsuarioIdService.cargadorUsuarioId.subscribe(
      data => {
        this.cargarEducacion(data.data);
        this.cargarFraseUsuarioId(data.data);
        // console.log("RECIBEINDO DATA: " + data.data)
      }
    )
  }
  token() {
    if (this.tokenService.getToken()) {
      this.isLogged = true
    } else { this.isLogged = false }
  }

  cargarEducacion(usuarioId: number): void {
    this.sEducacion.findAllUsuarioId(usuarioId).subscribe(
      data => {
        data
        this.educacion = JSON.parse(JSON.stringify(data));
      })
  }

  cargarFraseUsuarioId(usuarioId: number) {
    this.sFrases.findAllUsuarioId(usuarioId).subscribe(
      data => {
        data
        if (JSON.parse(JSON.stringify(data)) == false) { console.log("existe frases: " + JSON.stringify(data)) }

        this.frasesUsuarioId = JSON.parse(JSON.stringify(data));
        this.frasesUsuarioId.forEach(x => {
          if (x.seccionId == this.seccionEdu) {
            this.frase = x.frases;
            this.autor = x.autor;
            this.idFrases = x.id;
            // console.log("frases: "+x.frases+" autor: "+x.autor+ " id: "+ x.id+"  seccionID: "+ x.seccionId+"  usuarioId: "+x.usuarioId)
          } else {
          }
        })
      })
  }

  verificarExistenciaFrase(usuarioId: number): void {
    this.sFrases.findAllUsuarioId(usuarioId).subscribe(
      data => {
        data
        // console.log("data lengh"+ (JSON.parse(JSON.stringify(data))).length +"  "+JSON.parse(JSON.stringify(data)));
        if (JSON.parse(JSON.stringify(data)) == true) { console.log("existe frases: " + JSON.stringify(data)) }
        this.frasesUsuarioId = JSON.parse(JSON.stringify(data));
        this.frasesUsuarioId.forEach(x => {
          x.seccionId
          if (x.seccionId == 1) {
            // console.log("existe frases: "+x.seccionId)
            // this.existeFrase = true;
            // console.log("existe frases: "+this.existeFrase +" seccionId: "+x.seccionId +" usuarioId: "+ x.usuarioId)
          } else {
            // console.log("No existe frases: "+x.seccionId)

            // this.cargarFraseUsuarioId(1);
            // this.onCreate();
            //     console.log(`No  +existe frases: ${this.existeFrase}  ${this.existeFrase}`)

          }
        })
      })
  }
  onCreateFrase(): void {
    const fra = new Frases("Julio", "Lo mejor de la vida", this.seccionEdu, this.usuarioId);
    // console.log("frase: "+JSON.stringify(fra));
    this.sFrases.save(fra).subscribe({
      next: () => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Frase añadida correctamente',
          showConfirmButton: false,
          timer: 1500
        }),
          this.router.navigate([''])
      },
      error: () => { alert("falló"), this.router.navigate(['']) },
      complete: () => console.info('complete')
    }
    )
  }

  cargarUsuarioId(): void {
    // console.log("EJECUTA EL METODO CARGAR USUARIO desde educacion");
    this.authService.lista().subscribe(
      data => {
        this.nuevoUsuario = data;
        this.nuevoUsuario.forEach(nuevo => {
          if (nuevo.nombreUsuario == this.tokenService.getUserName()) {
            this.usuarioId = nuevo.id;
            this.cargarFraseUsuarioId(this.usuarioId);
            this.cargarEducacion(this.usuarioId);

          }
        })
        if (this.tokenService.getUserName() == undefined) {
          this.cargarEducacion(this.envioUsuarioIdService.selecionUsuarioId);
          this.cargarFraseUsuarioId(this.envioUsuarioIdService.selecionUsuarioId);
          // console.log("this.envioUsuarioIdService.selecionUsuarioId: " + this.envioUsuarioIdService.selecionUsuarioId);
        }
      })
  }

  delete(nombres: string,id?: number) {
    if (id != undefined) {
      Swal.fire({
        title: 'Quieres borrar '+ nombres + '?',
        text: "Esto será irreversible! ",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, borrar '+nombres + '!'
      })
        .then((result) => {
          if (result.isConfirmed) {
            Swal.fire(
              'Borrado!',
              nombres+ ' ha sido eliminado.',
              'success'
            )
            this.sEducacion.delete(id).subscribe(
              {
                next: () => {
                  { this.cargarEducacion(this.usuarioId) }
                  this.router.navigate([''])
                },
                error: (e) => {
                  Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'No se pudo eliminar!',
                    footer: 'error: '+e
                  })
                },
                complete: () => { console.info('complete') }
              })
          }
        })
    }
  }

}
