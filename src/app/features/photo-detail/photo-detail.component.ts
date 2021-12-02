import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { UnsplashApiService } from 'src/app/core/api-services/unsplash-api.service';
import { photo } from "../../core/models/photo.model";
@Component({
  selector: 'app-photo-detail',
  templateUrl: './photo-detail.component.html',
  styleUrls: ['./photo-detail.component.scss']
})
export class PhotoDetailComponent implements OnInit {

  constructor(private readonly route: ActivatedRoute, private readonly unsplashService: UnsplashApiService) { }
  public photoId: any;
  public photo: any;
  private readonly subscriptions: Array<Subscription> = [];
  ngOnInit(): void {
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
}
