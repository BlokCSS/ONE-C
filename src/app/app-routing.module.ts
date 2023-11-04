import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { redirectUnauthorizedTo, redirectLoggedInTo, canActivate } from '@angular/fire/auth-guard';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['']);
const redirectLoggedInToHome = () => redirectLoggedInTo(['home']);

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
    ...canActivate(redirectUnauthorizedToLogin)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'nuevo',
    loadChildren: () => import('./nuevo/nuevo.module').then( m => m.NuevoPageModule),
    ...canActivate(redirectUnauthorizedToLogin)
  },
  {
    path: 'repartidores',
    loadChildren: () => import('./repartidores/repartidores.module').then( m => m.RepartidoresPageModule),
    ...canActivate(redirectUnauthorizedToLogin)
  },
  {
    path: 'paquete-detalle/:id',
    loadChildren: () => import('./paquete-detalle/paquete-detalle.module').then( m => m.PaqueteDetallePageModule),
    ...canActivate(redirectUnauthorizedToLogin)
  },
  {
    path: 'repartidor-detalle/:id',
    loadChildren: () => import('./repartidor-detalle/repartidor-detalle.module').then( m => m.RepartidorDetallePageModule),
    ...canActivate(redirectUnauthorizedToLogin)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule),
    ...canActivate(redirectLoggedInToHome)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule),
    ...canActivate(redirectLoggedInToHome)
  },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
