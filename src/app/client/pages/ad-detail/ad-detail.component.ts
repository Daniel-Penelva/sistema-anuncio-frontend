import { Component } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserStorageService } from '../../../basic/services/storage/user-storage.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-ad-detail',
  templateUrl: './ad-detail.component.html',
  styleUrl: './ad-detail.component.scss',
})
export class AdDetailComponent {
  
  adId = this.activatedRoute.snapshot.params['adId'];
  avatarUrl: any;
  ad: any;
  validateForm!: FormGroup;
  loading = false;             // Variável de controle do carregamento
  reviews: any;

  constructor(
    private clientService: ClientService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private notification: NzNotificationService
  ) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      bookDate: [null, [Validators.required]]
    })

    this.getAdDetailsByAdId();
  }

  getAdDetailsByAdId() {
    this.clientService.getAdDetailsByAdId(this.adId).subscribe((res) => {
      console.log(res);
      this.avatarUrl = 'data:image/jpeg;base64,' + res.adDTO.returnedImg;
      this.ad = res.adDTO;
      this.reviews = res.reviewDTOList;
    }, error => {
      console.log('Erro ao buscar os detalhes do anúncio:', error);
    });
  }

  bookService() {

    if(this.validateForm.invalid) {
      this.notification.error('Erro', 'Por favor, preencha os campos obrigatórios');
      return;
    }

    // Inicia o estado de carregamento
    this.loading = true;

    const bookServiceDTO = {
      bookDate: this.validateForm.get(['bookDate']).value, adId: this.adId, userId: UserStorageService.getUserId()
    }

    this.clientService.bookService(bookServiceDTO).subscribe(
      (res) => {
        this.loading = false;                                                                              // Finaliza o estado de carregamento
        this.notification.success('SUCESSO', 'Solicitação postada com sucesso', { nzDuration: 5000 });
        this.router.navigateByUrl('/client/bookings');
    }, (error) => {
      this.loading = false;                                                                                // Finaliza o estado de carregamento em caso de erro
      this.notification.error('Erro', 'Falha ao postar solicitação');
    });
  }
}
