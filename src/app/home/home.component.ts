import { Component, OnInit } from '@angular/core';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { CountryService } from '../services/country.service';
import { Country } from '../country';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  faChevronDown = faChevronDown;
  isFiltered: boolean = false;
  countries: Country[] = [];
  regions: string[] = [
    'All',
    'Africa',
    'Americas',
    'Asia',
    'Europe',
    'Oceania',
  ];
  filteredCountry?: Country[];
  cachedCountry: Country[] = [];
  errorMessage: any;
  loading: boolean = true;

  constructor(private countryService: CountryService) {}

  ngOnInit(): void {
    this.getCountries();
  }

  getCountries(): void {
    this.countryService.getCountries().subscribe({
      next: (countries) => (
        (this.countries = countries),
        (this.loading = false),
        (this.cachedCountry = countries)
      ),
      error: (errmessage) => (
        (this.errorMessage = errmessage),
        console.log(errmessage),
        (this.loading = false)
      ),
    });
  }

  toggleFilter(): void {
    if (this.isFiltered === false) {
      this.isFiltered = true;
    } else {
      this.isFiltered = false;
    }
  }

  filterRegion(region: any): void {
    if (this.filteredCountry === this.countries) {
      this.countries = this.cachedCountry;
    }
    if (region === 'All') {
      this.countries === this.countries;
    } else {
      this.filteredCountry = this.countries.filter(
        (country) => country.region === region
      );
      console.log(this.filteredCountry);
      this.countries = this.filteredCountry;
    }
  }
}
