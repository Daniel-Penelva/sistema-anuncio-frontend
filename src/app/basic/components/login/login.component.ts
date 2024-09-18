import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { AuthService } from '../../services/auth/auth.service';
import { UserStorageService } from '../../services/storage/user-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  validateForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private notification: NzNotificationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
    })
  }

  // Método para enviar as crendenciais
  submitForm(){
    this.authService.login(this.validateForm.get(['username'])!.value, this.validateForm.get(['password'])!.value).subscribe(
      res => {
        console.log(res);
        if(UserStorageService.isClientLoggedIn()){
          this.router.navigateByUrl('client/dashboard');
        }else if(UserStorageService.isCompanyLoggedIn()){
          this.router.navigateByUrl('company/dashboard');
        }
    }, error => {
      this.notification.error('ERROR', 'Credenciais inválida', { nzDuration: 5000 });
    })
  }

}

/**
 * Esse componente captura o nome de usuário e a senha inseridos pelo usuário, valida os campos para garantir que ambos sejam preenchidos, e 
 * envia as credenciais para o servidor usando o AuthService. Se o login for bem-sucedido, o usuário é redirecionado para uma página específica. 
 * Em caso de falha, uma notificação é exibida informando que as credenciais são inválidas.
*/