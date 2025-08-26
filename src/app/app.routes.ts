import { Routes } from '@angular/router';

import { HomeComponent }     from './pages/home/home';
import { ProjectsComponent } from './pages/projects/projects';
import { AboutComponent }    from './pages/about/about';
import { ContactComponent }  from './pages/contact/contact';

export const routes: Routes = [
  { path: '',         component: HomeComponent,     title: 'Inicio | Portfolio' },
  { path: 'projects', component: ProjectsComponent, title: 'Proyectos | Portfolio' },
  { path: 'about',    component: AboutComponent,    title: 'Sobre mí | Portfolio' },
  { path: 'contact',  component: ContactComponent,  title: 'Contacto | Portfolio' },
  { path: '**', redirectTo: '' },
];
