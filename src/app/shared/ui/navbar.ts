import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <header class="sticky top-0 z-50 border-b border-white/10 backdrop-blur bg-neutral-950/70">
      <nav class="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <a routerLink="/" class="font-bold text-lg tracking-tight">/emiliosanchez.dev</a>

        <!-- Botón móvil -->
        <button class="md:hidden inline-flex items-center justify-center rounded-xl border border-white/10 px-3 py-2"
                (click)="open.set(!open())"
                aria-label="Abrir menú"
                aria-expanded="{{open()}}">
          ☰
        </button>

        <!-- Menú desktop -->
        <ul class="hidden md:flex gap-6 text-sm">
          <li><a routerLink="/" routerLinkActive="text-white" class="text-neutral-300 hover:text-white">Inicio</a></li>
          <li><a routerLink="/projects" routerLinkActive="text-white" class="text-neutral-300 hover:text-white">Proyectos</a></li>
          <li><a routerLink="/about" routerLinkActive="text-white" class="text-neutral-300 hover:text-white">Sobre mí</a></li>
          <li><a routerLink="/contact" routerLinkActive="text-white" class="text-neutral-300 hover:text-white">Contacto</a></li>
        </ul>
      </nav>

      <!-- Menú móvil (fluye bajo el header, no se superpone al main) -->
      <div *ngIf="open()" class="md:hidden border-t border-white/10">
        <div class="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 py-3 space-y-2">
          <a routerLink="/"        (click)="open.set(false)" class="block text-neutral-300 hover:text-white">Inicio</a>
          <a routerLink="/projects"(click)="open.set(false)" class="block text-neutral-300 hover:text-white">Proyectos</a>
          <a routerLink="/about"   (click)="open.set(false)" class="block text-neutral-300 hover:text-white">Sobre mí</a>
          <a routerLink="/contact" (click)="open.set(false)" class="block text-neutral-300 hover:text-white">Contacto</a>
        </div>
      </div>
    </header>
  `
})
export class NavbarComponent {
  open = signal(false);
}
