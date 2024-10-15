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


  // Método responsável por buscar todos os anúncios (ads) de um usuário específico.
  getAllAdsByUserId(): Observable<any> {
    const userId = UserStorageService.getUserId();
    return this.http.get(BASIC_URL + `api/company/ads/${userId}`, { headers: this.createAuthorizationHeader() });
  }

  // Método responsável por fazer uma requisição HTTP do tipo GET para buscar um anúncio específico no servidor, utilizando o ID do anúncio fornecido como argumento.
  getAdById(adId: any): Observable<any> {
    return this.http.get(BASIC_URL + `api/company/ad/${adId}`, { headers: this.createAuthorizationHeader() });
  }

  // Método responsável por enviar uma requisição HTTP PUT ao back-end para atualizar um anúncio (Ad).
  updateAd(adId: any, adDTO: any): Observable<any> {
    return this.http.put(BASIC_URL + `api/company/ad/${adId}`, adDTO, { headers: this.createAuthorizationHeader() });
  }

  // Método responsável por enviar uma requisição HTTP DELETE ao back-end para deletar um anúncio (Ad).
  deleteAd(adId: any): Observable<any> {
    return this.http.delete(BASIC_URL + `api/company/ad/${adId}`, { headers: this.createAuthorizationHeader() });
  }

  // Método responsável de criar e retornar os cabeçalhos de autorização que são usados para autenticar a requisição HttpHeaders.
  createAuthorizationHeader(): HttpHeaders {
    let authHeaders: HttpHeaders = new HttpHeaders();
    return authHeaders.set('Authorization', 'Bearer ' + UserStorageService.getToken())
  }
}
