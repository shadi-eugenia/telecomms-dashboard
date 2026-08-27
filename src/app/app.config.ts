import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { MockApiService } from './core/services/mock-api.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideClientHydration(withEventReplay()),
    provideHttpClient(),
    importProvidersFrom(
      // InMemory Web API configuration
      HttpClientInMemoryWebApiModule.forRoot(
        MockApiService,
        {
          dataEncapsulation: false,
          passThruUnknownUrl: true
        }
      )
    )
    
  ]
};
