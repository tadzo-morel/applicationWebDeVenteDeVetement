import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LocaleService } from '../services/locale.service';

export const localeInterceptor: HttpInterceptorFn = (req, next) => {
  if (!req.url.includes('/api/v1/')) {
    return next(req);
  }
  const locale = inject(LocaleService).current();
  return next(req.clone({
    setHeaders: { 'Accept-Language': locale }
  }));
};
