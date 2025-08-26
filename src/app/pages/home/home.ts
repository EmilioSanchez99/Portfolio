import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, NgOptimizedImage],
  template: `
    <section class="grid gap-10 md:grid-cols-2 items-center">
      <!-- Text column -->
      <div>
        <h1 class="text-4xl md:text-6xl font-extrabold leading-tight">
          Hola!<br> Soy <span class="text-white">Emilio Sánchez</span>.<br/><br>
          Desarrollador <span class="text-white">Android</span> & <span class="text-white">Web</span>.
        </h1>

        <p class="mt-4 text-neutral-300 max-w-prose">
          Graduado en Desarrollo de Aplicaciones Multiplataforma con el mejor expediente académico de mi promoción.
          Especializado en <b>apps Android</b> y <b>aplicaciones web modernas</b> con Angular, Tailwind y Spring Boot.
          Mi experiencia combina <b>diseño de interfaces</b> y <b>optimización backend</b>, creando soluciones rápidas, accesibles y escalables.
        </p>

        <div class="mt-6 flex gap-3">
          <a routerLink="/projects"
             class="px-5 py-3 rounded-2xl bg-white text-neutral-900 font-semibold hover:opacity-90">
             Ver proyectos
          </a>

          <a routerLink="/contact"
             class="px-5 py-3 rounded-2xl border border-white/20 hover:border-white/40">
             Contactar
          </a>
        </div>
      </div>

      <!-- Welcome photo -->
      <div class="order-first md:order-none">
        <div class="relative mx-auto w-full max-w-md md:max-w-lg">

          <div class="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/10 to-white/0 blur-[80px] pointer-events-none"></div>

          <img
            ngSrc="/assets/welcome.webp"
            width="768" height="1152"
            alt="Bienvenido a mi Portfolio — consola de código con mensaje de bienvenida"
            class="relative rounded-3xl border border-white/10 shadow-lg w-full h-auto object-cover aspect-[3/4] md:aspect-[4/5] select-none"
            priority
          />
        </div>
      </div>
    </section>
  `
})
export class HomeComponent {}
