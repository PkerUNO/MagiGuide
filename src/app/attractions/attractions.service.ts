import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Attraction } from './attraction.model';
import { APIAttraction } from './api-attraction.interface';
import { Parks } from '../common';

@Injectable({
	providedIn: 'root'
})
export class AttractionsService {
	private apiUrl = '/api/parks';
	private mapParksToString = {
		[Parks.DisneylandPark]: 'dlp-dp',
		[Parks.WaltDisneyStudios]: 'dlp-wds'
	};

	constructor(private http: HttpClient) {}

	public getAttractions(park: Parks): Observable<Attraction[]> {
		return this.http.get<APIAttraction[]>(`${this.apiUrl}/${this.mapParksToString[park]}/attractions`)
			.pipe(
				map(attractions => attractions.map(attraction => {
					return {...attraction, park};
				}))
			);
	}
}
