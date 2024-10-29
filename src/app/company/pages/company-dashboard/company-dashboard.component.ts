import { Component } from '@angular/core';
import { CompanyService } from '../../services/company.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-company-dashboard',
  templateUrl: './company-dashboard.component.html',
  styleUrl: './company-dashboard.component.scss',
})
export class CompanyDashboardComponent {

  bookings: any;
  
  constructor(private companyService: CompanyService, private notification: NzNotificationService) {}

  ngOnInit(): void {
    this.getAllAdBookings();
  }

  getAllAdBookings() {
    this.companyService.getAllAdBookings().subscribe((res) => {
      console.log(res);
      this.bookings = res;
    }, (error) => {
      console.error("Erro ao carregar as reservas, ", error);
    });
  }

  changeBookingStatus(bookingId: number, status: string) {
    this.companyService.changeBookingStatus(bookingId, status).subscribe((res) => {
      const actionMessage = status === 'Approve' ? 'aprovada' : 'rejeitada';
      this.notification.success('SUCESSO', `Reserva ${actionMessage} com sucesso`, { nzDuration: 5000});
      this.getAllAdBookings();   // Atualização da Lista de Reservas
    }, error => {
      this.notification.error('ERRO', `${error.message}`, { nzDuration: 5000 });
    });
  }
}
