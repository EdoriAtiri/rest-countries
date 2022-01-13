import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  public darkMode!: any;
  constructor() {}

  public toggle(): void {
    this.darkMode = !this.darkMode;
    localStorage.setItem('theme', this.darkMode);
  }
}
