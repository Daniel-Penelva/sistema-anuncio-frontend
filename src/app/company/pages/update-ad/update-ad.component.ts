import { Component } from '@angular/core';
import { CompanyService } from '../../services/company.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-update-ad',
  templateUrl: './update-ad.component.html',
  styleUrl: './update-ad.component.scss',
})
export class UpdateAdComponent {
  
  adId: any = this.activatedRoute.snapshot.params['id'];

  selectedFile: File | null;
  imagePreview: string | ArrayBuffer | null;
  validateForm!: FormGroup;
  existingImage: string | null = null;

  imgChanged = false;

  constructor(
    private fb: FormBuilder,
    private notification: NzNotificationService,
    private router: Router,
    private companyService: CompanyService,
    private activatedRoute: ActivatedRoute
  ) {}

  // Método executado qnd o componente é inicializado. Método constroi o formulário reativo.
  ngOnInit(): void {
    this.validateForm = this.fb.group({
      serviceName: [null, [Validators.required]],
      description: [null, [Validators.required]],
      price: [null, [Validators.required]],
    });

    this.getAdById();
  }

  // Método que seleciona e captura o arquivo de imagem.
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    this.previewImage();
    this.existingImage = null;
    this.imgChanged = true;
  }

  // Método que que carrega o arquivo de imagem
  previewImage() {
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };

    reader.readAsDataURL(this.selectedFile);
  }

  // Método que realiza a atualização do envio do formulário e do arquivo de imagem.
  updateAd() {
    const formData: FormData = new FormData();

    if(this.imgChanged && this.selectedFile){
      formData.append('img', this.selectedFile);
    }

    formData.append('serviceName', this.validateForm.get('serviceName').value);
    formData.append('description', this.validateForm.get('description').value);
    formData.append('price', this.validateForm.get('price').value);

    // inspecionar o conteudo da imagem e dos campos serviceName, description e price
    console.log(this.selectedFile);
    console.log("Imagem: " + formData.get('img'));
    console.log("Nome do Serviço: " + formData.get('serviceName') + " Descrição: " + formData.get('description') + " Preço: " + formData.get('price'));

    this.companyService.updateAd(this.adId, formData).subscribe(res => {
      this.notification.success('SUCCESS', 'Anúncio atualizado e publicado com sucesso!', { nzDuration: 5000 });
      this.router.navigateByUrl('/company/ads');
    }, error => {
      this.notification.error('ERROR', `${error.error}`, { nzDuration: 5000 });
    })
  }

  // Este método faz uma requisição para buscar os dados do anúncio baseado no ID (adId).
  getAdById() {
    this.companyService.getAdById(this.adId).subscribe(
      res => {
        console.log(res);
        this.validateForm.patchValue(res);
        this.existingImage = 'data:image/jpeg;base64,' + res.returnedImg;
    }, error => {
      console.error('Erro ao buscar anúncio', error);
    });
  }
}
