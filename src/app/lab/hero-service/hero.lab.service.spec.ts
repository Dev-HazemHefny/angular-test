import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { HeroServiceForLab } from './hero.lab.service';
import { provideHttpClient } from '@angular/common/http';
import { provideZonelessChangeDetection } from '@angular/core';


describe("3-hero service (http) testing:", () => {
  let service: HeroServiceForLab;
let httpMock: HttpTestingController;

beforeEach(() => {
 TestBed.configureTestingModule({
      providers: [
        HeroServiceForLab,
        provideHttpClient(),
        provideHttpClientTesting(),
        provideZonelessChangeDetection()
      ],
    });

  service = TestBed.inject(HeroServiceForLab);
  httpMock = TestBed.inject(HttpTestingController);
});

afterEach(() => {
  httpMock.verify();
});

it('getHeroes function: send request and receive response successfully', () => {
  const mockHeroes = [
    { id: 1, name: "Superman", strength: 100 },
    { id: 2, name: "Batman", strength: 80 }
  ];

  service.getHeroes().subscribe((heroes) => {
    expect(heroes.length).toBe(2);
    expect(heroes).toEqual(mockHeroes);
  });

  const req = httpMock.expectOne('http://localhost:3000/heroes');
  expect(req.request.method).toBe('GET');
  req.flush(mockHeroes);
});

it('updateHero function: send request and receive response successfully', () => {
  const mockHero = { id: 1, name: "Superman Updated", strength: 120 };

  service.updateHero(mockHero).subscribe((res) => {
    expect(res).toEqual(mockHero);
  });

  const req = httpMock.expectOne('http://localhost:3000/heroes');
  expect(req.request.method).toBe('PUT');
  expect(req.request.body).toEqual(mockHero);
  req.flush(mockHero);
});

});