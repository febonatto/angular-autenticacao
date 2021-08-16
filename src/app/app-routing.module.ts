import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ReleasesComponent } from './components/releases/releases.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'releases', component: ReleasesComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})
export class AppRoutingModule { }
