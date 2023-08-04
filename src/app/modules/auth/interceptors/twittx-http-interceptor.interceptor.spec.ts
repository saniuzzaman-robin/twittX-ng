import { TestBed } from '@angular/core/testing';

import { TwittxHttpInterceptorInterceptor } from './twittx-http-interceptor.interceptor';

describe('TwittxHttpInterceptorInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      TwittxHttpInterceptorInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: TwittxHttpInterceptorInterceptor = TestBed.inject(TwittxHttpInterceptorInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
