import { HttpErrorResponse } from '@angular/common/http';
import { computed, Injectable, signal } from '@angular/core';
import { JokeApiUtil } from '../../utils/joke-api/joke-api.util';
import { catchError, tap } from 'rxjs/operators';
import { Joke } from '../../models/joke.model';
import { EMPTY } from 'rxjs';

interface State {
  joke: Joke | null;
  error: HttpErrorResponse | null;
  loading: boolean;
  loaded: boolean;
}

@Injectable({ providedIn: 'root' })
export class JokeStoreService {
  #jokeApi = JokeApiUtil();

  constructor() {
    this.loadJoke();
  }

  #state = signal<State>({
    joke: null,
    error: null,
    loading: false,
    loaded: false,
  });

  joke = computed(() => this.#state().joke);
  error = computed(() => this.#state().error);
  loading = computed(() => this.#state().loading);
  loaded = computed(() => this.#state());

  loadJoke() {
    this.#state.update(state => ({...state,  loading: true }));

    this.#jokeApi.getRandomJoke().pipe(
      tap({
        next: (joke) => {
          this.#state.set({
            joke,
            error: null,
            loading: false,
            loaded: true,
          });
        },
        error: (error) => {
          this.#state.set({
            joke: null,
            error,
            loading: false,
            loaded: true,
          });
        },
      }),
      catchError(() => EMPTY),
    ).subscribe();
  }
}
