import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserStorageService } from '../../basic/services/storage/user-storage.service';

const BASIC_URL = "http://localhost:8080/";

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http: HttpClient) { }

  // Método responsável por buscar todos os anúncios (ads).
  getAllAds(): Observable<any> {
    return this.http.get(BASIC_URL + `api/client/ads`, { headers: this.createAuthorizationHeader() });
  }

  // Método responsável por fazer uma requisição HTTP do tipo GET para buscar anúncio(s) específico(s) no servidor, utilizando o name do anúncio fornecido como argumento.
  searchAdByName(name: any): Observable<any> {
    return this.http.get(BASIC_URL + `api/client/search/${name}`, { headers: this.createAuthorizationHeader() });
  }

  // Método responsável de criar e retornar os cabeçalhos de autorização que são usados para autenticar a requisição HttpHeaders.
  createAuthorizationHeader(): HttpHeaders {
    let authHeaders: HttpHeaders = new HttpHeaders();
    return authHeaders.set('Authorization', 'Bearer ' + UserStorageService.getToken())
  }
}
