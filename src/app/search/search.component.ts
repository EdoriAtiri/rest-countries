import { Component, OnInit } from '@angular/core';

import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { CountryService } from '../services/country.service';
import { OneCountry } from '../country';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  faSearch = faSearch;
  toggle: boolean = false;
  countries$!: Observable<OneCountry[]>;
  private searchTerms = new Subject<string>();
  constructor(private countryService: CountryService) {}

  // Push a search item into the observable stream
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.countries$ = this.searchTerms.pipe(
      // Wait 300ms after each keystroke before considering search term
      debounceTime(300),
      // ignore new term if same as previous term
      distinctUntilChanged(),

      // Switch to new search observable each time the term changes
      switchMap((term: string) => this.countryService.searchCountries(term))
    );
  }

  // Previous Method
  /*  countries: OneCountry[] = [];
  searchTerm: any;
  cachedCountries: OneCountry[] = [];

  constructor(private countryService: CountryService) {}

  ngOnInit(): void {}


  getCountries(): void {
    this.countryService.searchCountries().subscribe({
      next: (countries) => (
        (this.countries = countries),
        (this.cachedCountries = this.countries),
        console.log(this.countries)
      ),
    });
  }

  search(value: string): void {
    this.countries = this.cachedCountries.filter((val) =>
      val.name.toLowerCase().includes(value)
    );
  } */
}
