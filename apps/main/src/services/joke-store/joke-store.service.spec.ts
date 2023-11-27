import { TestBed } from '@angular/core/testing';
import { JokeStoreService } from './joke-store.service';
import * as useJokeApiUtil from '../../utils/use-joke-api/use-joke-api.util';
import { of, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

describe('JokeStoreService', () => {
  let service: JokeStoreService;
  const getRandomJokeSpy = jest.fn();
  jest.spyOn(useJokeApiUtil, 'useJokeApi').mockReturnValue({getRandomJoke: getRandomJokeSpy});

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should set joke succesfully', () => {
    getRandomJokeSpy.mockReturnValue(of({value: 'Chuck Norris can kill two stones with one bird'}));
    service = TestBed.inject(JokeStoreService);

    expect(service.joke()).toEqual({value: 'Chuck Norris can kill two stones with one bird'});
    expect(service.loading()).toBe(false);
    expect(service.loaded()).toBe(true);
    expect(service.error()).toBeNull();
  });

  it('should not set joke because the api error', () => {
    const error = new HttpErrorResponse({statusText: 'Bad request', status: 500});
    getRandomJokeSpy.mockReturnValue(throwError(() => error));
    service = TestBed.inject(JokeStoreService);

    expect(service.joke()).toBeNull();
    expect(service.loading()).toBe(false);
    expect(service.loaded()).toBe(true);
    expect(service.error()).toEqual(error);
  });
});
