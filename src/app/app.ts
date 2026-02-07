import { AfterViewInit, Component, effect, OnDestroy, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from "./components/header/header";
import { Footer } from "./components/footer/footer";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('ferreteria-frontend');
  showScrollTop = signal(false);

  constructor() {
    window.addEventListener('scroll', this.scrollHandler, { passive: true });
    this.scrollHandler();
  };

  private scrollHandler = () => {
    const shouldShow = window.scrollY > 100; 
    if(this.showScrollTop() !== shouldShow) {
      this.showScrollTop.set(shouldShow);
    };
  };

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
}
