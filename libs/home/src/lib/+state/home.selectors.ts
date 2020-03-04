import { createFeatureSelector } from '@ngrx/store';
import { Home } from './home.reducer';

export const getHome = createFeatureSelector<Home>('home');

export const homeQuery = {
  getHome,
};
