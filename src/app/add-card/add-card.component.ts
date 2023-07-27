import { Component, ViewChild } from '@angular/core';
import { CardService } from '../services/card.service';

@Component({
  selector: 'app-add-card',
  templateUrl: './add-card.component.html',
  styleUrls: ['./add-card.component.css']
})
export class AddCardComponent {

  @ViewChild('form') form: any;
  showAlert: boolean = false;

  constructor(private cardService: CardService) { }

  onSubmit(word: string, translation: string, otherTranslation: string) {
    if (this.form.valid) {
      if (this.cardService.isPresent(word)) {
        window.alert('This word is already present');
        return;
      }
      console.log(word, translation);
      if (otherTranslation) {
        console.log('otherTranslation', otherTranslation);
        this.cardService.addCard({ word: word, translation: translation, others: otherTranslation });
      }
      else {
        console.log('no otherTranslation');
        this.cardService.addCard({ word: word, translation: translation });
      }
      this.form.reset();
      this.alert();
    }
    else {
      window.alert('Form invalid');
    }
  }

  alert() {
    this.showAlert = true;
    setTimeout(() => {
      this.showAlert = false;
    }, 1500); // Duration in milliseconds (e.g., 3 seconds)
  }

}
