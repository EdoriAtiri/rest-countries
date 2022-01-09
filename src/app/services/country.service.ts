import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Country } from '../country';
import { Countries } from '../mock-countries';

import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  constructor(private http: HttpClient) {}

  getCountries(): Observable<Country[]> {
    const countries = of(Countries);
    return countries;
  }

  getCountry(country: any): Observable<any> {
    const url = `https://restcountries.com/v2/name/${country}?fullText=true`;
    return this.http.get<Country[]>(url);
  }

  getBorderCountries(countryCode: string): Observable<Country[]> {
    const url = `https://restcountries.com/v2/alpha?codes=${countryCode}`;
    return this.http.get<Country[]>(url);
  }

  // getCountries(): Observable<Country[]> {
  //   const allCountries = `${this.countrieURl}all?fields=name,population,region,flag,capital`;
  //   return this.http.get<Country[]>(allCountries);
  // }

  // getCountry(): Observable<Country> {
  //   const url = `https://restcountries.com/v2/name/${country}?fullText=true`;

  //   return this.http.get<Country>(url);
  // }
}
