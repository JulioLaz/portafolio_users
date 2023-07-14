import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Cursos } from 'src/app/model/cursos';
import { Educacion } from 'src/app/model/educacion';
import { Experiencia } from 'src/app/model/experiencia';
import { Frases } from 'src/app/model/frases';
import { Hardsskills } from 'src/app/model/hardsskills';
import { Idiomas } from 'src/app/model/idiomas';
import { LoginUsuario } from 'src/app/model/login-usuario';
import { NuevoUsuario } from 'src/app/model/nuevo-usuario';
import { Persona } from 'src/app/model/persona.model';
import { Proyectos } from 'src/app/model/proyectos';
import { Roles } from 'src/app/model/roles';
import { Usuario } from 'src/app/model/usuario';
import { AuthService } from 'src/app/service/auth.service';
import { PersonaService } from 'src/app/service/persona.service';
import { SCursosService } from 'src/app/service/s-cursos.service';
import { SEducacionService } from 'src/app/service/s-educacion.service';
import { SExperienciaService } from 'src/app/service/s-experiencia.service';
import { SFrasesService } from 'src/app/service/s-frases.service';
import { SHardSSkillsService } from 'src/app/service/s-hard-sskills.service';
import { SIdiomasService } from 'src/app/service/s-idiomas.service';
import { SProyectosService } from 'src/app/service/s-proyectos.service';
import { TokenService } from 'src/app/service/token.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-new-usuario',
  templateUrl: './new-usuario.component.html',
  styleUrls: ['./new-usuario.component.css']
})
export class NewUsuarioComponent implements OnInit {

  loader = false;

  nombre: string;
  nameUsuario: string;
  email: string;
  password: string;
  authorities: string;
  spinerBtn: boolean = true;

  roles: Roles[] = [];
  id: number = null;
  rol: string[] = [];


  userId: Usuario[] = [];
  nuevoUsuario: NuevoUsuario[] = [];

  //MENSAJE ERROR
  errMsj: string;

  //persona
  apellido: string = "Developer";
  img: string = "../assets/img_jovenes.png";
  title: string = "Mi titulo es...";
  city: string = "San Miguel de...";
  edad: string = "45 años";
  titleAbout: string = "Sobre mi:";
  about: string = "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Deserunt ipsa vero, cupiditate at delectus debitis! Corrupti, deserunt voluptas placeat quos illo, consequatur doloremque provident accusamus earum commodi expedita error sapiente.";

  //frases
  secciones: number[] = [1, 2, 3, 4, 5, 6];
  autor: string = "Ludwig Wittgenstein";
  frase: string = "Los límites de mi idioma son los límites de mi mundo";

  //Educacion
  schoolE: string = "U. Harvard";
  titleE: string = "Developer, Full Stack";
  timeE: string = "6 años";
  startE: string = "2000";
  endE: string = "2006";
  estadoE: string = "Completado";
  cityE: string = "Cambridge, Massachusetts. USA";
  imgE: string = "https://webassets.hbs.edu/libs/framework/1.0/images/HBS-Online-Stacked.svg";

  //Experiencia
  nombreExp: string = 'UNESCO';
  cargoExp: string = 'DIRECTOR';
  descripcionExp: string = 'Gestion de .......';
  startExp: string = '2000';
  endExp: string = '2009';
  cityExp: string = 'London';

  //hss
  nombreHSS: string = "CSS";
  porcentajeHSS: string = "90%";
  imgURLHSS: string = "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/CSS3_logo_and_wordmark.svg/375px-CSS3_logo_and_wordmark.svg.png";

  //IDIOMAS
  nombreIdioma: string = "Ingles: nivel B1";
  porcentajeIdioma: string = "90%";
  imgURLIdioma: string = "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/CSS3_logo_and_wordmark.svg/375px-CSS3_logo_and_wordmark.svg.png";

  //Proyectos
  proyecto: string = "Portfolio";
  descripcionP: string = "Curriculum vitae";
  fechaP: string = "2022";
  imgProyecto: string = "https://i.imgur.com/gvniyaq.jpeg";
  imgLenguajesP: string = "https://i.imgur.com/MSvsCoR.png";
  urlProyecto: string = "https://juliolaz.github.io/juego-ahorcadito/";

  //Cursos
  curso : string='Alura';
  descripcion : string='Bootcamp';
  imgCurso: string='https://media.licdn.com/dms/image/C4D22AQE_il7NsVl5Kg/feedshare-shrink_1280/0/1676116177300?e=1684972800&v=beta&t=-8xXJq7yxI727oxSsVWxDcWQVJSIsw3H4AGaqxNDG5A';

  //onLogin
  loginUsuario!: LoginUsuario;
  isLogged = false;
  isLoginFail = false;
  nombreUsuario!: string;
  login: any;

  constructor(
    private tokenService: TokenService,
    public personaService: PersonaService,
    private authService: AuthService,
    private router: Router,
    private sFrases: SFrasesService,
    private sEducacion: SEducacionService,
    private sExperiencia: SExperienciaService,
    private sHardSSkillsService: SHardSSkillsService,
    private sIdiomasService: SIdiomasService,
    private sProyectosService: SProyectosService,
    private sCursos: SCursosService,
  ) { }



  ngOnInit(): void {
    this.cargarId();
  }

  onCreateUser(): void {
    const usuario = new Usuario(this.nombre, this.nameUsuario, this.email, this.password, this.roles);
    this.authService.nuevoUser(usuario).subscribe(
      {
        next: () => {
          this.onLogin(this.nameUsuario,this.password);
          this.cargarIdXNombre(this.nombre);
          // console.log('complete user '+usuario),

          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Usuario creado con EXITO',
            showConfirmButton: false,
            timer: 1000
          }),
          this.router.navigate([])
          },
          error: (err) => {
            this.errMsj = (JSON.stringify(err.error.mensaje)),
            Swal.fire({
              position: 'center',
              icon: 'error',
              title: this.errMsj,
              showConfirmButton: true,
            }),
            this.spinerBtn = true;
          },
          complete: () => {
            // this.onLogin(this.nameUsuario,this.password);
            // console.info('complete user '+usuario),
            // this.cargarIdXNombre(this.nombre);
            // this.router.navigate(['']);
            // setTimeout(() => {location.reload()}, 1000)
          }
        })
  }

  onCreateFrasesSeccion(): void {
    this.secciones.forEach(i => {
      const fra = new Frases(this.autor, this.frase, this.id, i);
      this.sFrases.save(fra).subscribe({
        next: () => { console.log("frase añadida numero: " + i) },
        error: () => { alert("falló al crear frase"), this.router.navigate(['']) },
        complete: () => console.info('complete frase')
      }
      )
    })
  }

  onCreateEducacion(): void {
    const educacion = new Educacion(this.schoolE, this.titleE, this.timeE, this.startE, this.endE, this.estadoE, this.cityE, this.imgE, this.id);
    this.sEducacion.save(educacion).subscribe({
      next: () => { console.info("Educacion añadida correctamente") },
      error: () => { alert("falló al crear educacion"), this.router.navigate(['']) },
      complete: () => console.info('complete educacion')
    }
    )
  }

  onCreateExperiencia(): void {
    const expe = new Experiencia(this.nombreExp, this.cargoExp, this.descripcionExp, this.startExp, this.endExp, this.cityExp, this.id);
    this.sExperiencia.save(expe).subscribe({
      next: () => { console.log("Experiencia añadida") },
      error: () => { console.error("Falló al crear experiencia"), alert("Falló al crear experiencia"); },
      complete: () => console.info('complete experiencia')
    })
  }

  onCreateHSS(): void {
    const skill = new Hardsskills(this.nombreHSS, this.porcentajeHSS, this.imgURLHSS, this.id);
    this.sHardSSkillsService.save(JSON.parse(JSON.stringify(skill))).subscribe({
      next: () => { console.log("Skill añadida") },
      error: () => { console.error("Falló al crear Skill"), alert("Falló al crear Skill"); },
      complete: () => console.info('complete skill')
    })
  }

  onCreateIdiomas(): void {
    const idiomas = new Idiomas(this.nombreIdioma, this.porcentajeIdioma, this.imgURLIdioma, this.id);
    this.sIdiomasService.save(JSON.parse(JSON.stringify(idiomas))).subscribe({
      next: () => { console.log("Idioma creado correctamente") },
      error: () => { console.log("falló al crear idioma"), alert("falló al crear idioma") },
      complete: () => console.info('complete idioma')
    })
  }

  onCreateProyecto(): void {
    const proyectos = new Proyectos(this.proyecto, this.descripcionP, this.fechaP, this.imgProyecto, this.imgLenguajesP, this.urlProyecto, this.id);
    this.sProyectosService.save(proyectos).subscribe({
      next: () => { console.log("Proyecto añadido correctamente") },
      error: () => { console.log("falló al crear proyecto") },
      complete: () => console.info('complete proyecto')
    })
  }

  onCreateCurso(): void {
    const cur = new Cursos(this.curso, this.descripcion, this.imgCurso, this.id);
    this.sCursos.save(cur).subscribe({
      next: () => { console.log("Curso añadido correctamente") },
      error: () => { console.log("falló al crear Curso") },
      complete: () => {console.info('complete proyecto')}
    })
  }

  newPersona(id: number, nombre: string): void {
    const persona = new Persona(id, nombre, this.apellido, this.img, this.title, this.city, this.edad, this.titleAbout, this.about);
    // console.log(" desde newPersona: nombre: " + this.nombre + " -  id: " + this.id);
    // console.log("Persona: " + JSON.stringify(persona));
    this.personaService.save(persona).subscribe(
      {
        next: () => { console.log("PERSONA añadida correctamente")},
        error: () => { alert("falló añadir nueva persona"), this.router.navigate(['']) },
        complete: () => console.info('complete')
      })
  }

  cargarId() {
    this.authService.lista().subscribe(
      data => {
        this.nuevoUsuario = data;
        this.nuevoUsuario.forEach(nuevo => {
          // console.log(" desde cargarid: " + nuevo.nombreUsuario + " -  id: " + nuevo.id);
          if (nuevo.nombreUsuario == this.tokenService.getUserName()) {
            this.id = nuevo.id;
          }
        })
      }
    )
  }

  cargarIdXNombre(nombre: String) {
    const nombreid: String = nombre;
    this.authService.nombreXid(nombreid).subscribe(
      data => {
        this.userId = data;
        this.id = JSON.parse(JSON.stringify(data));
        this.newPersona(this.id, this.nombre);
        this.onCreateFrasesSeccion();
        this.onCreateEducacion();
        this.onCreateExperiencia();
        this.onCreateHSS();
        this.onCreateIdiomas();
        this.onCreateProyecto();
        this.onCreateCurso();
        // this.router.navigate(['']);
        // setTimeout(() => {location.reload()}, 8000)
      })
  }

  onLogin(nombreUsuario:string, password:string): void {

    this.loginUsuario = new LoginUsuario(nombreUsuario, password);

    this.authService.login(this.loginUsuario).subscribe({
      next: (data) => {
        this.isLogged = true,
          this.isLoginFail = false,
          this.tokenService.setToken(data.token),
          this.tokenService.setUserName(data.nombreUsuario),
          this.tokenService.setAuthorities(data.authorities),
          this.rol = data.authorities,
          this.login = this.loginUsuario.password,
          this.nombreUsuario = data.nombreUsuario,
          this.router.navigate([''])
      }
    })

  }
}
