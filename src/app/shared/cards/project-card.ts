import { Component, Input } from '@angular/core';
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
          <a *ngIf="demoUrl"
             [href]="demoUrl" target="_blank" rel="noopener"
             class="underline hover:no-underline">Demo</a>
          <a *ngIf="repoUrl"
             [href]="repoUrl" target="_blank" rel="noopener"
             class="underline hover:no-underline">Código</a>
        </div>
      </div>
    </article>
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
}
