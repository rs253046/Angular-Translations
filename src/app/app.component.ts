import { Component } from '@angular/core';
import { I18nService } from './services/i18n/i18n.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(
    public i18n: I18nService) {

  }
}
