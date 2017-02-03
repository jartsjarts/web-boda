import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';
import { LoginComponent } from './login.component';
import { UsersComponent } from './users.component';
import { UserFormComponent } from './user-form.component';
import { AddPlanComponent } from './add-plan.component';
import { NotFoundComponent } from './not-found.component';
import { PostsComponent } from './posts.component';
import { PlansComponent } from './plans.component';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'users',
    component: UsersComponent
  },
  {
    path: 'users/new',
    component: UserFormComponent
  },
  {
    path: 'users/:id',
    component: UserFormComponent
  },
  {
    path: 'plans',
    component: PlansComponent
  },
  {
    path: 'add-plan/:userId',
    component: AddPlanComponent
  },
  {
    path: 'not-found',
    component: NotFoundComponent
  }
  , { path: '**', component: NotFoundComponent }
];

export const routing = RouterModule.forRoot(appRoutes);

export const routedComponents = [HomeComponent, UserFormComponent, NotFoundComponent, PostsComponent, PlansComponent];
