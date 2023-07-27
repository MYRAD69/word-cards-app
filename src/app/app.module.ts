import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CardComponent } from './card/card.component';
import { CardListComponent } from './card-list/card-list.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AddCardComponent } from './add-card/add-card.component';
import { TrainComponent } from './train/train.component';
import { ViewCardDirective } from './directives/view-card.directive';
import { CardSingleComponent } from './card-single/card-single.component';
import { EditCardComponent } from './edit-card/edit-card.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideDatabase, getDatabase } from '@angular/fire/database';

@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    CardListComponent,
    NavbarComponent,
    AddCardComponent,
    TrainComponent,
    ViewCardDirective,
    CardSingleComponent,
    EditCardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideDatabase(() => getDatabase())
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
