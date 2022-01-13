import { Component } from '@angular/core';
import { ThemeService } from './services/theme.service';
import { faMoon } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'rest-countries';
  faMoon = faMoon;

  public constructor(public themeService: ThemeService) {}

  ngOnInit() {
    const isTrue = localStorage.getItem('theme') === 'true';
    this.themeService.darkMode = isTrue;
  }
}
