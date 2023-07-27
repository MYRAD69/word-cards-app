import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { CardService } from '../services/card.service';
import { Card } from '../card';

@Component({
  selector: 'app-card-single',
  templateUrl: './card-single.component.html',
  styleUrls: ['./card-single.component.css']
})
export class CardSingleComponent implements OnInit {

  card: Card = { word: '', translation: '' };

  constructor(private route: ActivatedRoute, private router: Router, private cardService: CardService) {
    this.route.params.subscribe(params => console.log(params));
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.card = this.cardService.getCard(+id);
    }
    if (!this.card) {
      window.alert('Card not found!');
      this.router.navigate(['/']);
    }
    console.log(this.card);
  }
}
