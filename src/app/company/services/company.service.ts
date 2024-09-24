import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserStorageService } from '../../basic/services/storage/user-storage.service';
import { Observable } from 'rxjs';

const BASIC_URL = "http://localhost:8080/";

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private http: HttpClient) { }

  // Método responsável por fazer uma requisição POST para o backend com o objetivo de criar um anúncio.
  postAd(adDTO: any): Observable<any> {
    const userId = UserStorageService.getUserId();
    return this.http.post(BASIC_URL + `api/company/ad/${userId}`, adDTO, { headers: this.createAuthorizationHeader() });
  }


  // Método responsável de criar e retornar os cabeçalhos de autorização que são usados para autenticar a requisição HttpHeaders.
  createAuthorizationHeader(): HttpHeaders {
    let authHeaders: HttpHeaders = new HttpHeaders();
    return authHeaders.set('Authorization', 'Bearer ' + UserStorageService.getToken())
  }
}
