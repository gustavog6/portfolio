import { Routes } from '@angular/router';

const loadWorkstation = () =>
  import('./components/retro-workstation/retro-workstation.component').then(
    (module) => module.RetroWorkstationComponent,
  );

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: loadWorkstation,
  },
  {
    path: 'services',
    pathMatch: 'full',
    data: { tab: 'servicios' },
    loadComponent: loadWorkstation,
  },
  {
    path: 'experience',
    pathMatch: 'full',
    data: { tab: 'experiencia' },
    loadComponent: loadWorkstation,
  },
  {
    path: 'projects',
    pathMatch: 'full',
    data: { tab: 'proyectos' },
    loadComponent: loadWorkstation,
  },
  {
    path: 'contact',
    pathMatch: 'full',
    data: { tab: 'contacto' },
    loadComponent: loadWorkstation,
  },
  { path: 'servicios', pathMatch: 'full', redirectTo: 'services' },
  { path: 'experiencia', pathMatch: 'full', redirectTo: 'experience' },
  { path: 'proyectos', pathMatch: 'full', redirectTo: 'projects' },
  { path: 'contacto', pathMatch: 'full', redirectTo: 'contact' },
  { path: 'workstation', pathMatch: 'full', redirectTo: '' },
  { path: '**', redirectTo: '' },
];
