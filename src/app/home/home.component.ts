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
  shown: boolean = false;
  countries: Country[] = [];
  regions: string[] = ['All', 'Africa', 'America', 'Asia', 'Europe', 'Oceania'];
  filteredCountry?: Country[];
  cachedCountry: Country[] = [];

  constructor(private countryService: CountryService) {}

  ngOnInit(): void {
    this.getCountries();
  }

  getCountries(): void {
    this.countryService
      .getCountries()
      .subscribe(
        (countries) => (
          (this.countries = countries), (this.cachedCountry = countries)
        )
      );
  }

  toggleFilter(): void {
    if (this.shown === false) {
      this.shown = true;
    } else {
      this.shown = false;
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
