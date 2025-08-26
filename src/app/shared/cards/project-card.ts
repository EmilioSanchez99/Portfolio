import { Component, Input, signal } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [NgIf, NgFor],
  host: { class: 'block h-full' },
  template: `
    <article
      class="h-full rounded-2xl overflow-hidden border border-white/10
             bg-neutral-900/30 hover:border-white/30 transition shadow-sm flex flex-col">

      <!-- Imagen -->
      <img
        *ngIf="imageUrl"
        [src]="imageUrl"
        [alt]="title"
        class="block w-full h-full object-cover"
        loading="lazy"
      />

      <div class="p-5 flex-1 flex flex-col gap-3">
        <div class="flex items-start justify-between gap-3">
          <h3 class="text-lg font-semibold leading-tight">{{ title }}</h3>
          <span *ngIf="tag"
                class="text-[11px] px-2 py-1 rounded-full border border-white/10 text-neutral-300 whitespace-nowrap">
            {{ tag }}
          </span>
        </div>

        <p class="text-sm text-neutral-300">{{ description }}</p>

        <ul *ngIf="tech?.length" class="mt-1 flex flex-wrap gap-1.5">
          <li *ngFor="let t of tech"
              class="text-[11px] px-2 py-1 rounded-full bg-white/5 border border-white/10 text-neutral-300">
            {{ t }}
          </li>
        </ul>

        <div class="mt-3 flex gap-3 text-sm">
          <!-- Botón Demo con confirmación -->
          <button *ngIf="demoUrl"
                  (click)="openConfirm()"
                  class="underline hover:no-underline">
            Demo-APK          </button>

          <!-- Botón GitHub -->
          <a *ngIf="repoUrl"
             [href]="repoUrl" target="_blank" rel="noopener"
             class="underline hover:no-underline">
            Código
          </a>
        </div>
      </div>
    </article>

    <!-- Modal de confirmación -->
    <div *ngIf="showConfirm()"
         class="fixed inset-0 z-[100] flex items-center justify-center"
         role="dialog" aria-modal="true">

      <!-- Fondo oscuro -->
      <div class="absolute inset-0 bg-black/60" (click)="cancelConfirm()"></div>

      <!-- Caja modal -->
      <div class="relative mx-4 w-full max-w-md rounded-2xl border border-white/10 bg-neutral-900 p-6 shadow-xl">
        <h3 class="text-lg font-semibold mb-2">Descargar APK</h3>
        <p class="text-sm text-neutral-300 mb-6">
          Vas a descargar el archivo <b>.apk</b> desde GitHub Releases.<br>
          ¿Quieres continuar?
        </p>

        <div class="flex gap-3 justify-end">
          <button
            type="button"
            class="rounded-xl border border-white/10 px-4 py-2 hover:bg-white/10 transition"
            (click)="cancelConfirm()"
          >
            Cancelar
          </button>
          <button
            type="button"
            class="rounded-xl bg-white/90 text-black px-4 py-2 hover:bg-white transition"
            (click)="confirmDownload()"
          >
            Sí, descargar
          </button>
        </div>
      </div>
    </div>
  `,
})
export class ProjectCardComponent {
  @Input() title = '';
  @Input() description = '';
  @Input() tag?: string;
  @Input() tech: string[] = [];
  @Input() imageUrl?: string;
  @Input() demoUrl?: string;
  @Input() repoUrl?: string;

  // Estado del modal
  showConfirm = signal(false);

  openConfirm() {
    this.showConfirm.set(true);
  }

  confirmDownload() {
    if (this.demoUrl) {
      window.open(this.demoUrl, '_blank', 'noopener');
    }
    this.cancelConfirm();
  }

  cancelConfirm() {
    this.showConfirm.set(false);
  }
}
