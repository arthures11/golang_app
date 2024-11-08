import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './auth.guard';
import { PlayComponent } from './play/play.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'play', component: PlayComponent },
  { path: 'register', component: RegisterComponent },
  //{ path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }