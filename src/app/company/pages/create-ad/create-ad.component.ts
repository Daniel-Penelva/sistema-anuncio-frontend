import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { CompanyService } from '../../services/company.service';

@Component({
  selector: 'app-create-ad',
  templateUrl: './create-ad.component.html',
  styleUrl: './create-ad.component.scss',
})
export class CreateAdComponent {
  
  selectedFile: File | null;
  imagePreview: string | ArrayBuffer | null;
  validateForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private notification: NzNotificationService,
    private router: Router,
    private companyService: CompanyService
  ) {}

  // Método executado qnd o componente é inicializado. Método constroi o formulário reativo.
  ngOnInit(): void {
    this.validateForm = this.fb.group({
      serviceName: [null, [Validators.required]],
      description: [null, [Validators.required]],
      price: [null, [Validators.required]],
    });
  }

  // Método que seleciona e captura o arquivo de imagem.
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    this.previewImage();
  }

  // Método que exibe a imagem
  previewImage() {
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };

    reader.readAsDataURL(this.selectedFile);
  }

  // Método que realiza o envio do formulário e do arquivo de imagem.
  postAd() {
    const formData: FormData = new FormData();

    formData.append('img', this.selectedFile);
    formData.append('serviceName', this.validateForm.get('serviceName').value);
    formData.append('description', this.validateForm.get('description').value);
    formData.append('price', this.validateForm.get('price').value);

    // inspecionar o conteudo da imagem e dos campos serviceName, description e price
    console.log(this.selectedFile);
    console.log("Imagem: " + formData.get('img'));
    console.log("Nome do Serviço: " + formData.get('serviceName') + " Descrição: " + formData.get('description') + " Preço: " + formData.get('price'));

    this.companyService.postAd(formData).subscribe(res => {
      this.notification.success('SUCCESS', 'Anúncio publicado com sucesso!', { nzDuration: 5000 });
      this.router.navigateByUrl('/company/ads');
    }, error => {
      this.notification.error('ERROR', `${error.error}`, { nzDuration: 5000 });
    })
  }
}
