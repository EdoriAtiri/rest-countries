import { Component, OnInit } from '@angular/core';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { CountryService } from '../services/country.service';
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit {
  faArrowLeft = faArrowLeft;
  country!: any;
  borderCountry: any;
  borderCountries: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private countryService: CountryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getCountry();
  }

  getCountry(): void {
    const countryName = this.route.snapshot.paramMap.get('name');
    this.countryService
      .getCountry(countryName)
      .subscribe(
        (country) => (
          (this.country = country),
          (this.borderCountry = this.country[0].borders.join(',')),
          this.getBorderCountries()
        )
      );
  }

  getBorderCountries(): void {
    this.countryService
      .getBorderCountries(this.borderCountry)
      .subscribe((borderCountries) => (this.borderCountries = borderCountries));
  }

  goBack(): void {
    this.location.back();
  }

  gotoItems(country: string) {
    const countryName = country;
    this.countryService
      .getCountry(countryName)
      .subscribe(
        (country) => (
          (this.country = country),
          (this.borderCountry = this.country[0].borders.join(',')),
          this.getBorderCountries()
        )
      );
    this.router.navigate([`/detail/${countryName}`]);
  }
}
