import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AllBooksComponent } from './components/all-books/all-books.component';
import { MyBooksComponent } from './components/my-books/my-books.component';

export const routes: Routes = [
    { path: '', component: HomeComponent, terminal: true },
    { path: 'login', component: LoginComponent },
    { path: 'all-books', component: AllBooksComponent },
    { path: 'my-books', component: MyBooksComponent }
];

export const routing = RouterModule.forRoot(routes, { useHash: true });
