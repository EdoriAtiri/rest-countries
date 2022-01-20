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
  loadUserDetail: any;
  errorMessage: any;
  borderErrorMessage: any;
  loading!: boolean;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private countryService: CountryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((queryParams) => {
      // do something with the query params
    });
    this.route.params.subscribe((routeParams) => {
      this.getCountry(routeParams['name']);
    });
  }

  getCountry(query: any): void {
    this.loading = true;
    // const countryName = this.route.snapshot.paramMap.get('name');
    this.countryService.getCountry(query).subscribe({
      next: (country) => (
        (this.country = country),
        (this.borderCountry = this.country[0].borders.join()),
        (this.loading = false),
        this.getBorderCountries()
      ),
      error: (errmessage) => (this.errorMessage = errmessage),
    });
  }

  getBorderCountries(): void {
    this.countryService.getBorderCountries(this.borderCountry).subscribe({
      next: (borderCountries) => (this.borderCountries = borderCountries),
      error: (errmessage) => (this.borderErrorMessage = errmessage),
    });
  }

  goBack(): void {
    this.location.back();
  }

  // Previous method of making routes reload on navigation, it worked but created issues withback button
  /* gotoItems(country: string) {
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
  } */
}
