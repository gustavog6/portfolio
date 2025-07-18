import { DialogModule } from '@angular/cdk/dialog';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
    providers: [importProvidersFrom(BrowserModule, DialogModule)]
}