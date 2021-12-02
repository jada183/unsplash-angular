import { Component, OnInit } from '@angular/core';
import { UnsplashApiService } from 'src/app/core/api-services/unsplash-api.service';
import { map } from 'rxjs/operators';
import { pipe, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { searchByPhotoResponse } from 'src/app/core/models/search-by-filter-response.model';
import { searchPhotoFilters } from 'src/app/core/models/search-photos-filter.model';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private readonly unsplashService: UnsplashApiService, private readonly router: Router) { }
  public filter = '';
  public imageList: Array<any> = [];
  public error: boolean = false;
  public page = 1;
  public perPage = 10;
  public orientation = '';
  public enableAdvanceSearch = false;
  public selectedColor = '';
  public infiniteScrollDisabled = false;
  public orientationList = [
    { value: '', label: '' },
    { value: 'landscape', label: 'Paisaje' },
    { value: 'portrait',  label: 'Retrato'},
    { value: 'squarish', label: 'Cuadrangular' },
  ]
  private readonly subscriptions: Array<Subscription> = [];
  ngOnInit(): void {

  }
  public search() {
    this.infiniteScrollDisabled = false;
    this.page = 1;
    const filters = this.getFilters()
    this.subscriptions.push(
      this.unsplashService.gePhotosByFilter(filters).subscribe({
        next: (response: searchByPhotoResponse) => {
          this.error = false;
          if (response.results.length > this.perPage) {
            response.results.pop();
          }
          this.disableInfityScrollAcordingToListLength(response.results);
          this.imageList = response.results;
        },
        error: (e) => {
          this.error = true;
        },
        complete: () => { }
      })
    );
  }
  public onScroll() {
    this.page = this.page + 1;
    const filters = this.getFilters()
    this.subscriptions.push(
      this.unsplashService.gePhotosByFilter(filters).subscribe(
        {
          next: (response: searchByPhotoResponse) => {
            this.disableInfityScrollAcordingToListLength(response.results);
            const imageListAux = this.imageList.concat(response.results);
            this.imageList = imageListAux;
          },
          error: (e) => {
            this.infiniteScrollDisabled = true;
          },
          complete: () => { }
        }
      )
    );
  }
  public openPhotoDetail(id?: string) {
    this.router.navigate(['/photo/' + id])
  }
  public advanceSearch(value: boolean) {
    this.enableAdvanceSearch = value;
  }
  public selectColor(color: string) {
    if (color === this.selectedColor) {
      this.selectedColor = ''
    } else {
      this.selectedColor = color;
    }
  }
  private disableInfityScrollAcordingToListLength(array: Array<any>) {
    if (array.length < this.perPage) {
      this.infiniteScrollDisabled = true;
    }
  }

  ngOnDestroy() {
    for(const subs of this.subscriptions) {
      subs.unsubscribe();
    }
  }
  private getFilters(): searchPhotoFilters {
    return  {
      query: this.filter,
      page: this.page,
      per_page: this.perPage,
      color: this.selectedColor,
      orientation: this.orientation
    }
  }
}
