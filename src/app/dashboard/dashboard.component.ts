import { Component, OnInit } from '@angular/core';
import { I18nService } from '../services/i18n/i18n.service';
import { TranslateService, TranslateLoader } from '@ngx-translate/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(public i18n: TranslateService,
    private route: ActivatedRoute, ) {
    this.route.queryParams.subscribe(queryParams => {
      if (!!queryParams.lang) {
        this.i18n.use(queryParams.lang);
      }
    });
  }

  ngOnInit() {
    this.i18n.get('title').subscribe((r) => {
      console.log(r);
    })
  }

  useLanguage(language: string) {
    this.i18n.use(language);
  }
}
