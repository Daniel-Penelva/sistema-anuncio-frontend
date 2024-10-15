import { Component } from '@angular/core';
import { ClientService } from '../../services/client.service';

@Component({
  selector: 'app-client-dashboard',
  templateUrl: './client-dashboard.component.html',
  styleUrl: './client-dashboard.component.scss',
})
export class ClientDashboardComponent {
  ads: any = [];

  constructor(private clientService: ClientService) {}

  ngOnInit(): void {
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

}
