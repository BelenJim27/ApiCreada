import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { provideHttpClient } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { importProvidersFrom } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'; // Import correcto

bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes), provideHttpClient(),importProvidersFrom(BrowserAnimationsModule), provideAnimationsAsync()]

}).catch((err) => console.error(err));
