import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import './rxjs-extensions';
import { AppComponent } from './app.component';
import { routing, routedComponents } from './app.routing';
import { NavBarComponent } from './navbar.component';
import { HomeComponent } from './home.component';
import { LoginComponent } from './login.component';
import { UsersComponent } from './users.component';
import { UserService } from './users.service';
import { CurrencyService } from './currencies.service';
import { UserFormComponent } from './user-form.component';
import { AddPlanComponent } from './add-plan.component';
import { NotFoundComponent } from './not-found.component';
import { SpinnerComponent } from './spinner.component';
import { PostsComponent } from './posts.component';
import { PlansComponent } from './plans.component';
import { TabComponent } from './tab.component';
import { TabsComponent } from './tabs.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    routing,
    HttpModule
  ],
  declarations: [
    AppComponent,
    NavBarComponent,
    HomeComponent,
    LoginComponent,
    UsersComponent,
    UserFormComponent,
    AddPlanComponent,
    NotFoundComponent,
    PostsComponent,
    PlansComponent,
    SpinnerComponent,
    routedComponents,
    TabComponent,
    TabsComponent
  ],
  providers: [
    UserService,
    CurrencyService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
