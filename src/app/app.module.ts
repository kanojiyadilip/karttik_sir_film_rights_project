import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { APP_BASE_HREF } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';


import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserFormComponent } from './user-form/user-form.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// import { NgbAlertModule, NgbDatepickerModule, NgbDateStruct, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
// import { JsonPipe } from '@angular/common';
// import {CardModule} from 'primeng/card';
// import { DpDatePickerModule } from "ng2-date-picker";
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { RouterModule } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { FilmDetailComponent } from './film-detail/film-detail.component';
import { FormArrayComponent } from './form-array/form-array.component';
import { AddChipComponent } from './add-chip/add-chip.component';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    AppComponent,
    UserFormComponent,
    routingComponents,
    UserListComponent,
    FilmDetailComponent,
    FormArrayComponent,
    AddChipComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbNavModule,
    HttpClientModule,
    // NgbAlertModule,
    // NgbDatepickerModule,
    NgbModule,
    FormsModule,
    NgMultiSelectDropDownModule.forRoot(),
    RouterModule.forRoot([
      {
        path: '',
        pathMatch: 'full',
        component: AppComponent,
        // pathMatch: 'full',
      },
      {
        path: 'films',
        pathMatch: 'full',
        component: UserFormComponent,
        // pathMatch: 'full',
      }
    ] )
    // JsonPipe,
    // NgbModule
    // DpDatePickerModule
    // CardModule
  ],
  providers: [{provide: APP_BASE_HREF, useValue: '/' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
