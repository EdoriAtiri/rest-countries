import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  public darkMode!: any;
  private dark: boolean = false;
  constructor() {}

  public toggle(): void {
    this.darkMode = !this.darkMode;
    localStorage.setItem('theme', this.darkMode);
  }
}
