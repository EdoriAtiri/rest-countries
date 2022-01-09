import { Component, OnInit } from '@angular/core';
import { faMoon } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  faMoon = faMoon;
  constructor() {}

  ngOnInit(): void {}
}
