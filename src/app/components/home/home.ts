import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { API_CONFIG } from '../../api.config';
import { Articulo as ArticuloService } from '../../services/articulo';
import { Articulo as ArticuloModel } from '../../models/articulo';
import { RouterLink } from '@angular/router';
import { Stats as StatsService } from '../../services/stats';

@Component({
  selector: 'app-home',
  imports: [ CommonModule, FormsModule, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  API_CONFIG = API_CONFIG;
  articulosDestacados = signal<ArticuloModel[]>([]);
  articulosNuevos = signal<ArticuloModel[]>([]);
  usuarios = signal<number>(0);
  tickets = signal<number>(0);
  vendidos = signal<number>(0);
  usuariosAnimados = signal<number>(0);
  ticketsAnimados = signal<number>(0);
  vendidosAnimados = signal<number>(0);
  statsAnimadas = signal<boolean>(false);

  constructor(private articuloService: ArticuloService,
              private statsService: StatsService
  ) {};

  ngOnInit(): void {
    this.top10Articulos();
    this.articulosRecientes();
    this.getStats();
    setTimeout(() => {
      this.statsObserver();
    }, 100);
  }

  top10Articulos() {
    this.articuloService.top10Articulos().subscribe(
      (result:any) => {
        this.articulosDestacados.set(result.data.map((element:any) => {
          return Object.assign(new ArticuloModel(), element);
        }));
      }, (error:any) => {
        alert(error.error.msg || "Error del servidor");
      }
    );
  };

  articulosRecientes() {
    this.articuloService.getArticulos().subscribe(
      (result:any) => {
        this.articulosNuevos.set(result.data.articulos.map((element:any) => {
          return Object.assign(new ArticuloModel(), element);
        }));
      }, (error:any) => {
        alert(error.error.msg || "Error del servidor");
      }
    );
  };

  private getStats() {
    this.statsService.getStats().subscribe(
      (result:any) => {
        this.usuarios.set(result.data.usuarios);
        this.tickets.set(result.data.tickets);
        this.vendidos.set(result.data.vendidos);
      },
      (error:any) => {
        alert(error.error.msg || "Error del servidor");
      }
    );
  };

  private statsObserver() {
    const statsSection = document.getElementById('stats');
    if(!statsSection) {
      return;
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        if(entry.isIntersecting && !this.statsAnimadas()) {
          this.statsAnimadas.set(true);
          this.animarContadores();
          observer.disconnect();
        };
      },
      {
        threshold: 0.5,
        rootMargin: '0px 0px -80px 0px'
      }
    );
    observer.observe(statsSection);
  };

  private animarContadores() {
    this.animarNumero(this.usuarios(), this.usuariosAnimados);
    this.animarNumero(this.tickets(), this.ticketsAnimados);
    this.animarNumero(this.vendidos(), this.vendidosAnimados);
  };

  private animarNumero(origen:number, destino:any) {
    let actual = 0;
    const duracion = 1000;
    const pasos = 40;
    const incremento = Math.ceil(origen/pasos);
    const intervalo = duracion/pasos;
    const timer = setInterval(() => {
      actual = actual + incremento;
      if(actual >= origen) {
        destino.set(origen);
        clearInterval(timer);
      } else {
        destino.set(actual);
      };
    }, intervalo);
  };

}
