import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () =>
      import('./components/retro-workstation/retro-workstation.component').then(
        (module) => module.RetroWorkstationComponent,
      ),
  },
  { path: 'workstation', pathMatch: 'full', redirectTo: '' },
  { path: '**', redirectTo: '' },
];
