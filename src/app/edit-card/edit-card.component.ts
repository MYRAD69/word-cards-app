import { Component, ViewChild, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CardService } from '../services/card.service';
import { Card } from '../card';

@Component({
  selector: 'app-edit-card',
  templateUrl: './edit-card.component.html',
  styleUrls: ['./edit-card.component.css']
})
export class EditCardComponent implements OnInit {
  @ViewChild('form') form: any;
  showAlert: boolean = false;
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

  onSubmit(word: string, translation: string, otherTranslation: string) {
    const id = this.route.snapshot.paramMap.get('id');
    if (id && this.form.valid) {
      console.log(word, translation);
      if (otherTranslation) {
        console.log('otherTranslation', otherTranslation);
        this.cardService.changeCard(+id, { word: word, translation: translation, others: otherTranslation });
      }
      else {
        console.log('no otherTranslation');
        this.cardService.changeCard(+id, { word: word, translation: translation });
      }
      this.form.reset();
      window.alert('Card changed!');
      this.router.navigate(['/']);
    }
    else {
      window.alert('Form invalid');
    }
  }
}
