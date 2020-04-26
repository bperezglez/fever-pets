import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { PetsService } from './pets.service';

import { environment } from './../../../environments/environment';
import { HttpHeaders } from '@angular/common/http';

describe('PetsService', () => {
  let service: PetsService;
  let httpMock: HttpTestingController;
  let petsMock = [
    {
      "id": 1,
      "name": "Jade",
      "kind": "dog",
      "weight": 2741,
      "height": 20,
      "length": 35,
      "photo_url": "https://cdn2.thedogapi.com/images/rJH9KQoEX.gif",
      "description": "Bacon ipsum dolor amet ham pork belly cupim rump salami"
    },
    {
      "id": 2,
      "name": "Stinky",
      "kind": "cat",
      "weight": 6712,
      "height": 25,
      "length": 52,
      "photo_url": "https://cdn2.thecatapi.com/images/2lt.jpg",
      "description": "I shall purr myself to sleep pee in the shoe scratch at fleas",
      "number_of_lives": 5
    },
    {
      "id": 3,
      "name": "Nitro",
      "kind": "dog",
      "weight": 7509,
      "height": 60,
      "length": 142,
      "photo_url": "https://cdn2.thedogapi.com/images/BJT0Jx5Nm_1280.jpg",
      "description": "Meatloaf sausage drumstick pork chop"
    },
    {
      "id": 4,
      "name": "Sabbath",
      "kind": "cat",
      "weight": 1,
      "height": 1,
      "length": 1,
      "photo_url": "https://cdn2.thecatapi.com/images/6tf.jpg",
      "description": "Meow until belly rubs",
      "number_of_lives": 6
    },
    {
      "id": 5,
      "name": "Cutie",
      "kind": "dog",
      "weight": 1572,
      "height": 20,
      "length": 35,
      "photo_url": "https://cdn2.thedogapi.com/images/HkuYlxqEQ_1280.jpg",
      "description": "Long doggo heckin angery woofer snoot heckin angery woofer"
    },
  ];
  let headerLinkMock = {
    'first':'http://my-json-server.typicode.com/Feverup/fever_pets_data/pets?_page=1&_limit=10',
    'next':'http://my-json-server.typicode.com/Feverup/fever_pets_data/pets?_page=2&_limit=10',
    'last':'http://my-json-server.typicode.com/Feverup/fever_pets_data/pets?_page=3&_limit=10'
  }
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [PetsService]
    });
    service = TestBed.get(PetsService);
    httpMock = TestBed.get(HttpTestingController);
  });
  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  describe('@getPetList default value', () => {
    it('call getPetList', () => {
      const page = 1;
      const limit = 10;
      service.getPetsList({}).subscribe(data => {
        expect(data.response).toEqual(petsMock);
        expect(data.linkHeader).toEqual(headerLinkMock);
      });
      const request = httpMock.expectOne( `${environment.API_URL}pets?_page=${page}&_limit=${limit}`);
      let headers = new HttpHeaders();
        headers = headers.set('Link', '<http://my-json-server.typicode.com/Feverup/fever_pets_data/pets?_page=1&_limit=10>;' +
          ' rel="first", <http://my-json-server.typicode.com/Feverup/fever_pets_data/pets?_page=2&_limit=10>; rel="next",' +
          ' <http://my-json-server.typicode.com/Feverup/fever_pets_data/pets?_page=3&_limit=10>; rel="last"');

      expect(request.request.method).toBe('GET');
      request.flush(petsMock, {headers});
    });
  });

  describe('@getPetList with order', () => {
    it('call getPetList order asc', () => {
      const page = 1;
      const limit = 10;
      const order = 'asc';
      const by = 'kind';
      service.getPetsList({page, limit, order, by}).subscribe(data => {
        console.log(data)
        expect(data.response).toEqual(petsMock);
        expect(data.linkHeader).toEqual(headerLinkMock);
      });
      const request = httpMock.expectOne( `${environment.API_URL}pets?_page=${page}&_limit=${limit}`);
      let headers = new HttpHeaders();
        headers = headers.set('Link', '<http://my-json-server.typicode.com/Feverup/fever_pets_data/pets?_page=1&_limit=10>;' +
          ' rel="first", <http://my-json-server.typicode.com/Feverup/fever_pets_data/pets?_page=2&_limit=10>; rel="next",' +
          ' <http://my-json-server.typicode.com/Feverup/fever_pets_data/pets?_page=3&_limit=10>; rel="last"');

      expect(request.request.method).toBe('GET');
      request.flush(petsMock, {headers});
    });
    it('call getPetList order desc', () => {
      const page = 1;
      const limit = 10;
      const order = 'desc';
      const by = 'kind';
      service.getPetsList({page, limit, order, by}).subscribe(data => {
        console.log(data)
        expect(data.response).toEqual(petsMock);
        expect(data.linkHeader).toEqual(headerLinkMock);
      });
      const request = httpMock.expectOne( `${environment.API_URL}pets?_page=${page}&_limit=${limit}`);
      let headers = new HttpHeaders();
        headers = headers.set('Link', '<http://my-json-server.typicode.com/Feverup/fever_pets_data/pets?_page=1&_limit=10>;' +
          ' rel="first", <http://my-json-server.typicode.com/Feverup/fever_pets_data/pets?_page=2&_limit=10>; rel="next",' +
          ' <http://my-json-server.typicode.com/Feverup/fever_pets_data/pets?_page=3&_limit=10>; rel="last"');

      expect(request.request.method).toBe('GET');
      request.flush(petsMock, {headers});
    });
    it('call getPetList order undefined', () => {
      const page = 1;
      const limit = 10;
      const order = 'undefined';
      const by = 'kind';
      service.getPetsList({page, limit, order, by}).subscribe(data => {
        console.log(data)
        expect(data.response).toEqual(petsMock);
        expect(data.linkHeader).toEqual(headerLinkMock);
      });
      const request = httpMock.expectOne( `${environment.API_URL}pets?_page=${page}&_limit=${limit}`);
      let headers = new HttpHeaders();
        headers = headers.set('Link', '<http://my-json-server.typicode.com/Feverup/fever_pets_data/pets?_page=1&_limit=10>;' +
          ' rel="first", <http://my-json-server.typicode.com/Feverup/fever_pets_data/pets?_page=2&_limit=10>; rel="next",' +
          ' <http://my-json-server.typicode.com/Feverup/fever_pets_data/pets?_page=3&_limit=10>; rel="last"');

      expect(request.request.method).toBe('GET');
      request.flush(petsMock, {headers});
    });
  });
  describe('@getPetById', () => {
    it('call getPetById', () => {
      service.getPetById({id: 1}).subscribe(data => {
        expect(data).toEqual(petsMock[0]);
      });
      const request = httpMock.expectOne( `${environment.API_URL}pets/${1}`);

      expect(request.request.method).toBe('GET');
      request.flush(petsMock[0]);
    });
  });

});
