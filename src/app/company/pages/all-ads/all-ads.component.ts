import { Component } from '@angular/core';
import { CompanyService } from '../../services/company.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-all-ads',
  templateUrl: './all-ads.component.html',
  styleUrl: './all-ads.component.scss',
})
export class AllAdsComponent {
  
  ads: any;

  constructor(private companyService: CompanyService, private notification: NzNotificationService) {}

  ngOnInit() {
    this.getAllAdsByUserId();
  }

  // Método para exibir os anúncios de um usuário específico.
  getAllAdsByUserId() {
    this.companyService.getAllAdsByUserId().subscribe(
      res => {
        this.ads = res;
    });
  }

  // O método updateImg() é usada para transformar a imagem codificada em Base64 em uma URL utilizável no HTML, permitindo a exibição de imagens diretamente sem a necessidade de um caminho de arquivo físico.
  updateImg(img) {
    return 'data:image/jpeg;base64,' + img;
  }

  // Método para deletar o anúncio de um usuário específico.
  deleteAd(adId: any) {
    this.companyService.deleteAd(adId).subscribe(
      res => {
        this.notification.success('SUCCESS', 'Anúncio deletado com sucesso!', { nzDuration: 5000 });
        this.getAllAdsByUserId();
    }, error => {
      if(error.status === 404) {
        this.notification.error('ERROR', 'Anúncio não encontrado', { nzDuration: 5000 });
      } else {
        this.notification.error('ERROR', 'Erro ao deletar o anúncio. Tente novamente mais tarde.', { nzDuration: 5000 });
      }
    });
  }
}
