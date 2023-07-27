import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Card } from '../card';
import { CardService } from '../services/card.service';
import { getDatabase, ref, set, onValue, push } from "firebase/database";

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.css']
})
export class CardListComponent implements OnInit {

  cardList: Card[] = [];

  constructor(private router: Router, private cardService: CardService) { }

  ngOnInit(): void {
    this.cardService.getCardList().subscribe(list => {
      this.cardList = list;
    });
    console.log(this.cardList);
  }

  addCard(name: string, text: string, other?: string): void {
    let card: Card;
    if (other) {
      card = { word: name, translation: text, others: other };
    }
    else {
      card = { word: name, translation: text };
    }
    this.cardService.addCard(card);
  }

  onDelete(index: number) {
    console.log('delete', index);
    this.cardService.removeCard(index);
  }

  onEdit(index: number) {
    console.log('edit', index);
    this.router.navigate(['/card-edit', index]);
  }
}
