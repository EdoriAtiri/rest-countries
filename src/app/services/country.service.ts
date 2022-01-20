import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Country, OneCountry } from '../country';
import { Countries } from '../mock-countries';

import { catchError, EMPTY, Observable, of, retry, throwError } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  countriesUrl: string = 'https://restcountries.com/v2/';
  allCountries: any;
  Country: any = [];
  constructor(private http: HttpClient) {}

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
    }
    // Return an observable with a user-facing error message.
    const err = new Error(
      `${error.status}: Something bad happened. Please try again later.`
    );
    return throwError(() => err);
  }

  getCountries(): Observable<Country[]> {
    if (this.allCountries) {
      console.log('returning value');
      return this.allCountries;
    }
    console.log('do request again');
    const allCountries = `${this.countriesUrl}all?fields=name,population,region,flag,capital`;
    this.allCountries = this.http
      .get<Country[]>(allCountries)
      .pipe(shareReplay(1), catchError(this.handleError));
    return this.allCountries;
  }

  getCountry(country: any): Observable<any> {
    const url = `${this.countriesUrl}name/${country}?fullText=true`;
    return this.http
      .get<Country[]>(url)
      .pipe(retry(3), catchError(this.handleError));
  }

  getBorderCountries(countryCode: string): Observable<Country[]> {
    const url = `${this.countriesUrl}alpha?codes=${countryCode}`;
    return this.http
      .get<Country[]>(url)
      .pipe(retry(3), catchError(this.handleError));
  }

  searchCountries(term: string): Observable<any[]> {
    const url = `${this.countriesUrl}all?fields=name`;
    if (!term.trim()) {
      // If not search term, return empty country list
      return of([]);
    }
    return this.http
      .get<Country[]>(url)
      .pipe(
        map((country) =>
          country.filter((val) => val.name.toLowerCase().includes(term))
        )
      );
  }

  /* Previous Methods
   searchCountries(): Observable<OneCountry[]> {
     const url = `${this.countriesUrl}all?fields=name`;
     return this.http.get<Country[]>(url);
   } */
  /*  getCountries(): Observable<Country[]> {
    const allCountries = `${this.countriesUrl}all?fields=name,population,region,flag,capital`;
    return this.http
      .get<Country[]>(allCountries)
      .pipe(retry(3), catchError(this.handleError));
} */

  /*  getCountries(): Observable<Country[]> {
    const countries = of(Countries);
    return countries;
  } */
}
