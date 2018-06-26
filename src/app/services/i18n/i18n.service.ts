import { Injectable } from '@angular/core';
import { TranslateService, TranslateLoader, MissingTranslationHandler, MissingTranslationHandlerParams } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';
import { mergeAll } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
declare const require: any;

@Injectable({
  providedIn: 'root'
})

export class I18nService {
  constructor(private translate: TranslateService) {
    translate.setDefaultLang('en');
    translate.use('en');
  }

  setDefaultLang(lang: string): void {
    this.translate.setDefaultLang(lang);
  }

  use(lang: string): void {
    this.translate.use(lang);
  }

  get(translation: string | Array<string>, interpolateParams?: object): Observable<object> {
    return this.translate.get(translation, interpolateParams);
  }

  set(key: string, value: string, lang?: string): void {
    this.translate.set(key, value, lang);
  }

  instant(translation: string | Array<string>, interpolateParams?: object): Observable<object> {
    return this.translate.instant(translation, interpolateParams);
  }
}

class GenerateTranslation {
  constructor(private _http: HttpClient) { }

  public generateTranslations(lang: string): Observable<object> {
    const i18nContext = require.context('../../../i18n', true, /^\.\/.*\.json$/);
    const selectedTranslations = i18nContext.keys().filter((file: string) => file.includes(lang));
    const translationRequest = selectedTranslations.map(file => this._http.get('i18n/' + file));
    return of(...translationRequest).pipe(mergeAll());
  }
}

export class CustomMissingTranslationHandler implements MissingTranslationHandler {
  handle(params: MissingTranslationHandlerParams): string {
    return `missing translation: ${params.key}`;
  }
}

export class CustomLoader implements TranslateLoader {
  constructor(private _http: HttpClient) { }

  getTranslation(lang: string): Observable<object> {
    const translations: GenerateTranslation = new GenerateTranslation(this._http);
    return translations.generateTranslations(lang);
  }
}
