import { Injectable } from '@angular/core';

const TOKEN = 's_token';                    // A chave usada para armazenar o token JWT no localStorage.
const USER =  's_user';                     // A chave usada para armazenar os dados do usuário no localStorage.

@Injectable({
  providedIn: 'root'
})
export class UserStorageService {

  constructor() { }

  // Método para salvar o token no localStorage
  public saveToken(token: string): void {
    window.localStorage.removeItem(TOKEN);          // remove o token antigo.
    window.localStorage.setItem(TOKEN, token);      // salva o novo token.
  }


  // OBS. Foi preciso alterar o "strict" de "true" para "false" no arquivo "tsconfig.json" para aplicar verificações menos rigorosas.
  // Método para recupera o token armazenado no localStorage usando a chave TOKEN.
  static getToken(): string {
    return localStorage.getItem(TOKEN);
  }

  // Método para remover e salva os dados do usuário (um objeto) no localStorage.
  public saveUser(user: string): void {
    window.localStorage.removeItem(USER);
    window.localStorage.setItem(USER, JSON.stringify(user));  // converte de objeto user para string usando JSON.stringify antes de ser armazenado.
  }

  // Método para recupera os dados do usuário armazenados no localStorage, convertendo-os de volta para um objeto JavaScript usando JSON.parse.
  static getUser(): any {
    return JSON.parse(localStorage.getItem(USER));
  }

  // Método que usa o método getUser() para pegar os dados do usuário e retornar o userId. Se o usuário não estiver presente, retorna uma string vazia.
  static getUserId(): string {
    const user = this.getUser();
    if(user === null ){return '';}
    return user.userId;
  }

  // Método que usa o getUser() sa o método getUser() para pegar o papel (role) do usuário e retorná-lo. Se o usuário não estiver presente, retorna uma string vazia.
  static getUserRole(): string {
    const user = this.getUser();
    if(user === null){return '';}
    return user.role;
  }

  // Método para verificar se o token está presente e se o papel do usuário é CLIENT.
  static isClientLoggedIn(): boolean {
    if(this.getToken() === null){
      return false;
    }
    const role: string = this.getUserRole();
    return role == 'CLIENT';
  }

  // Método para verificar se o token está presente e se o papel do usuário é COMPANY.
  static isCompanyLoggedIn(): boolean {
    if(this.getToken() === null){
      return false;
    }
    const role: string = this.getUserRole();
    return role == 'COMPANY';
  }

  // Método que remove tanto o token quanto os dados do usuário do localStorage, efetivamente "deslogando" o usuário.
  static signout(): void {
    window.localStorage.removeItem(TOKEN);
    window.localStorage.removeItem(USER);
  }
}


/**
 * Sobre Local Storage
 * O localStorage é um mecanismo de armazenamento web que permite que dados persistam no navegador, mesmo após o usuário fechar a aba ou o 
 * navegador. Os dados são salvos como pares chave-valor e permanecem até que sejam explicitamente removidos.
*/