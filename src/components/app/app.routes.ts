import { Routes } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { ListComponent } from '../list/list.component';
import { AuthGuard } from '../../services/auth/auth.guard';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: HomeComponent },
    { path: 'shopping', component: ListComponent, canActivate: [AuthGuard] },
];
