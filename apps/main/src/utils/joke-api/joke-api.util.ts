import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Joke } from '../../models/joke.model';

export const JOKE_URL = 'https://api.chucknorris.io/jokes/random';

export function JokeApiUtil() {

  const httpClient = inject(HttpClient);
  
  return () => httpClient.get<Joke>(JOKE_URL);
}
