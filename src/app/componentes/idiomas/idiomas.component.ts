import { Component, OnInit } from '@angular/core';
import { Idiomas } from 'src/app/model/idiomas';
import { SIdiomasService } from 'src/app/service/s-idiomas.service';
import { TokenService } from 'src/app/service/token.service';
import { PortfolioService } from 'src/app/servicios/portfolio.service';

@Component({
  selector: 'app-idiomas',
  templateUrl: './idiomas.component.html',
  styleUrls: ['./idiomas.component.css']
})
export class IdiomasComponent implements OnInit {
  hardsskills: Idiomas[] = [];
  educacionList: any;
  frases: any;

  constructor(private sIdiomasService: SIdiomasService, private tokenService: TokenService,private datosPortfolio:PortfolioService) {
    this.datosPortfolio.obtenerDatos().subscribe((data: any) =>{
      this.educacionList=data.programacion;
      this.frases=data.frases});
  }

  isLogged = false;

  ngOnInit(): void {
    this.cargarSkills();

    if(this.tokenService.getToken()){
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
  }

  cargarSkills(): void{
    this.sIdiomasService.lista().subscribe(
      data => {
        this.hardsskills = data;
      }
    )
  }


          delete(id?: number){
            if( id != undefined){
              this.sIdiomasService.delete(id).subscribe(
                {
                next:() => {this.cargarSkills()},
                error: () => {alert("No se pudo eliminar")},
                complete: () => {console.info('complete')}})
                  };
                }
}
