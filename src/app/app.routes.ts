import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DataResolver } from './app.resolver';
import { MirrorComponent } from "./mirror/index";

export const routes: Routes = [
  { path: '',  component: MirrorComponent }
];


export const routing: ModuleWithProviders = RouterModule.forRoot(routes);