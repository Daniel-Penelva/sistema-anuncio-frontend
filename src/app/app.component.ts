import { Component } from '@angular/core';
import { UserStorageService } from './basic/services/storage/user-storage.service';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'sistema-anuncio-frontend';

  isClientLoggedIn: boolean = UserStorageService.isClientLoggedIn();
  isCompanyLoggedIn: boolean = UserStorageService.isCompanyLoggedIn();

  showWelcomeImage: boolean = true;   // Variável para controlar a exibição da imagem

  constructor(private router: Router){}

  // Método responsável por se inscrever nos eventos de navegação do roteador. Aqui, o estado de login é atualizado automaticamente sempre que ocorre uma navegação, garantindo que a interface sempre reflita o estado de autenticação do usuário.
  ngOnInit(): void {
    this.router.events.subscribe(event => {
      this.isClientLoggedIn = UserStorageService.isClientLoggedIn();
      this.isCompanyLoggedIn = UserStorageService.isCompanyLoggedIn();

      if(event instanceof NavigationEnd) {
        this.showWelcomeImage = event.url === '/';
      }
    });
  }

  // Método responsável por desconectar o usuário do sistema.
  logout(){
    UserStorageService.signout();
    this.router.navigateByUrl('login');
  }
}


/**
 * Interações com UserStorageService:
 * 
 * O UserStorageService é responsável por gerenciar as informações de autenticação no localStorage.
 * 
 * Os métodos isClientLoggedIn e isCompanyLoggedIn são usados para determinar o tipo de usuário que está logado, verificando a presença de um 
 * token e o papel associado (cliente ou empresa).
 * 
 * O método signout() remove esses dados do armazenamento local, efetivamente desconectando o usuário.
*/