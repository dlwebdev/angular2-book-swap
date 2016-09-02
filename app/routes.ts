import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { TestComponent } from './components/test/test.component';
import { NavbarComponent } from './components/navbar/navbar.component';

export const routes: Routes = [
    { path: '', component: HomeComponent, terminal: true },
    { path: 'login', component: LoginComponent },
    { path: 'test', component: TestComponent }
];

export const routing = RouterModule.forRoot(routes, { useHash: true });
