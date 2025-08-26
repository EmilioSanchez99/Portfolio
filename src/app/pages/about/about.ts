import { Component, ElementRef, ViewChild } from '@angular/core';
import { NgFor } from '@angular/common';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [NgFor, NgOptimizedImage],
  template: `
  <section class="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
    <section class="prose prose-invert max-w-none">
      <h2 class="text-3xl font-bold mb-6">Sobre mí</h2>

      <p>
        Soy <b>Emilio Sánchez Vargas</b>, desarrollador especializado en 
        <b>aplicaciones Android</b> y <b>desarrollo web moderno</b>. 
        Mi camino en la programación comenzó con el 
        <b>Grado Superior en Desarrollo de Aplicaciones Multiplataforma (DAM)</b>, 
        donde obtuve el <b>mejor expediente académico de mi promoción</b>.
      </p>
<br>
      <p>
        Durante mi formación y proyectos personales he trabajado con 
        <b>Java, Kotlin y Firebase</b> para Android, y con 
        <b>Angular, TailwindCSS y Spring Boot</b> en entornos web. 
        Me apasiona combinar un <b>diseño minimalista y accesible</b> con 
        código limpio y optimizado, buscando siempre soluciones rápidas, 
        escalables y con una buena experiencia de usuario.
      </p>
<br>
      <p>
  Además, durante <b>4 años y medio de servicio en el Ejército de Tierra</b> adquirí una 
  sólida <b>disciplina</b>, capacidad de <b>trabajo en equipo bajo presión</b> y un fuerte 
  sentido de la <b>responsabilidad</b>. Estas cualidades, desarrolladas en un entorno 
  exigente, hoy son parte fundamental de mi forma de trabajar en el ámbito del desarrollo 
  de software y la colaboración con equipos multidisciplinares.
</p>
      <p>
        Estoy entusiasmado por seguir creciendo profesionalmente, 
        enfrentando nuevos retos y contribuyendo con mis habilidades 
        a proyectos innovadores y de impacto.
      </p>
    </section>

    <!-- Galería horizontal -->
    <section class="relative mt-8">
      <!-- Controles -->
      <div class="pointer-events-none absolute inset-y-0 left-0 right-0 flex items-center justify-between">
        <button type="button"
                class="pointer-events-auto hidden sm:flex h-10 w-10 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 backdrop-blur border border-white/20 ml-2"
                aria-label="Desplazar a la izquierda"
                (click)="scroll(-1)">
          ‹
        </button>
        <button type="button"
                class="pointer-events-auto hidden sm:flex h-10 w-10 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 backdrop-blur border border-white/20 mr-2"
                aria-label="Desplazar a la derecha"
                (click)="scroll(1)">
          ›
        </button>
      </div>

      <!-- Gradientes laterales -->
      <div class="pointer-events-none absolute left-0 top-0 h-full w-10 bg-gradient-to-r from-neutral-950 to-transparent"></div>
      <div class="pointer-events-none absolute right-0 top-0 h-full w-10 bg-gradient-to-l from-neutral-950 to-transparent"></div>

      <!-- Rail -->
      <div #rail
           class="no-scrollbar flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory px-1"
           tabindex="0"
           aria-label="Galería de fotos (desliza para ver más)">
        <figure *ngFor="let img of images"
                class="snap-start shrink-0">
          <img
            [ngSrc]="img.src"
            [alt]="img.alt"
            width="640" height="400"
            class="h-44 sm:h-56 md:h-64 w-auto rounded-2xl object-cover border border-white/10"
            loading="lazy" decoding="async"
          />
          <figcaption class="mt-2 text-xs text-neutral-400 text-center">
            {{ img.caption }}
          </figcaption>
        </figure>
      </div>
    </section>
    </section>
  `,
  styles: [`
    /* Oculta barra horizontal en navegadores comunes */
    .no-scrollbar { scrollbar-width: none; }
    .no-scrollbar::-webkit-scrollbar { display: none; }
  `]
})
export class AboutComponent {
  @ViewChild('rail') rail!: ElementRef<HTMLDivElement>;

  // 👉 Sustituye por tus ficheros reales en /assets/about/
  images = [
    { src: '/assets/about/ic_dekra.png', alt: 'Ejército — instrucción', caption: 'Ejército · Instrucción' },
    { src: '/assets/about/ic_dekra.png', alt: 'Ejército — operaciones', caption: 'Ejército · Operaciones' },
    { src: '/assets/about/ic_dekra.png',      alt: 'DAM — prácticas y proyectos', caption: 'DAM · Proyectos' },
    { src: '/assets/about/ic_dekra.png',      alt: 'DAM — graduación', caption: 'DAM · Graduación' },
    { src: '/assets/about/ic_dekra.png', alt: 'Ejército — instrucción', caption: 'Ejército · Instrucción' },
    { src: '/assets/about/ic_dekra.png', alt: 'Ejército — operaciones', caption: 'Ejército · Operaciones' },
    { src: '/assets/about/ic_dekra.png',      alt: 'DAM — prácticas y proyectos', caption: 'DAM · Proyectos' },
    { src: '/assets/about/ic_dekra.png',      alt: 'DAM — graduación', caption: 'DAM · Graduación' },
  ];

  scroll(dir: 1 | -1) {
    const el = this.rail?.nativeElement;
    if (!el) return;
    const step = Math.min(400, el.clientWidth * 0.8); // desplazamiento cómodo
    el.scrollBy({ left: dir * step, behavior: 'smooth' });
  }
}
