import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Card } from '../card';
import { CardService } from '../services/card.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  cardList: Card[] = [];

  constructor(private cardService: CardService) { }

  @Output() delete: EventEmitter<any> = new EventEmitter();
  @Output() edit: EventEmitter<any> = new EventEmitter();

  ngOnInit(): void {
    this.cardService.getCardList().subscribe(list => {
      this.cardList = list;
    });
    console.log(this.cardList);
  }
  onEdit() {
    this.edit.emit();
  }
  onDelete() {
    this.delete.emit();
  }
}
