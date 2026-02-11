import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

type EstadoPago = 'exitoso' | 'fallido' | 'pendiente';

@Component({
  selector: 'app-pago',
  imports: [ RouterLink ],
  templateUrl: './pago.html',
  styleUrl: './pago.css',
})
export class Pago implements OnInit {
  estado!: EstadoPago;
  titulo = '';
  mensaje = '';
  icono = '';
  color = '';

  constructor(private route: ActivatedRoute,
              private router: Router
  ) {};

  ngOnInit(): void {
    const estadoUrl = this.route.snapshot.paramMap.get('estado') as EstadoPago;
    if(!['exitoso', 'fallido', 'pendiente'].includes(estadoUrl)) {
      this.router.navigateByUrl('/');
      return;
    };
    this.estado = estadoUrl;
    this.configurarVista();
  }

  configurarVista() {
    switch(this.estado) {
      case 'exitoso':
        this.titulo = 'Pago realizado con exito';
        this.mensaje = 'Tu pago fue procesado correctamente. Gracias por tu compra.'
        this.icono = 'bi-check-circle-fill';
        this.color = 'text-primary';
        break;
      case 'fallido':
        this.titulo = 'Pago fallido';
        this.mensaje = 'No se pudo completar el pago. Podés intentarlo más tarde';
        this.icono = 'bi-x-circle-fill';
        this.color = 'text-danger';
        break;
      case 'pendiente':
        this.titulo = 'Pago pendiente';
        this.mensaje = 'Tu pago está pendiente de confirmación.';
        this.icono = 'bi-clock-fill';
        this.color = 'text-warning';
        break;
    };
  };
}
