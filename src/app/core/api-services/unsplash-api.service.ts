import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LinkerService } from '../linker.service';
import { GenericRequest } from '../models/generic-request.model';
import { searchPhotoFilters } from '../models/search-photos-filter.model';

@Injectable({
  providedIn: 'root'
})
export class UnsplashApiService {

  constructor(private readonly linkService: LinkerService) { }

  private searchUrl = 'search/photos';
  private photoByIdUrl = 'photos'
  public gePhotosByFilter(filters: searchPhotoFilters): Observable<any> {
    const service = this.searchUrl;
    let params: any = {
      query: filters.query,
      page: filters.page,
      per_page: filters.per_page,
    }
    if (filters.color) {
      params = { ...params, color: filters.color };
    }
    if (filters.orientation) {
      params = { ...params, orientation: filters.orientation };
    }
    const genericRequest = new GenericRequest(
      Object.assign(
        service,
        {}),
      {},
      {},
      params
    );
    return this.linkService.getModel(genericRequest);
  }
  public gePhotosById(id: string): Observable<any> {
    const service = this.photoByIdUrl + '/' + id
    const genericRequest = new GenericRequest(
      Object.assign(
        service,
        {})
    );
    return this.linkService.getModel(genericRequest);
  }
}
