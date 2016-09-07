import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule, JsonpModule } from '@angular/http';

import { routing } from "./routes";

import { AppComponent }  from './app.component';
import { HomeComponent } from "./components/home/home.component";
import { MessagesComponent } from './components/messages/messages.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AllBooksComponent } from './components/all-books/all-books.component';
import { MyBooksComponent } from './components/my-books/my-books.component';

import { UsersService } from "./components/services/users.service";
import { BooksService } from "./components/services/books.service";
import { MessagesService } from "./components/services/messages.service";

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        JsonpModule,
        routing
    ],
    providers: [
        UsersService,
        BooksService,
        MessagesService
    ],     
    declarations: [
        AppComponent,
        LoginComponent,
        RegisterComponent,
        HomeComponent,
        MessagesComponent,
        NavbarComponent,
        MyBooksComponent,
        AllBooksComponent
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule { }
