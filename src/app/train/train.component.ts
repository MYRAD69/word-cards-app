import { Component, OnInit } from '@angular/core';
import { CardService } from '../services/card.service';
import { Card } from '../card';

@Component({
  selector: 'app-train',
  templateUrl: './train.component.html',
  styleUrls: ['./train.component.css']
})
export class TrainComponent implements OnInit {

  toggleProperty = false;
  orientation = true;
  cardList: Card[] = [];
  index: number = 0;

  constructor(private cardService: CardService) { }

  ngOnInit(): void {
    this.cardService.getCardList().subscribe(data => {
      this.cardList = data;
    });
  }

  getCard(): Card {
    return this.cardList[this.index];
  }

  onNext() {
    this.index++;
    if (this.index >= this.cardList.length) {
      this.index = 0;
    }
    this.orientation = !this.toggleProperty;
  }

  onPrev() {
    this.index--;
    if (this.index < 0) {
      this.index = this.cardList.length - 1;
    }
    this.orientation = !this.toggleProperty;
  }

  toggle() {
    this.toggleProperty = !this.toggleProperty;
  }

}
