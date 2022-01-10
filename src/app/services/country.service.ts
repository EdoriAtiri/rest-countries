import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Country } from '../country';
import { Countries } from '../mock-countries';

import { catchError, Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  countriesUrl: string = 'https://restcountries.com/v2/';
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
    const err = new Error(`Something bad happened; please try again later.`);
    return throwError(() => err);
  }

  getCountries(): Observable<Country[]> {
    const countries = of(Countries);
    return countries;
  }

  getCountry(country: any): Observable<any> {
    const url = `${this.countriesUrl}name/${country}?fullText=true`;
    return this.http.get<Country[]>(url).pipe(catchError(this.handleError));
  }

  getBorderCountries(countryCode: string): Observable<Country[]> {
    const url = `${this.countriesUrl}alpha?codes=${countryCode}`;
    return this.http.get<Country[]>(url).pipe(catchError(this.handleError));
  }

  // getCountries(): Observable<Country[]> {
  //   const allCountries = `${this.countriesUrl}all?fields=name,population,region,flag,capital`;
  //   return this.http.get<Country[]>(allCountries);
  // }
}
