import { Observable } from 'rxjs';

const queryParamsMock = {
  order: 'asc',
  by: 'name',
  page: 1,
};
export default class ActivatedRouteMock {
  _queryParams: Observable<any>;
  constructor() {}
  get queryParams() {
    return new Observable((observer) => {
      observer.next(this._queryParams || queryParamsMock);
      observer.complete();
    });
  }
  set queryParams(queryParams) {
    this._queryParams = queryParams;
  }
  get paramMap() {
      return {
        get: this.getParamMap,
      };
  }
  getParamMap() {
    return 1;
  }
  get snapshot() {
    return {
      queryParams: this.queryParams,
      paramMap: this.paramMap,
    };
  }
}
