import { APP_INITIALIZER, ApplicationConfig, isDevMode } from '@angular/core';
import { HttpClient, provideHttpClient, withFetch } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import {
  provideRouter,
  withComponentInputBinding,
  withHashLocation,
} from '@angular/router';

import { provideAnimations } from '@angular/platform-browser/animations';
import { provideServiceWorker } from '@angular/service-worker';

import { RemoteModuleInfoService } from './remote-module-info.service';
import { environment } from '../environments/environment';
import { routes } from './app.routes';

function initializeAppFactory(
  httpClient: HttpClient,
  rmi: RemoteModuleInfoService,
): () => Observable<any> {
  return () =>
    httpClient
      .get<any[]>(environment.MODULE_FEDERATION_URL)
      .pipe(tap((v) => (rmi.remoteModuleInfo = v)));
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withFetch()),
    {
      provide: APP_INITIALIZER,
      useFactory: initializeAppFactory,
      deps: [HttpClient, RemoteModuleInfoService],
      multi: true,
    },
    provideRouter(routes, withHashLocation(), withComponentInputBinding()),
    provideAnimations(),
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000',
    }),
  ],
};
