import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserFormComponent } from './user-form/user-form.component'
import { AppComponent } from './app.component';
import { UserListComponent } from './user-list/user-list.component';
import { FilmDetailComponent } from './film-detail/film-detail.component';
import { DataCreationComponent } from './admin/data-creation/data-creation.component';
const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: UserListComponent,
    // pathMatch: 'full',
  },
  {
    path: 'user',
    pathMatch: 'full',
    component: UserFormComponent,
    // pathMatch: 'full',
  },
  {
    path: 'film-detail',
    pathMatch: 'full',
    component: FilmDetailComponent,
    // pathMatch: 'full',
  },
  {
    path: 'creation',
    pathMatch: 'full',
    component: DataCreationComponent
  }
]  

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [AppComponent, UserFormComponent]

