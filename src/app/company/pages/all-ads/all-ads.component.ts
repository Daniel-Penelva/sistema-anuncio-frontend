import { Component } from '@angular/core';
import { CompanyService } from '../../services/company.service';

@Component({
  selector: 'app-all-ads',
  templateUrl: './all-ads.component.html',
  styleUrl: './all-ads.component.scss',
})
export class AllAdsComponent {
  
  ads: any;

  constructor(private companyService: CompanyService) {}

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
}
