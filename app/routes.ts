import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { MessagesComponent } from './components/messages/messages.component';
import { TradesComponent } from './components/trades/trades.component';
import { LoginComponent } from './components/login/login.component';
import { AccountComponent } from './components/account/account.component';
import { RegisterComponent } from './components/register/register.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AllBooksComponent } from './components/all-books/all-books.component';
import { MyBooksComponent } from './components/my-books/my-books.component';

export const routes: Routes = [
    { path: '', component: HomeComponent, terminal: true },
    { path: 'login', component: LoginComponent },
    { path: 'account', component: AccountComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'all-books', component: AllBooksComponent },
    { path: 'messages', component: MessagesComponent },
    { path: 'trades', component: TradesComponent },
    { path: 'my-books', component: MyBooksComponent }
];

export const routing = RouterModule.forRoot(routes, { useHash: true });
