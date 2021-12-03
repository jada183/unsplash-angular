import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-language-selector',
  templateUrl: './language-selector.component.html',
  styleUrls: ['./language-selector.component.scss']
})
export class LanguageSelectorComponent implements OnInit {

  constructor( private translate: TranslateService) { }
  public selectedLanguage = '';
  public languageSpanishCode = 'es';
  public languageEnglishCode = 'en';
  @Output() changeSelectedLanguage: EventEmitter<string> = new EventEmitter<string>();
  ngOnInit(): void {
    this,this.selectedLanguage = this.translate.getDefaultLang();
  }
  public changeLanguage(lang: string) {
    this.selectedLanguage = lang;
    this.changeSelectedLanguage.emit(lang);
    this.translate.setDefaultLang(lang);
  }
}
