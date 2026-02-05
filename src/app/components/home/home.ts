import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { API_CONFIG } from '../../api.config';
import { Articulo as ArticuloService } from '../../services/articulo';
import { Articulo as ArticuloModel } from '../../models/articulo';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [ CommonModule, FormsModule, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit{
  API_CONFIG = API_CONFIG;
  articulosDestacados = signal<ArticuloModel[]>([]);
  articulosNuevos = signal<ArticuloModel[]>([]);

  constructor(private articuloService: ArticuloService) {};

  ngOnInit(): void {
    this.top10Articulos();
    this.articulosRecientes();
  }

  top10Articulos() {
    this.articuloService.top10Articulos().subscribe(
      (result:any) => {
        this.articulosDestacados.set(result.data.map((element:any) => {
          return Object.assign(new ArticuloModel(), element);
        }));
      }
    );
  };

  articulosRecientes() {
    this.articuloService.getArticulos().subscribe(
      (result:any) => {
        this.articulosNuevos.set(result.data.articulos.map((element:any) => {
          return Object.assign(new ArticuloModel(), element);
        }));
      }
    );
  };

}
