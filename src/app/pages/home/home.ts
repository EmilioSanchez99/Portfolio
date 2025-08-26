import { Component } from '@angular/core';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section class="grid gap-8 md:grid-cols-2 items-center">
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
          <!-- Enlaces con routerLink -->
          <a [routerLink]="'/projects'"
             class="px-5 py-3 rounded-2xl bg-white text-neutral-900 font-semibold hover:opacity-90">
             Ver proyectos
          </a>

          <a [routerLink]="'/contact'"
             class="px-5 py-3 rounded-2xl border border-white/20 hover:border-white/40">
             Contactar
          </a>
        </div>
      </div>
    </section>
  `
})
export class HomeComponent {
  constructor(private router: Router) {}
}
