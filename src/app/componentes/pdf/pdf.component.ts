import { Component, Input, OnInit } from '@angular/core';
import { LoginUsuario } from 'src/app/model/login-usuario';
import { Persona } from 'src/app/model/persona.model';
import { PersonaService } from 'src/app/service/persona.service';
import { TokenService } from 'src/app/service/token.service';
import { NuevoUsuario } from 'src/app/model/nuevo-usuario';
import { Rol } from 'src/app/model/rol';
import { Usuario } from 'src/app/model/usuario';
import { EnvioUsuarioIdService } from 'src/app/service/envio-usuario-id.service';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { SEducacionService } from 'src/app/service/s-educacion.service';
import { Educacion } from 'src/app/model/educacion';
import { SExperienciaService } from 'src/app/service/s-experiencia.service';
import { Experiencia } from 'src/app/model/experiencia';
import { SIdiomasService } from 'src/app/service/s-idiomas.service';
import { Idiomas } from 'src/app/model/idiomas';
import { SHardSSkillsService } from 'src/app/service/s-hard-sskills.service';
import { Hardsskills } from 'src/app/model/hardsskills';
import { SProyectosService } from 'src/app/service/s-proyectos.service';
import { Proyectos } from 'src/app/model/proyectos';
import { SCursosService } from 'src/app/service/s-cursos.service';
import { Cursos } from 'src/app/model/cursos';
import { SFrasesService } from 'src/app/service/s-frases.service';
import { Frases } from 'src/app/model/frases';
import { ImgService } from 'src/app/service/img.service';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import * as $ from 'jquery';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-pdf',
  templateUrl: './pdf.component.html',
  styleUrls: ['./pdf.component.css']
})

export class PdfComponent implements OnInit {

  @Input() valor_redes:boolean;
  @Input() imagen_users:any;

  personas: Persona = new Persona(null, "", "", "", "", "", "", "", "");
  nuevoUsuario: NuevoUsuario[] = [];
  usuario: NuevoUsuario[] = [];
  educacion: Educacion[] = [];
  expe: Experiencia[] = [];
  idioma: Idiomas[] = [];
  hardsskills: Hardsskills[] = [];
  proyectos: Proyectos[] = [];
  cursos: Cursos[] = [];
  frasesUsuarioId: Frases[] = [];
  frase: String;
  autor: String;
  name_img: any;
  opcionSeleccionado: number = null;

  imagen: string;
  nombre: string;
  id: number;
  rol: Rol[] = [];
  userId: Usuario[] = [];
  img: string;
  img_foto: any;
  imgExist: boolean = true;

  //////
  isLogged = true;
  isLoggedDel: boolean = false;

  loginUsuario!: LoginUsuario;
  nombreUsuario!: string;
  roles: string[] = [];
  errMsj!: string;
  spinerBtn: boolean = true;
  /////
  imagen_fondo: string = '/assets/fondo_celeste.png';
  imagen_user: string = '/assets/julio.png';
  imagen_user_base64: any =   this.getBase64ImageFromURL(this.imagen_user);
  down: boolean = false;
  email: any;
  emails: any;
  correo: any;
  /////////////

  constructor(
    private sIdiomasService: SIdiomasService,
    public personaService: PersonaService,
    public sEducacion: SEducacionService,
    public sExperienciaService: SExperienciaService,
    public envioUsuarioIdService: EnvioUsuarioIdService,
    public sHardSSkillsService: SHardSSkillsService,
    private sProyectos: SProyectosService,
    private sCursos: SCursosService,
    private sFrases: SFrasesService,
    private tokenservice: TokenService,
    public imgService: ImgService,
    public authService: AuthService,
    public router: Router,
  ) { }

  ngOnInit(): void {

    this.id = 1;
    this.envioUsuarioIdService.cargadorUsuarioId.subscribe(
      data => {
        this.cargarPersona(data.data);
        this.cargarEducacion(data.data);
        this.cargarExperiencia(data.data);
        this.cargarIdioma(data.data);
        this.cargarHardsSkills(data.data);
        this.cargarProyectos(data.data);
        this.cargarCursos(data.data);
        this.cargarFraseUsuarioId(data.data);
        this.cargarEmail(data.data);
        console.log("RECIBEINDO DATA DESDE PDF: " + data.data);
       }
    )
  }

  token() {
    if (this.tokenservice.getToken()) {
      this.isLogged = false
    } else {
      this.isLogged = true;
    }
  }

  cargarFraseUsuarioId(usuarioId: number): void {
    this.sFrases.findAllUsuarioId(usuarioId).subscribe(
      data => {
        data
        if (JSON.parse(JSON.stringify(data)) == false) { console.log("existe frases: " + JSON.stringify(data)) }

        this.frasesUsuarioId = JSON.parse(JSON.stringify(data));
        this.frasesUsuarioId.forEach(x => {
          if (x.seccionId == 1) {
            this.frase = x.frases;
            this.autor = x.autor;
          }
          else {
          }
        })
      })
  }

  cargarEmail(id: string | number): void {
    this.authService.lista().subscribe(
      data => {
        data
        this.email = (JSON.stringify(data));
        const objetoJSON_00 = JSON.parse(JSON.stringify(data));
        for (let i = 0; i < objetoJSON_00.length; i++) {
          const objetoJSON_new = JSON.parse(JSON.stringify(data[i]));
          if (objetoJSON_new.id == id) {
            console.log("desde if email: " + objetoJSON_new.email);
            this.correo = objetoJSON_new.email
          }
        }
      }
    )
  }

  cargarCursos(usuarioId: number): void {
    this.sCursos.findAllUsuarioId(usuarioId).subscribe(
      data => {
        data
        this.cursos = JSON.parse(JSON.stringify(data));
      })
  }

  cargarProyectos(usuarioId: number): void {
    this.sProyectos.findAllUsuarioId(usuarioId).subscribe(
      data => {
        data
        this.proyectos = JSON.parse(JSON.stringify(data));
      })
  }

  cargarHardsSkills(usuarioId: number): void {
    this.sHardSSkillsService.findAllUsuarioId(usuarioId).subscribe(
      data => {
        data
        this.hardsskills = JSON.parse(JSON.stringify(data));
      })
  }

  cargarIdioma(usuarioId: number): void {
    this.sIdiomasService.findAllUsuarioId(usuarioId).subscribe(
      data => {
        data
        this.idioma = JSON.parse(JSON.stringify(data));
      })
  }

  cargarPersona(id: number): void {
    this.personaService.detail(id).subscribe((data) => {
      this.personas = data;
      this.img = (JSON.stringify(this.personas.img));
      if ((JSON.stringify(this.personas.img)).length < 3) {
        this.img = "../../../assets/julio.png";
        this.imgExist = false;
      } else {
        this.img_foto = this.personas.img;
      }
    })
  }

  cargarEducacion(usuarioId: number): void {
    this.sEducacion.findAllUsuarioId(usuarioId).subscribe(
      data => {
        data
        this.educacion = JSON.parse(JSON.stringify(data));
        console.log(this.educacion)
      })
  };

  cargarExperiencia(usuarioId: number): void {
    this.sExperienciaService.findAllUsuarioId(usuarioId).subscribe(
      data => {
        data
        this.expe = JSON.parse(JSON.stringify(data));
      })
  }

  getBase64ImageFromURL(url: string) {
    return new Promise((resolve, reject) => {
      var img = new Image();
      img.setAttribute("crossOrigin", "anonymous");
      // img.setAttribute("crossOrigin",'use-credentials');

      img.onload = () => {
        var canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;

        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);

        var dataURL = canvas.toDataURL("image/png");

        resolve(dataURL);
      };
      img.onerror = error => {
        reject(error);
      };
      img.src = url;
    });
  }

  async downloadPdf() {
if(this.valor_redes){
  // console.log('desde pdf valor'+ this.valor_redes)
    // this.imagen_user= this.uploadImg();
    const docDefinition = {
      pageMargins: [20, 20, 20, 20],
      content: [
        {
          columns: [
            {
              width: '30%',
              // image: await this.getBase64ImageFromURL(this.imagen_user),
              image: await this.getBase64ImageFromURL(this.img_foto),
              // image: await this.imagen_user_base64,
              // image: await this.imagen_users,
              crossOrigin: 'anonymous',
              fit: [110, 110],
              alignment: 'center',
              margin: [0, 0, 0, 0],
            },
            {
              alignment: "center",
              text: [
                {
                  fontSize: 18, bold: true,
                  text: `${this.personas.nombre} ${this.personas.apellido}     `
                },
                {
                  fontSize: 13,
                  text: `(${this.personas.city} -  ${this.personas.edad})\n`,
                },
                {
                  text: `${this.personas.title}\n`,
                  fontSize: 16, bold: true, color: '#3e6283',
                },
                {
                  text: [
                    {
                      alignment: "justify",
                      color: 'gray',
                      italics: true,
                      text: `${this.personas.about}\n`,
                      style: 'contact',
                    },
                    {
                      text: this.correo,
                      link: `mailto:${this.correo}?subject=Contacto desde el Portfolio&body=Contenido del correo`,
                      style: {
                        alignment: 'right',
                        decoration: 'underline',
                        color: '#2a4158',
                        // target: '_blank' // abrir en nueva pestaña
                      }
                    },
                  ],
                },
              ],
            },

          ],
        },
        // linea celeste fina
        { margin: [0, 5, 0, 0], table: { headerRows: 1, widths: ['*'], body: [[''], ['']] }, layout: { hLineWidth: function (i: number, node: any) { return (i === 1) ? 8 : 0 }, hLineColor: function (i: number, node: any) { return (i === 1) ? '#5382aa' : 'white' }, vLineWidth: function (i: any, node: any) { return 0 } } },
        {
          text: 'Formación',
          style: 'sectionHeader',
        },
        //Agrega la sección de educación
        {
          ul: this.educacion.map((edu: any) => `${edu.titleE} - ${edu.schoolE} (${edu.startE} - ${edu.endE}) ${edu.estadoE}`),
          margin: [15, 0, 0, 0],
        },

        // linea celeste fina
        { margin: [0, 5, 0, 0], table: { headerRows: 1, widths: ['*'], body: [[''], ['']] }, layout: { hLineWidth: function (i: number, node: any) { return (i === 1) ? 1 : 0 }, hLineColor: function (i: number, node: any) { return (i === 1) ? '#5382af ' : 'white' }, vLineWidth: function (i: any, node: any) { return 0 } } },

        //Agrega la sección de Idiomas
        {
          columns: [
            {
              width: '20%',
              text: 'Idiomas',
              style: 'sectionHeader',
            },
            {
              width: '40%',
              alignment: 'left',
              stack: this.idioma.slice(0, Math.ceil(this.idioma.length / 2)).map((idioma: any) => {
                const porcentaje = idioma.porcentaje;
                const porcentajeNum = parseFloat(porcentaje.slice(0, -1));
                const barra = {
                  canvas: [
                    {
                      type: 'rect',
                      x: 0,
                      y: 0,
                      w: 100,
                      h: 10,
                      color: '#c6c6c6',
                      border: [0.5, 0.5, 0.5, 0.5]
                    },
                    {
                      type: 'rect',
                      x: 0.5,
                      y: 0.5,
                      w: porcentajeNum,
                      h: 9,
                      color: porcentajeNum >= 80 ? '#002f7a' : porcentajeNum >= 50 ? '#0044b3' : '#5797ff'
                    }
                  ]
                };
                const texto = `${idioma.nombre} - ${idioma.porcentaje}`;
                return [
                  barra,
                  { text: texto, margin: [0, 5, 0, 0] }
                ];
              }),
              margin: [15, 5, 0, 0]
            },
            {
              width: '40%',
              alignment: 'left',
              stack: this.idioma.slice(Math.ceil(this.idioma.length / 2)).map((idioma: any) => {
                const porcentaje = idioma.porcentaje;
                const porcentajeNum = parseFloat(porcentaje.slice(0, -1));
                const barra = {
                  canvas: [
                    {
                      type: 'rect',
                      x: 0,
                      y: 0,
                      w: 100,
                      h: 10,
                      color: '#c6c6c6',
                      border: [0.5, 0.5, 0.5, 0.5]
                    },
                    {
                      type: 'rect',
                      x: 0.5,
                      y: 0.5,
                      w: porcentajeNum,
                      h: 9,
                      color: porcentajeNum >= 80 ? '#002f7a' : porcentajeNum >= 50 ? '#0044b3' : '#5797ff'
                    }
                  ]
                };
                const texto = `${idioma.nombre} - ${idioma.porcentaje}`;
                return [
                  barra,
                  { text: texto, margin: [0, 5, 0, 0] }
                ];
              }),
              margin: [0, 5, 15, 0]
            }
          ]
        },

        // linea celeste fina
        { margin: [0, 5, 0, 0], table: { headerRows: 1, widths: ['*'], body: [[''], ['']] }, layout: { hLineWidth: function (i: number, node: any) { return (i === 1) ? 1 : 0 }, hLineColor: function (i: number, node: any) { return (i === 1) ? '#5382af ' : 'white' }, vLineWidth: function (i: any, node: any) { return 0 } } },

        // Agrega la sección de Experiencia
        {
          text: 'Experiencia',
          style: 'sectionHeader',
        },
        {
          ul: this.expe.map((exp: any) => [
            `${exp.cargoE} - ${exp.nombreE} (${exp.startE} - ${exp.endE}) ${exp.descripcionE} - ${exp.cityE}`,
          ]), margin: [15, 0, 0, 0],
        },

        // linea celeste fina
        { margin: [0, 5, 0, 0], table: { headerRows: 1, widths: ['*'], body: [[''], ['']] }, layout: { hLineWidth: function (i: number, node: any) { return (i === 1) ? 1 : 0 }, hLineColor: function (i: number, node: any) { return (i === 1) ? '#5382af ' : 'white' }, vLineWidth: function (i: any, node: any) { return 0 } } },

        // Agrega la sección de Habilidades
        {
          text: 'Habilidades',
          style: 'sectionHeader',
        },
        {
          margin: [20, 0, 0, 0],
          text: this.hardsskills.map((skills: any) => {
            return {
              text: `${skills.nombre}(${skills.porcentaje})     `,
            };
          })
        },

        // linea celeste fina
        { margin: [0, 5, 0, 0], table: { headerRows: 1, widths: ['*'], body: [[''], ['']] }, layout: { hLineWidth: function (i: number, node: any) { return (i === 1) ? 1 : 0 }, hLineColor: function (i: number, node: any) { return (i === 1) ? '#5382af ' : 'white' }, vLineWidth: function (i: any, node: any) { return 0 } } },

        // Agrega la sección de Proyectos
        {
          text: 'Proyectos',
          style: 'sectionHeader',
        },
        {
          ul: this.proyectos.map((exp: any) => [
            {
              text: `${exp.proyectos}: ${exp.descripcion} (${exp.fecha}) `,
              link: exp.urlProyecto
            }
          ]),
          margin: [15, 0, 0, 0],
        },

        // linea celeste fina
        { margin: [0, 5, 0, 0], table: { headerRows: 1, widths: ['*'], body: [[''], ['']] }, layout: { hLineWidth: function (i: number, node: any) { return (i === 1) ? 1 : 0 }, hLineColor: function (i: number, node: any) { return (i === 1) ? '#5382af ' : 'white' }, vLineWidth: function (i: any, node: any) { return 0 } } },

        // Agrega la sección de Cursos
        {
          text: 'Cursos',
          style: 'sectionHeader',
        },
        {
          margin: [20, 0, 0, 0],
          text: this.cursos.map((cursos: any) => {
            return {
              text: `${cursos.curso}     `,
            };
          })
        },

        // linea celeste fina
        { margin: [0, 5, 0, 0], table: { headerRows: 1, widths: ['*'], body: [[''], ['']] }, layout: { hLineWidth: function (i: number, node: any) { return (i === 1) ? 1 : 0 }, hLineColor: function (i: number, node: any) { return (i === 1) ? '#5382af ' : 'white' }, vLineWidth: function (i: any, node: any) { return 0 } } },

        // Agrega la sección de Frase
        {
          alignment: 'center',
          text: [
            { text: `"${this.frase}"\n`, italics: true, color: '#2a4158' },
            { text: this.autor, bold: true, color: '#214162', alignment: 'right', fontSize: 10 },
          ],
          margin: [0, 20, 0, 0]
        },

      ],
      styles: {
        header: {
          fontSize: 20,
          bold: true,
          margin: [0, 0, 0, 10],
          width: 400,
        },
        line: {
          color: 'grey',
          fontSize: 16,
          bold: true,
          margin: [0, 0, 0, 5],
          // width:400,
        },
        contact: {
          fontSize: 12,
          margin: [0, 0, 0, 0],
        },
        sectionHeader: {
          fontSize: 16,
          bold: true,
          margin: [10, 5, 0, 5],
          color: '#5382af',
        },
      },
      defaultStyle: {
        font: 'Roboto',
        fontSize: 12,
        lineHeight: 1.2,
        color: '#333',
      },
    };
    // pdfMake.createPdf(docDefinition).download('curriculum.pdf');
    const pdf = pdfMake.createPdf(docDefinition);
    pdf.open();

  }else{
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Elije un Usuario!',
    }),
    this.router.navigate(['/']);  }
  }

  }


