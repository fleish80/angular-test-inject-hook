import { HttpErrorResponse } from '@angular/common/http';
import { DebugElement, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Joke } from '../models/joke.model';
import { JokeStoreService } from '../services/joke-store/joke-store.service';
import { AppComponent } from './app.component';
import { By } from '@angular/platform-browser';

describe('AppComponent', () => {

  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let componentDebugElm: DebugElement;

  const loading = signal(true);
  const loaded = signal(false);
  const joke = signal<Joke | null>(null);
  const error = signal<HttpErrorResponse | null>(null);

  const mockJokeStoreService = {
    loading,
    loaded,
    joke,
    error,
    loadJoke: jest.fn()
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        { provide: JokeStoreService, useValue: mockJokeStoreService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    componentDebugElm = fixture.debugElement;
  });

  afterEach(() => {
    loading.set(true);
    loaded.set(false);
    joke.set(null);
    error.set(null);
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display loading', () => {
    const paragraphElms = componentDebugElm.queryAll(By.css('p'));
    expect(paragraphElms.length).toBe(1);
    expect(paragraphElms[0].nativeElement.textContent).toBe('Loading...');
  });

  it('should display joke', () => {
    loaded.set(true);
    loading.set(false);
    joke.set({value: 'Chuck Norris’ trash throws itself out'});
    fixture.detectChanges();
    const paragraphElms = componentDebugElm.queryAll(By.css('p'));
    expect(paragraphElms.length).toBe(1);
    expect(paragraphElms[0].nativeElement.textContent).toBe('Chuck Norris’ trash throws itself out');
  });

  it('should display error', () => {
    loaded.set(true);
    loading.set(false);
    error.set(new HttpErrorResponse({status: 500, statusText: 'Bad Request'}));
    fixture.detectChanges();
    const paragraphElms = componentDebugElm.queryAll(By.css('p'));
    expect(paragraphElms.length).toBe(1);
    expect(paragraphElms[0].nativeElement.textContent).toBe('Http failure response for (unknown url): 500 Bad Request');
  });

  it('should reload another joke', () => {
    loaded.set(true);
    loading.set(false);
    joke.set({value: 'Chuck Norris’ trash throws itself out'});
    fixture.detectChanges();
    const reloadBtn = componentDebugElm.query(By.css('button'));
    reloadBtn.nativeElement.click();
    expect(mockJokeStoreService.loadJoke).toBeCalledWith();
    expect(mockJokeStoreService.loadJoke).toBeCalledTimes(1);
  });
});
