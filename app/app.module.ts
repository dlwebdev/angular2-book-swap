import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule, JsonpModule } from '@angular/http';

import { routing } from "./routes";

import { AppComponent }  from './app.component';
import { HomeComponent } from "./components/home/home.component";
import { LoginComponent } from './components/login/login.component';
import { TestComponent } from "./components/test/test.component";
import { NavbarComponent } from './components/navbar/navbar.component';

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        JsonpModule,
        routing
    ],
    declarations: [
        AppComponent,
        LoginComponent,
        TestComponent,
        HomeComponent,
        NavbarComponent
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule { }
