import { EditCardComponent } from './edit-card/edit-card.component';
import { CardSingleComponent } from './card-single/card-single.component';
import { TrainComponent } from './train/train.component';
import { AddCardComponent } from './add-card/add-card.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardListComponent } from './card-list/card-list.component';

const routes: Routes = [
  { path: '', redirectTo: '/card-list', pathMatch: 'full' },
  { path: 'card-list', component: CardListComponent },
  { path: 'add-card', component: AddCardComponent },
  { path: 'train', component: TrainComponent },
  { path: 'card-single/:id', component: CardSingleComponent },
  { path: 'card-edit/:id', component: EditCardComponent },
  { path: '**', redirectTo: '/card-list' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
