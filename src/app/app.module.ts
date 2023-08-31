import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TwittxHttpInterceptorInterceptor } from './modules/auth/interceptors/twittx-http-interceptor.interceptor';
import { ComingSoonComponent } from './shared/components/coming-soon/coming-soon.component';
import { ServiceWorkerModule } from '@angular/service-worker';

@NgModule({
  declarations: [AppComponent, ComingSoonComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000',
    }),
  ],
  exports: [AppComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TwittxHttpInterceptorInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
