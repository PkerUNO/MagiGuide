import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromAttractions from './attractions.reducer';
import * as fromSettings from '../../settings/state';

const getAttractionsFeatureState = createFeatureSelector<fromAttractions.AttractionsState>('attractions');

export const getAttractions = createSelector(
	getAttractionsFeatureState,
	fromAttractions.selectAll
);

export const getAttractionsForPark = createSelector(
	getAttractions,
	fromSettings.getActivePark,
	(attractions, activePark) => attractions.filter(attraction => attraction.park === activePark)
);

export const getAttractionsOldestUpdateForPark = createSelector(
	getAttractionsForPark,
	attractions => attractions
		.map(attraction => attraction.updated)
		.reduce((accumulator, currentValue) => accumulator && accumulator.getTime() < currentValue.getTime() ? accumulator : currentValue, null)
);

export const getFastpassAttractionsForPark = createSelector(
	getAttractionsForPark,
	attractions => attractions
		.filter(attraction => attraction.fastpassEnabled)
);

export const getAttractionsError = createSelector(
	getAttractionsFeatureState,
	state => state.error
);

export const getAttractionsLoading = createSelector(
	getAttractionsFeatureState,
	state => state.loading
);
