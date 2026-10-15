import { APP_INITIALIZER, ApplicationConfig, provideZoneChangeDetection, LOCALE_ID } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { routes } from './app.routes';
import { errorInterceptor } from './interceptors/error.interceptor';
import localeFr from '@angular/common/locales/fr';
import { registerLocaleData } from '@angular/common';
import { jwtInterceptor } from './interceptors/jwt.interceptor';
import { AuthService } from './services/auth';
import { lastValueFrom, of } from 'rxjs';

registerLocaleData(localeFr);

function initializeApp(authService: AuthService) {
  return () => {
    const init$ = authService.initializeAuth();
    return init$ ? lastValueFrom(init$) : Promise.resolve(null);
  };
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([jwtInterceptor, errorInterceptor])),
    { provide: LOCALE_ID, useValue: 'fr-FR' },
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [AuthService],
      multi: true
    }
  ]
};
