import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Card } from '../card';
import { getDatabase, ref, set, onValue, push } from "firebase/database";

@Injectable({
  providedIn: 'root'
})
export class CardService {
  private cardList: Card[] = [];
  private cardListSubject: BehaviorSubject<Card[]> = new BehaviorSubject<Card[]>(this.cardList);

  constructor() {
    const database = getDatabase();
    onValue(ref(database, 'cards/'), (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        this.cardList.push({ word: childSnapshot.val().word, translation: childSnapshot.val().translation, others: childSnapshot.val().others });
      });
    }, {
      onlyOnce: true
    });
  }

  getCardList(): Observable<Card[]> {
    return this.cardListSubject.asObservable();
  }

  getCard(index: number): Card {
    return this.cardList[index];
  }

  isPresent(word: string): boolean {
    return this.cardList.some(card => card.word === word);
  }

  changeCard(index: number, card: Card): void {
    const database = getDatabase();
    onValue(ref(database, 'cards/'), (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        if (childSnapshot.val().word === this.cardList[index].word) {
          const cardRef = ref(database, 'cards/' + childSnapshot.key);
          if (card.others) {
            set(cardRef, {
              word: card.word,
              translation: card.translation,
              others: card.others
            });
          }
          else {
            set(cardRef, {
              word: card.word,
              translation: card.translation
            });
          }
        }
      });
    }, {
      onlyOnce: true
    });
    this.cardList[index] = card;
    this.cardListSubject.next(this.cardList);
  }

  addCard(card: Card): void {
    this.cardList.push(card);
    this.cardListSubject.next(this.cardList);
    const database = getDatabase();
    const cardListRef = ref(database, 'cards');
    const newCardRef = push(cardListRef);
    if (card.others) {
      set(newCardRef, {
        word: card.word,
        translation: card.translation,
        others: card.others
      });
    }
    else {
      set(newCardRef, {
        word: card.word,
        translation: card.translation
      });
    }
  }

  removeCard(index: number): void {
    if (index > -1) {
      let card = this.cardList[index];
      const database = getDatabase();
      onValue(ref(database, 'cards/'), (snapshot) => {
        snapshot.forEach((childSnapshot) => {
          if (childSnapshot.val().word === card.word) {
            const cardRef = ref(database, 'cards/' + childSnapshot.key);
            set(cardRef, null);
          }
        });
      }, {
        onlyOnce: true
      });
      this.cardList.splice(index, 1);
      this.cardListSubject.next(this.cardList);
    }
  }
}
