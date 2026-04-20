import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http'; // Required for our API calls

export const appConfig: ApplicationConfig = {
  // Providing the HTTP client globally to the standalone application
  providers: [provideRouter(routes), provideHttpClient()]
};
