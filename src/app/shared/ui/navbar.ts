import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
  <header class="border-b border-white/10 sticky top-0 z-50 backdrop-blur">
    <nav class="container flex items-center justify-between py-4">
      <a routerLink="/" class="font-bold text-lg tracking-tight">/emiliosanchez.dev</a>
      <ul class="flex gap-6 text-sm">
        <li><a routerLink="/" routerLinkActive="text-white" class="text-neutral-300 hover:text-white">Inicio</a></li>
        <li><a routerLink="/projects" routerLinkActive="text-white" class="text-neutral-300 hover:text-white">Proyectos</a></li>
        <li><a routerLink="/about" routerLinkActive="text-white" class="text-neutral-300 hover:text-white">Sobre mí</a></li>
        <li><a routerLink="/contact" routerLinkActive="text-white" class="text-neutral-300 hover:text-white">Contacto</a></li>
      </ul>
    </nav>
  </header>
  `
})
export class NavbarComponent {}
