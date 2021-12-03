import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColorSelectorComponent } from './color-selector/color-selector.component';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageSelectorComponent } from './language-selector/language-selector.component';



@NgModule({
  declarations: [ColorSelectorComponent, LanguageSelectorComponent],
  imports: [
    CommonModule,
    TranslateModule

  ],
  exports: [
    ColorSelectorComponent,
    LanguageSelectorComponent
  ]
})
export class SharedModule { }
