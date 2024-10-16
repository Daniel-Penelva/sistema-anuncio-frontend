import { Component } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-client-dashboard',
  templateUrl: './client-dashboard.component.html',
  styleUrl: './client-dashboard.component.scss',
})
export class ClientDashboardComponent {
  ads: any = [];
  validateForm!: FormGroup;
  

  constructor(private clientService: ClientService, 
    private fb: FormBuilder, 
    private notification: NzNotificationService) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      service: [null, [Validators.required]]
    })
    this.getAllAds();
  }

  // Método para buscar todos os anúncios (Ads)
  getAllAds() {
    this.clientService.getAllAds().subscribe((res) => {
      this.ads = res;
    });
  }

  // O método updateImg() é usada para transformar a imagem codificada em Base64 em uma URL utilizável no HTML, permitindo a exibição de imagens diretamente sem a necessidade de um caminho de arquivo físico.
  updateImg(img) {
    return 'data:image/jpeg;base64,' + img;
  }

  searchAdByName() {
    this.clientService.searchAdByName(this.validateForm.get(['service']).value).subscribe(res => {
      this.ads = res;

      // Verifica se a resposta está vazia
      if (this.ads.length === 0) {
        this.notification.info('INFO', 'Nenhum anúncio encontrado com esse nome.', { nzDuration: 5000 });
      }
    }, error => {
      if (error.status === 404) {
        this.notification.error('ERROR', 'Nenhum anúncio encontrado com esse nome.', { nzDuration: 5000 });
      } else {
        this.notification.error('ERROR', 'Ocorreu um erro ao buscar o anúncio. Tente novamente mais tarde.', { nzDuration: 5000 });
      }
      console.log("Erro ao buscar anúncio", error);
    });
  }

}
