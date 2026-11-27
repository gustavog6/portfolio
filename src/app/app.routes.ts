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
    path: 'servicios',
    pathMatch: 'full',
    data: { tab: 'servicios' },
    loadComponent: loadWorkstation,
  },
  {
    path: 'experiencia',
    pathMatch: 'full',
    data: { tab: 'experiencia' },
    loadComponent: loadWorkstation,
  },
  {
    path: 'proyectos',
    pathMatch: 'full',
    data: { tab: 'proyectos' },
    loadComponent: loadWorkstation,
  },
  {
    path: 'contacto',
    pathMatch: 'full',
    data: { tab: 'contacto' },
    loadComponent: loadWorkstation,
  },
  { path: 'services', pathMatch: 'full', redirectTo: 'servicios' },
  { path: 'experience', pathMatch: 'full', redirectTo: 'experiencia' },
  { path: 'projects', pathMatch: 'full', redirectTo: 'proyectos' },
  { path: 'contact', pathMatch: 'full', redirectTo: 'contacto' },
  { path: 'workstation', pathMatch: 'full', redirectTo: '' },
  { path: '**', redirectTo: '' },
];
