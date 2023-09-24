import { NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { JokeStoreService } from '../services/joke-store/joke-store.service';

@Component({
  standalone: true,
  imports: [NgIf],
  selector: 'df-root',
  template: `
  <p *ngIf="this.loading(); else jokeTemplate">Loading...</p>
  <ng-template #jokeTemplate>
    <p *ngIf="this.joke(); let joke">{{joke.value}}</p>
    <p *ngIf="this.error(); let error">{{error.message}}</p>
  </ng-template>
  <button (click)="loadAnotherJoke()">Load Another Joke</button>
  `,
})
export class AppComponent {

  #jokeStoreService = inject(JokeStoreService);
  joke = this.#jokeStoreService.joke;
  loading = this.#jokeStoreService.loading;
  error = this.#jokeStoreService.error;

  loadAnotherJoke() {
    this.#jokeStoreService.loadJoke();
  }
}
