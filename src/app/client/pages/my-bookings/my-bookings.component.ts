import { Component } from '@angular/core';
import { ClientService } from '../../services/client.service';

@Component({
  selector: 'app-my-bookings',
  templateUrl: './my-bookings.component.html',
  styleUrl: './my-bookings.component.scss',
})
export class MyBookingsComponent {
  
  bookedServices: any;

  constructor(private clientService: ClientService) {}

  ngOnInit(): void {
    this.getMyBookings();
  }

  // Método responsável por exibir as reservas feitas pelo cliente
  getMyBookings() {
    this.clientService.getMyBookings().subscribe(
      (res) => {
        this.bookedServices = res;
      },(error) => {
        console.log('Erro ao buscar os detalhes do anúncio:', error);
      });
  }
}
