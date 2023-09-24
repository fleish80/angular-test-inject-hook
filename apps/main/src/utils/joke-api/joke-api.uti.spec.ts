import { JokeApiUtil, JOKE_URL } from './joke-api.util';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Joke } from '../../models/joke.model';


export class MockService {}

describe('JokeApiUtil', () => {
  let httpTestingController: HttpTestingController;
  let jokeApiUtil: () => Promise<Joke>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [JokeApiUtil],
    });

    httpTestingController = TestBed.inject(HttpTestingController);
    jokeApiUtil = TestBed.inject(JokeApiUtil);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should return a joke', async () => {
    const mockJoke: Joke = {
      value: 'Chuck Norris can divide by zero.',
    };

    jokeApiUtil().then((joke) => {
      expect(joke).toEqual(mockJoke);
    });

    const req = httpTestingController.expectOne(JOKE_URL);
    expect(req.request.method).toEqual('GET');
    req.flush(mockJoke);
  });
});