import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { UnsplashApiService } from 'src/app/core/api-services/unsplash-api.service';
import { photo } from "../../core/models/photo.model";
@Component({
  selector: 'app-photo-detail',
  templateUrl: './photo-detail.component.html',
  styleUrls: ['./photo-detail.component.scss']
})
export class PhotoDetailComponent implements OnInit {
  private spanishFormatDate = 'dd/MM/YYYY'; 
  private englishFormatDate = 'MM/dd/YYYY';
  constructor(private readonly route: ActivatedRoute, private readonly unsplashService: UnsplashApiService, private translate: TranslateService) { }
  public photoId: any;
  public photo: any;
  public dateFormat = 'MM/dd/YYYY';
  private readonly subscriptions: Array<Subscription> = [];
  ngOnInit(): void {
    this.changeSelectedLanguage(this.translate.getDefaultLang());
    this.photoId = this.route.snapshot.paramMap.get('id');
    if (this.photoId) {
      this.subscriptions.push(
        this.unsplashService.gePhotosById(this.photoId).subscribe((photo: photo) => {
          this.photo = photo;
        })
      );
    }
  }

  ngOnDestroy() {
    for (const subs of this.subscriptions) {
      subs.unsubscribe();
    }
  }
  public changeSelectedLanguage(lang: string) {
    if(lang === 'es') {
      this.dateFormat = this.spanishFormatDate;
    } else if(lang=== 'en') {
      this.dateFormat = this.englishFormatDate;
    }
  }
}
