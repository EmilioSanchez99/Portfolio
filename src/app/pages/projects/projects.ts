import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { ProjectCardComponent } from '../../shared/cards/project-card';

type Project = {
  title: string;
  description: string;
  tag?: string;
  tech?: string[];
  imageUrl?: string;
  demoUrl?: string;
  repoUrl?: string;
};

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [NgFor, ProjectCardComponent],
  template: `
    <section>
      <h2 class="text-3xl font-bold mb-6">Proyectos</h2>

      <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <app-project-card
          *ngFor="let p of projects"
          [title]="p.title"
          [description]="p.description"
          [tag]="p.tag"
          [tech]="p.tech || []"
          [imageUrl]="p.imageUrl"
          [demoUrl]="p.demoUrl"
          [repoUrl]="p.repoUrl"
        />
      </div>
    </section>
  `
})
export class ProjectsComponent {
  projects: Project[] = [
    {
      title: 'Portfolio Angular',
      description: 'SSR + Tailwind, rutas standalone y diseño oscuro.',
      tag: 'Angular',
      tech: ['Angular', 'Tailwind', 'SSR'],
      imageUrl: '/assets/projects/ic_angular.png',
      repoUrl: 'https://github.com/tuusuario/portfolio'
     
    },
    {
      title: 'App Objetivos Financieros',
      description: 'Cards con metas, diálogos para ingresar cantidades y progreso.',
      tag: 'Android',
      tech: ['Java', 'Material Design','Firebase','XML'],
      imageUrl: '/assets/projects/ic_finanpie.png',
      demoUrl: '#',
      repoUrl: '#'
    },
    {
      title: 'Rediseño completo de App Android',
      description: 'Migración de ListView a RecyclerView con CardViews modernos.',
      tag: 'Android UI',
      tech: ['KPIs','RecyclerView', 'CardView', 'Material Design'],
      imageUrl: '/assets/projects/ic_dekra.png'
    }
  ];
}
