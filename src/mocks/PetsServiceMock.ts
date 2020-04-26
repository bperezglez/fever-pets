import { Observable } from 'rxjs';

export default class PetsServiceMock {
    constructor() {}
    getPetsList() {
      return new Observable((observer) => {
        observer.next({response: [{}], linkHeader: {}});
        observer.complete();
      })
    }
    getDefaultTableHeaders() {
      return [
        {
          name: 'photo_url',
          title: 'Imagen',
          sortable: false,
          order: null,
        },
      ];
    }
    getPetById({}) {
        return new Observable((observer) => {
            observer.next({petDetail: {}});
            observer.complete();
        });
    }
  }