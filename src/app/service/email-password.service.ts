import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ChangePasswordDTO } from '../model/change-password-dto';
import { EmailValuesDTO } from '../model/email-values-dto';

@Injectable({
  providedIn: 'root'
})
export class EmailPasswordService {

  changePasswordURL = environment.URL + 'email';;

  constructor(private httpClient: HttpClient) { }

public changepassword(dto: ChangePasswordDTO): Observable<any>{
  return this.httpClient.post<any>(this.changePasswordURL+'/changepassword',dto)
}
public sendemail(dto: EmailValuesDTO): Observable<any>{
  return this.httpClient.post<any>(this.changePasswordURL+'/send', dto);
}

}
