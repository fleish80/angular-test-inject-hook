import { JOKE_URL, useJokeApi } from './use-joke-api.util';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Joke } from '../../models/joke.model';
import { provideHttpClient } from '@angular/common/http';
import { take } from 'rxjs/operators';

export class MockService {
  useJokeApiUtil = useJokeApi();
}

describe('useJokeApiUtil', () => {
  let httpTestingController: HttpTestingController;
  let mockService: MockService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting(), MockService],
    });

    httpTestingController = TestBed.inject(HttpTestingController);
    mockService = TestBed.inject(MockService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should return a joke successfully', (done) => {
    const mockJoke: Joke = {
      value: 'Chuck Norris can divide by zero.',
    };

    mockService.useJokeApiUtil.getRandomJoke().pipe(take(1))
    .subscribe(joke => {
      expect(joke).toEqual(mockJoke);
      done();
    });

    const req = httpTestingController.expectOne(JOKE_URL);
    expect(req.request.method).toEqual('GET');
    req.flush(mockJoke);
  });

  it('should return a error', (done) => {
    const mockErrorResponse = { status: 400, statusText: 'Bad Request' };
    const data = 'Invalid request parameters';

    mockService.useJokeApiUtil.getRandomJoke().pipe(take(1))
    .subscribe({error: (error) => {
        expect(error).toEqual(expect.objectContaining(mockErrorResponse));
        done();
      }
    });

    const req = httpTestingController.expectOne(JOKE_URL);
    expect(req.request.method).toEqual('GET');
    req.flush(data, mockErrorResponse);
  });
});