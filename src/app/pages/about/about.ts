import {
  Component, ElementRef, ViewChild, HostListener, OnDestroy, AfterViewInit, inject
} from '@angular/core';
import { NgFor, NgIf, NgOptimizedImage, isPlatformBrowser, DOCUMENT } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [NgFor, NgIf, NgOptimizedImage],
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
        También tengo conocimientos sólidos de <b>bases de datos SQL y NoSQL</b>, tales como MySQL, PostgreSQL y MongoDB.
      </p>
      <br>
      <p>
        Además, durante <b>4 años y medio de servicio en el Ejército de Tierra</b> adquirí una 
        sólida <b>disciplina</b>, capacidad de <b>trabajo en equipo bajo presión</b> y un fuerte 
        sentido de la <b>responsabilidad</b>. Estas cualidades, desarrolladas en un entorno 
        exigente, hoy son parte fundamental de mi forma de trabajar en el ámbito del desarrollo 
        de software y la colaboración con equipos multidisciplinares.
      </p>
      <br>
      <p>
        Como hobbie personal, aparte de lo típico de jugar al PC o salir con amigos, llevo varios años practicando <b>escalada</b>, un deporte que me encanta y que me ha enseñado mucho sobre la perseverancia y la superación de retos físicos y mentales.
      </p>
      <br>
      <p>
        Estoy entusiasmado por seguir creciendo profesionalmente, 
        enfrentando nuevos retos y contribuyendo con mis habilidades 
        a proyectos innovadores y de impacto.
      </p>

      <!-- Botón CV -->
      <div class="mt-6">
        <a
          href="assets/navbar/cv.pdf"
          target="_blank"
          rel="noopener"
          class="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/10 px-4 py-2 text-sm font-medium text-white hover:bg-white/15 transition"
          aria-label="Ver CV en PDF (se abre en una pestaña nueva)"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zm1 7V3.5L19.5 9zM8.75 13H9.5a1.75 1.75 0 0 1 0 3.5H8.75V18H7.5v-5h1.25zm.75 2.5a.75.75 0 0 0 0-1.5H8.75v1.5zM12 13h1.75a1.25 1.25 0 0 1 0 2.5H13v1.5h-1.25zm1.75 1a.25.25 0 0 0 0-.5H13v.5zM17.5 13h-2v5h1.25v-1.75H17a1.25 1.25 0 0 0 0-2.5zm-.5 1a.25.25 0 1 1 0 .5h-.75V14z"/>
          </svg>
          Ver CV (PDF)
        </a>
      </div>
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
           class="no-scrollbar flex gap-4 overflow-x-auto overflow-y-hidden scroll-smooth snap-x snap-mandatory 
                  overscroll-x-contain px-1 pl-10 pr-10 select-none"
           style="scroll-padding-left:2.5rem; scroll-padding-right:2.5rem;"
           tabindex="0"
           aria-label="Galería de fotos (desliza para ver más)">
        <figure *ngFor="let img of images; let i = index"
                class="snap-start shrink-0 cursor-zoom-in"
                (click)="openImage(i)">
          <img
            [ngSrc]="img.src"
            [alt]="img.alt"
            width="640" height="400"
            class="h-44 sm:h-56 md:h-64 w-auto rounded-2xl object-cover border border-white/10"
            loading="lazy" decoding="async" />
          <figcaption class="mt-2 text-xs text-neutral-400 text-center">
            {{ img.caption }}
          </figcaption>
        </figure>
      </div>
    </section>
  </section>

  <!-- Lightbox -->
  <div *ngIf="selectedIndex !== null"
       class="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
       (click)="closeImage()"
       aria-label="Imagen ampliada, clic para cerrar">

    <!-- Cerrar -->
    <button type="button"
            class="absolute top-4 right-4 h-10 w-10 rounded-full border border-white/20 bg-white/10 hover:bg-white/20 backdrop-blur flex items-center justify-center text-xl"
            (click)="closeImage(); $event.stopPropagation()"
            aria-label="Cerrar">✕</button>

    <!-- Flecha anterior -->
    <button type="button"
            class="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full border border-white/20 bg-white/10 hover:bg-white/20 backdrop-blur hidden sm:flex items-center justify-center text-2xl"
            (click)="prev($event)" aria-label="Anterior">‹</button>

    <!-- Contenido -->
    <div class="relative" (click)="$event.stopPropagation()">
      <figure class="inline-block text-center">
        <img
          [src]="images[selectedIndex!].src"
          [alt]="images[selectedIndex!].alt"
          class="max-h-[80vh] max-w-[90vw] w-auto h-auto
                 rounded-2xl border border-white/20 shadow-lg object-contain" />
        <figcaption class="mt-3 text-neutral-300 text-sm">
          {{ images[selectedIndex!].caption }}
        </figcaption>
      </figure>
    </div>

    <!-- Flecha siguiente -->
    <button type="button"
            class="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full border border-white/20 bg-white/10 hover:bg-white/20 backdrop-blur hidden sm:flex items-center justify-center text-2xl"
            (click)="next($event)" aria-label="Siguiente">›</button>
  </div>
  `,
  styles: [`
    .no-scrollbar { scrollbar-width: none; }
    .no-scrollbar::-webkit-scrollbar { display: none; }
  `]
})
export class AboutComponent implements AfterViewInit, OnDestroy {
  @ViewChild('rail') rail!: ElementRef<HTMLDivElement>;

  // --- SSR helpers ---
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);
  private documentRef = inject(DOCUMENT);

  private removeWheel?: () => void;

  images = [
    { src: '/assets/about/ejercito1.jpg',   alt: 'Ejército — instrucción',             caption: 'Ejército' },
    { src: '/assets/about/graduacion2.jpg', alt: 'Mejor Expediente Académico',         caption: 'Mejor Expediente Académico' },
    { src: '/assets/about/escalada2.jpg',   alt: 'DAM — prácticas y proyectos',        caption: 'Escalada' },
    { src: '/assets/about/graduacion1.jpg', alt: 'Graduación',                          caption: 'Graduación' },
    { src: '/assets/about/ejercito2.jpg',   alt: 'Ejército — operaciones',              caption: 'Ejército' },
    { src: '/assets/about/escalada1.jpg',   alt: 'Escalada',                            caption: 'Escalada' },
  ];

  /** Botones izq/der */
  scroll(dir: 1 | -1) {
    const el = this.rail?.nativeElement;
    if (!el) return;
    const step = Math.min(400, el.clientWidth * 0.8);
    el.scrollBy({ left: dir * step, behavior: 'smooth' });
  }

  /** Rueda → scroll horizontal (robusto) */
  ngAfterViewInit(): void {
    if (!this.isBrowser) return; // SSR guard

    const el = this.rail?.nativeElement;
    if (!el) return;

    const wheelHandler = (e: WheelEvent) => {
      if (el.scrollWidth <= el.clientWidth) return;

      // Normaliza delta según deltaMode
      let dx = e.deltaX;
      let dy = e.deltaY;
      if (e.deltaMode === 1) { dx *= 16; dy *= 16; }           // líneas → px
      else if (e.deltaMode === 2) { dx *= el.clientWidth; dy *= el.clientWidth; } // páginas → px

      const delta = Math.abs(dx) > Math.abs(dy) ? dx : dy;
      if (delta === 0) return;

      e.preventDefault();
      el.scrollLeft += delta;
    };

    el.addEventListener('wheel', wheelHandler, { passive: false });
    // Fallback legacy (algunos WebKit antiguos)
    // @ts-ignore
    el.addEventListener('mousewheel', wheelHandler, { passive: false });

    this.removeWheel = () => {
      el.removeEventListener('wheel', wheelHandler);
      // @ts-ignore
      el.removeEventListener('mousewheel', wheelHandler);
    };
  }

  /** Lightbox */
  selectedIndex: number | null = null;

  openImage(index: number) {
    this.selectedIndex = index;
    if (this.isBrowser) this.documentRef.body.style.overflow = 'hidden';
  }

  closeImage() {
    this.selectedIndex = null;
    if (this.isBrowser) this.documentRef.body.style.overflow = '';
  }

  prev(event?: Event) {
    if (event) event.stopPropagation();
    if (this.selectedIndex === null) return;
    this.selectedIndex = (this.selectedIndex - 1 + this.images.length) % this.images.length;
  }

  next(event?: Event) {
    if (event) event.stopPropagation();
    if (this.selectedIndex === null) return;
    this.selectedIndex = (this.selectedIndex + 1) % this.images.length;
  }

  @HostListener('window:keydown', ['$event'])
  onKeyDown(e: KeyboardEvent) {
    if (this.selectedIndex === null) return;
    if (e.key === 'Escape') this.closeImage();
    if (e.key === 'ArrowLeft') this.prev();
    if (e.key === 'ArrowRight') this.next();
  }

  ngOnDestroy(): void {
    if (this.isBrowser) this.documentRef.body.style.overflow = '';
    if (this.removeWheel) this.removeWheel();
  }
}
