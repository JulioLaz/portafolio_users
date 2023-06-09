import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Hardsskills } from '../model/hardsskills';

@Injectable({
  providedIn: 'root'
})
export class SHardSSkillsService {
  // URL = 'https://portafolio-back-juliolazarte.onrender.com/skill/';
  URL = environment.URL + 'skill/';

  constructor(private httpClient: HttpClient) { }

  public lista(): Observable<Hardsskills[]>{
    return this.httpClient.get<Hardsskills[]>(this.URL + 'lista');
  }

  public detail(id: number): Observable<Hardsskills>{
    return this.httpClient.get<Hardsskills>(this.URL + `detail/${id}`);
  }

  public findAllUsuarioId(usuarioId: number): Observable<Hardsskills>{
    return this.httpClient.get<Hardsskills>(this.URL + `usuarioId/${usuarioId}`);
  }

  public save(skill: Hardsskills): Observable<any>{
    return this.httpClient.post<any>(this.URL + 'create', skill);
  }

  public update(id: number, skill: Hardsskills): Observable<any>{
    return this.httpClient.put<any>(this.URL + `update/${id}`, skill);
  }

  public delete(id: number): Observable<any>{
    return this.httpClient.delete(this.URL + `delete/${id}`);
  }

  public deleteUsuarioId(usuarioId: number): Observable<any>{
    return this.httpClient.delete<any>(this.URL + `deleteUsuarioId/${usuarioId}`);
  }
}
