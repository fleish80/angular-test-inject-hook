import { TestBed } from '@angular/core/testing';
import { JokeStoreService } from './joke-store.service';
import { useJokeApi } from '../../utils/use-joke-api/use-joke-api.util';

describe('JokeStoreService', () => {
  let service: JokeStoreService;
  let useJokeApiSpy: jest.SpyInstance;


  beforeEach(() => {
    useJokeApiSpy = jest.spyOn(useJokeApi(), 'getRandomJoke');
    TestBed.configureTestingModule({});
    service = TestBed.inject(JokeStoreService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
